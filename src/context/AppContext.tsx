import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  Hive,
  HoneyBatch,
  BlockchainBlock,
  Shipment,
  NotificationItem,
  LabTestResults,
} from '../types';
import {
  DEMO_USERS,
  INITIAL_HIVES,
  INITIAL_BATCHES,
  INITIAL_BLOCKS,
  INITIAL_SHIPMENTS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';
import { AuthService } from '../services/authService';
import { BlockchainService } from '../services/blockchainService';

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  isAuthenticated: boolean;
  currentUser: User;
  currentRole: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  switchRole: (role: UserRole) => void;
  login: (user: User) => void;
  logout: () => void;

  // Data
  hives: Hive[];
  batches: HoneyBatch[];
  blockchainBlocks: BlockchainBlock[];
  shipments: Shipment[];
  notifications: NotificationItem[];
  unreadNotifCount: number;

  // Actions
  addHive: (hive: Hive) => void;
  updateHive: (id: string, updates: Partial<Hive>) => void;
  createBatch: (batch: HoneyBatch) => void;
  certifyBatch: (batchId: string, results: LabTestResults) => void;
  updateShipmentStatus: (shipmentId: string, status: Shipment['status'], locationName: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (title: string, message: string, type?: ToastMessage['type']) => void;

  // Selection states & Modal controls
  selectedHiveId: string | null;
  setSelectedHiveId: (id: string | null) => void;
  selectedBatchId: string | null;
  setSelectedBatchId: (id: string | null) => void;
  selectedShipmentId: string | null;
  setSelectedShipmentId: (id: string | null) => void;

  isChatbotOpen: boolean;
  setIsChatbotOpen: (open: boolean) => void;
  isMadhukrantiModalOpen: boolean;
  setIsMadhukrantiModalOpen: (open: boolean) => void;
  isAddHiveModalOpen: boolean;
  setIsAddHiveModalOpen: (open: boolean) => void;
  isCreateBatchModalOpen: boolean;
  setIsCreateBatchModalOpen: (open: boolean) => void;
  isLabTestModalOpen: boolean;
  setIsLabTestModalOpen: (open: boolean) => void;
  isBlockchainModalOpen: boolean;
  setIsBlockchainModalOpen: (open: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  isVerifyPassportOpen: boolean;
  setIsVerifyPassportOpen: (open: boolean) => void;

  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication & Role
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return AuthService.isAuthenticated();
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const stored = AuthService.getCurrentUser();
    return stored || DEMO_USERS.beekeeper;
  });

  const currentRole = currentUser.role;

  // Navigation tab based on role
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Core Data
  const [hives, setHives] = useState<Hive[]>(() => {
    try {
      const stored = localStorage.getItem('hiveonix_hives');
      return stored ? JSON.parse(stored) : INITIAL_HIVES;
    } catch {
      return INITIAL_HIVES;
    }
  });

  const [batches, setBatches] = useState<HoneyBatch[]>(() => {
    try {
      const stored = localStorage.getItem('hiveonix_batches');
      return stored ? JSON.parse(stored) : INITIAL_BATCHES;
    } catch {
      return INITIAL_BATCHES;
    }
  });

  const [blockchainBlocks, setBlockchainBlocks] = useState<BlockchainBlock[]>(() => {
    return BlockchainService.getLedger();
  });

  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const stored = localStorage.getItem('hiveonix_shipments');
      return stored ? JSON.parse(stored) : INITIAL_SHIPMENTS;
    } catch {
      return INITIAL_SHIPMENTS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('hiveonix_notifications');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Modal / Selection states
  const [selectedHiveId, setSelectedHiveId] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>('HVX-2026-KER-004821');
  const [selectedShipmentId, setSelectedShipmentId] = useState<string | null>(null);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMadhukrantiModalOpen, setIsMadhukrantiModalOpen] = useState(false);
  const [isAddHiveModalOpen, setIsAddHiveModalOpen] = useState(false);
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [isLabTestModalOpen, setIsLabTestModalOpen] = useState(false);
  const [isBlockchainModalOpen, setIsBlockchainModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isVerifyPassportOpen, setIsVerifyPassportOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('hiveonix_hives', JSON.stringify(hives));
  }, [hives]);

  useEffect(() => {
    localStorage.setItem('hiveonix_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('hiveonix_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('hiveonix_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const user = AuthService.loginAsDemoRole(role);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('overview');
    showToast(`Role Switched`, `Now viewing as ${user.name} (${role.replace('_', ' ').toUpperCase()})`, 'info');
  };

  const login = (user: User) => {
    AuthService.setCurrentUser(user);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('overview');
    showToast('Authentication Successful', `Welcome back, ${user.name} (${user.role.replace('_', ' ').toUpperCase()})`, 'success');
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    const guest = DEMO_USERS.consumer;
    setCurrentUser(guest);
    setActiveTab('overview');
    showToast('Logged Out', 'You have been securely signed out. Please authenticate to access dashboards.', 'info');
  };

  const addHive = (hive: Hive) => {
    setHives((prev) => [hive, ...prev]);
    showToast('Hive Registered', `Hive ${hive.name} (${hive.id}) added to your apiary network`, 'success');
  };

  const updateHive = (id: string, updates: Partial<Hive>) => {
    setHives((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
    showToast('Hive Updated', `Telemetry & settings saved for Hive ${id}`, 'info');
  };

  const createBatch = (batch: HoneyBatch) => {
    setBatches((prev) => [batch, ...prev]);

    // Append genesis block to blockchain
    const block = BlockchainService.appendBlock({
      eventType: 'GENESIS_BATCH_CREATED',
      batchId: batch.batchId,
      actor: `${currentUser.name} (${currentUser.organization || 'Apiary'})`,
      actorRole: currentUser.role,
      dataPayload: {
        hiveId: batch.hiveId,
        quantityKg: batch.quantityKg,
        bottleCount: batch.bottleCount,
        flora: batch.honeyFloraType,
        location: batch.apiaryLocation,
      },
    });

    setBlockchainBlocks(BlockchainService.getLedger());
    showToast('Honey Batch Created & Blockchain Recorded', `Batch ID: ${batch.batchId} logged (Block #${block.blockNumber})`, 'success');
  };

  const certifyBatch = (batchId: string, results: LabTestResults) => {
    const isPassed = results.status === 'passed';
    const newStatus = isPassed ? 'packaged' : 'lab_rejected';

    setBatches((prev) =>
      prev.map((b) => {
        if (b.batchId === batchId) {
          const updatedTimeline = [
            ...b.timeline,
            {
              stage: isPassed ? 'NABL Laboratory Quality Verified' : 'NABL Laboratory Quality Rejected',
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              actor: results.testedByLab,
              details: `${results.remarks} | C4 Sugars: ${results.c4SugarAdulterationPercent}% | Moisture: ${results.moisturePercent}%`,
              verified: isPassed,
            },
          ];
          return {
            ...b,
            status: newStatus,
            labResults: results,
            timeline: updatedTimeline,
          };
        }
        return b;
      })
    );

    // Commit to blockchain
    const block = BlockchainService.appendBlock({
      eventType: 'LAB_CERTIFICATION_ISSUED',
      batchId,
      actor: `${results.testedByLab} (${results.signedBy})`,
      actorRole: 'lab',
      dataPayload: {
        certificateId: results.labCertificateId,
        moisturePercent: results.moisturePercent,
        hmfContentMgKg: results.hmfContentMgKg,
        pollenCountPurityPercent: results.pollenCountPurityPercent,
        c4SugarAdulterationPercent: results.c4SugarAdulterationPercent,
        status: results.status.toUpperCase(),
      },
    });

    setBlockchainBlocks(BlockchainService.getLedger());
    showToast(
      isPassed ? 'Batch Certified & Verified' : 'Batch Quality Rejected',
      `Certificate ${results.labCertificateId} generated (Block #${block.blockNumber})`,
      isPassed ? 'success' : 'warning'
    );
  };

  const updateShipmentStatus = (shipmentId: string, status: Shipment['status'], locationName: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          const updatedCheckpoints = [
            ...s.checkpoints,
            {
              location: locationName,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: `Status updated to ${status.replace('_', ' ').toUpperCase()}`,
              completed: true,
            },
          ];
          return {
            ...s,
            status,
            currentLocationName: locationName,
            checkpoints: updatedCheckpoints,
          };
        }
        return s;
      })
    );

    const targetShipment = shipments.find((s) => s.id === shipmentId);
    if (targetShipment) {
      BlockchainService.appendBlock({
        eventType: 'LOGISTICS_TRANSFER',
        batchId: targetShipment.batchId,
        actor: `${currentUser.name} (${targetShipment.carrierName})`,
        actorRole: 'logistics',
        dataPayload: {
          shipmentId,
          status,
          location: locationName,
          vehicleNumber: targetShipment.vehicleNumber,
        },
      });
      setBlockchainBlocks(BlockchainService.getLedger());
    }

    showToast('Logistics Updated', `Shipment ${shipmentId} marked as ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read', 'info');
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        currentRole,
        activeTab,
        setActiveTab,
        switchRole,
        login,
        logout,
        hives,
        batches,
        blockchainBlocks,
        shipments,
        notifications,
        unreadNotifCount,
        addHive,
        updateHive,
        createBatch,
        certifyBatch,
        updateShipmentStatus,
        markNotificationRead,
        markAllNotificationsRead,
        showToast,
        selectedHiveId,
        setSelectedHiveId,
        selectedBatchId,
        setSelectedBatchId,
        selectedShipmentId,
        setSelectedShipmentId,
        isChatbotOpen,
        setIsChatbotOpen,
        isMadhukrantiModalOpen,
        setIsMadhukrantiModalOpen,
        isAddHiveModalOpen,
        setIsAddHiveModalOpen,
        isCreateBatchModalOpen,
        setIsCreateBatchModalOpen,
        isLabTestModalOpen,
        setIsLabTestModalOpen,
        isBlockchainModalOpen,
        setIsBlockchainModalOpen,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isVerifyPassportOpen,
        setIsVerifyPassportOpen,
        toasts,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
