import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

const AUTH_STORAGE_KEY = 'hiveonix_current_user';
const AUTH_STATUS_KEY = 'hiveonix_auth_status';

export interface RoleCredentialConfig {
  role: UserRole;
  title: string;
  loginMethodDescription: string;
  accessScopeDescription: string;
  defaultId: string;
  defaultEmail: string;
  defaultPassword: string;
  requiresOtp?: boolean;
}

export const ROLE_AUTH_MATRIX: Record<UserRole, RoleCredentialConfig> = {
  government: {
    role: 'government',
    title: 'Government Admin',
    loginMethodDescription: 'Official government credentials + secure authentication',
    accessScopeDescription: 'Government-level monitoring, national risk radar, and export approvals',
    defaultId: 'GOV-NBHM-DEL-01',
    defaultEmail: 'admin@hiveonix.demo',
    defaultPassword: 'GovAdmin@2026',
  },
  beekeeper: {
    role: 'beekeeper',
    title: 'Beekeeper',
    loginMethodDescription: 'Government ID / registered beekeeper ID + password/OTP',
    accessScopeDescription: 'Own hives, batches, IoT sensor health, and honey production data',
    defaultId: 'MDK-KER-2024-8849',
    defaultEmail: 'beekeeper@hiveonix.demo',
    defaultPassword: 'demo12345',
    requiresOtp: true,
  },
  non_registered_beekeeper: {
    role: 'non_registered_beekeeper',
    title: 'New Beekeeper (SSO)',
    loginMethodDescription: 'National Honey Board Madhukranti SSO Registration flow',
    accessScopeDescription: 'Onboarding gateway, Aadhaar e-KYC, and apiary cluster allocation',
    defaultId: 'Aadhaar / Mobile',
    defaultEmail: 'newbee@hiveonix.demo',
    defaultPassword: 'demo12345',
  },
  lab: {
    role: 'lab',
    title: 'Lab Certifier',
    loginMethodDescription: 'Lab-issued credentials + secure authentication',
    accessScopeDescription: 'Batch testing, chemical NMR/C4 assay, and digital NABL verification',
    defaultId: 'NABL-IN-082',
    defaultEmail: 'lab@hiveonix.demo',
    defaultPassword: 'demo12345',
  },
  logistics: {
    role: 'logistics',
    title: 'Logistics Handler',
    loginMethodDescription: 'Registered logistics account + password/OTP',
    accessScopeDescription: 'Assigned shipments, cold-chain temperature telemetry, and cargo dispatch',
    defaultId: 'LOG-EXP-BLR-04',
    defaultEmail: 'logistics@hiveonix.demo',
    defaultPassword: 'demo12345',
    requiresOtp: true,
  },
  consumer: {
    role: 'consumer',
    title: 'Consumer',
    loginMethodDescription: 'QR-based product access; optional account',
    accessScopeDescription: 'Verified honey origin, NABL test certificates, and fair-trade transparency',
    defaultId: 'QR Code / Guest',
    defaultEmail: 'consumer@hiveonix.demo',
    defaultPassword: 'demo12345',
  },
};

export class MadhukrantiAuthService {
  /**
   * Simulates the National Honey Board's Madhukranti SSO flow.
   */
  static async simulateMadhukrantiSSO(beekeeperData: {
    name: string;
    aadhaarNumber: string;
    mobile: string;
    state: string;
  }): Promise<{
    success: boolean;
    madhukrantiId: string;
    verifiedName: string;
    apiaryCount: number;
    kvkCluster: string;
    token: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const stateCode = beekeeperData.state.substring(0, 3).toUpperCase() || 'IND';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const madhukrantiId = `MDK-${stateCode}-2026-${randomNum}`;

    return {
      success: true,
      madhukrantiId,
      verifiedName: beekeeperData.name,
      apiaryCount: 2,
      kvkCluster: `${beekeeperData.state} Central Honey Cluster`,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.madhukranti_${madhukrantiId}_auth`,
    };
  }
}

export class AuthService {
  static isAuthenticated(): boolean {
    try {
      const status = localStorage.getItem(AUTH_STATUS_KEY);
      return status === 'true' && !!localStorage.getItem(AUTH_STORAGE_KEY);
    } catch {
      return false;
    }
  }

  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored user from localStorage', e);
    }
    return null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_STATUS_KEY, 'true');
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STATUS_KEY);
    }
  }

  static generateOTP(): string {
    return '749216'; // Reliable test code, or random if needed
  }

  static loginAsDemoRole(role: UserRole): User {
    const user = DEMO_USERS[role] || DEMO_USERS.beekeeper;
    this.setCurrentUser(user);
    return user;
  }

  static loginWithCredentials(
    identifier: string,
    role: UserRole,
    password?: string
  ): { success: boolean; user?: User; error?: string } {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    
    // Check if matches a demo user by email, phone, or Madhukranti ID
    const demoUser = Object.values(DEMO_USERS).find(
      (u) =>
        u.email.toLowerCase() === normalizedIdentifier ||
        u.phone?.toLowerCase() === normalizedIdentifier ||
        u.madhukrantiId?.toLowerCase() === normalizedIdentifier ||
        (role === u.role && (normalizedIdentifier === '' || normalizedIdentifier === 'admin' || normalizedIdentifier === 'demo'))
    );

    if (demoUser) {
      this.setCurrentUser(demoUser);
      return { success: true, user: demoUser };
    }

    // Custom user creation if valid format
    const newUser: User = {
      id: `usr-${role}-${Date.now()}`,
      name: identifier.includes('@')
        ? identifier.split('@')[0].replace(/[._]/g, ' ').toUpperCase()
        : identifier.toUpperCase(),
      email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@hiveonix.user`,
      role,
      organization:
        role === 'government'
          ? 'Ministry of Agriculture / NBHM'
          : role === 'lab'
          ? 'NABL Accredited Quality Laboratory'
          : role === 'logistics'
          ? 'Registered Cold Chain Logistics'
          : 'National Beekeepers Federation',
      location: 'India',
      kycStatus: role === 'non_registered_beekeeper' ? 'unverified' : 'verified',
      joinedDate: new Date().toISOString().split('T')[0],
      madhukrantiId: role === 'beekeeper' ? `MDK-IND-2026-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    };

    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  static logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(AUTH_STATUS_KEY);
  }

  static isRoleAllowed(userRole: UserRole, targetDashboardRole: UserRole): boolean {
    if (userRole === 'government') return true; // Gov admin can inspect all
    return userRole === targetDashboardRole;
  }
}
