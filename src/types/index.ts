export type UserRole =
  | 'government'
  | 'beekeeper'
  | 'non_registered_beekeeper'
  | 'lab'
  | 'logistics'
  | 'consumer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  location?: string;
  phone?: string;
  madhukrantiId?: string;
  aadhaarVerified?: boolean;
  kycStatus?: 'verified' | 'pending' | 'unverified';
  joinedDate?: string;
}

export type HiveHealthStatus = 'healthy' | 'watch' | 'at_risk' | 'critical';

export interface HiveSensorData {
  temperature: number; // in Celsius
  humidity: number; // in %
  weight: number; // in kg
  acousticFrequency: number; // in Hz (e.g. 150-500Hz)
  activityIndex: number; // 0 - 100
  batteryLevel: number; // %
  lastUpdated: string;
}

export interface QueenInfo {
  id: string;
  installedDate: string;
  ageMonths: number;
  status: 'active' | 'supersedure_risk' | 'failing' | 'healthy';
  breed: string; // e.g. Apis mellifera ligustica or Apis cerana indica
  layingPatternScore: number; // 0 - 100
}

export interface Hive {
  id: string;
  name: string;
  apiaryName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  species: 'Apis cerana indica' | 'Apis mellifera' | 'Apis dorsata' | 'Tetragonula iridipennis';
  establishedDate: string;
  healthStatus: HiveHealthStatus;
  healthScore: number; // 0 - 100
  sensorData: HiveSensorData;
  queen: QueenInfo;
  honeySuperCount: number;
  estimatedHarvestYieldKg: number;
  lastInspectionDate: string;
  notes?: string;
  historyLogs: {
    date: string;
    action: string;
    inspector: string;
    note: string;
  }[];
}

export type BatchStatus =
  | 'harvested'
  | 'processing'
  | 'lab_pending'
  | 'lab_verified'
  | 'lab_rejected'
  | 'in_logistics'
  | 'packaged'
  | 'retail_ready';

export interface LabTestResults {
  testedByLab: string;
  labCertificateId: string;
  testDate: string;
  moisturePercent: number; // Standard: < 20%
  hmfContentMgKg: number; // Hydroxymethylfurfural < 40 mg/kg
  pollenCountPurityPercent: number; // > 80%
  fructoseGlucoseRatio: number; // ~ 1.0 - 1.4
  c4SugarAdulterationPercent: number; // < 7% (0% is pure)
  antibioticResidue: 'negative' | 'trace' | 'positive';
  heavyMetals: 'passed' | 'failed';
  status: 'passed' | 'failed';
  remarks: string;
  signedBy: string;
  blockchainTxHash?: string;
}

export interface HoneyBatch {
  batchId: string;
  hiveId: string;
  beekeeperId: string;
  beekeeperName: string;
  apiaryLocation: string;
  honeyFloraType: string; // e.g. Mustard, Acacia, Wild Forest, Multi-Flora, Sidr, Litchi
  harvestDate: string;
  quantityKg: number;
  bottleCount: number;
  status: BatchStatus;
  labResults?: LabTestResults;
  blockchainHash: string;
  qrCodeUrl: string;
  productionNotes?: string;
  currentLocation?: string;
  timeline: {
    stage: string;
    timestamp: string;
    actor: string;
    details: string;
    verified: boolean;
  }[];
}

export interface BlockchainBlock {
  blockNumber: number;
  timestamp: string;
  eventType:
    | 'GENESIS_BATCH_CREATED'
    | 'IOT_TELEMETRY_LOGGED'
    | 'LAB_CERTIFICATION_ISSUED'
    | 'LOGISTICS_TRANSFER'
    | 'RETAIL_SEALED'
    | 'COUNTERFEIT_FLAGGED';
  batchId: string;
  actor: string;
  actorRole: UserRole;
  blockHash: string;
  previousBlockHash: string;
  merkleRoot: string;
  dataPayload: Record<string, any>;
  verified: boolean;
}

export interface Shipment {
  id: string;
  batchId: string;
  quantityKg: number;
  origin: string;
  destination: string;
  carrierName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  currentCoordinates: { lat: number; lng: number };
  currentLocationName: string;
  status: 'picked_up' | 'in_transit' | 'at_hub' | 'delivered';
  currentTemperature: number;
  tamperAlert: boolean;
  estimatedDelivery: string;
  dispatchDate: string;
  checkpoints: {
    location: string;
    timestamp: string;
    status: string;
    completed: boolean;
  }[];
}

export interface SuspiciousScanAlert {
  id: string;
  batchId: string;
  scanLocation: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  reason: 'DUPLICATE_CONCURRENT_SCAN' | 'INVALID_CHECKSUM' | 'GEO_MISMATCH' | 'UNAUTHORIZED_DISTRIBUTOR';
  riskLevel: 'high' | 'critical' | 'medium';
  actionTaken: string;
  flagged: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'health_alert' | 'lab_update' | 'counterfeit' | 'weather' | 'logistics' | 'system';
  severity: 'info' | 'warning' | 'critical' | 'success';
  timestamp: string;
  read: boolean;
  linkAction?: {
    tab: string;
    entityId?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  contextTag?: string;
  suggestedActions?: string[];
}

export interface EnvironmentalData {
  regionName: string;
  temperature: number;
  humidity: number;
  rainfallMm: number;
  windSpeedKmh: number;
  pollenAlert: 'Low' | 'Moderate' | 'High' | 'Peak';
  suitabilityScore: number; // 0 - 100
  forageConditions: {
    floraName: string;
    bloomStatus: 'Budding' | 'Peak Bloom' | 'Fading' | 'Off-Season';
    nectarYield: 'High' | 'Medium' | 'Low';
    seasonMonths: string;
  }[];
}

export interface AIAnalysisResult {
  hiveId: string;
  healthScore: number;
  riskStatus: HiveHealthStatus;
  visualObservations: {
    metric: string;
    status: 'Normal' | 'Mild Anomaly' | 'Concern';
    description: string;
  }[];
  acousticObservations: {
    dominantFrequency: number;
    varianceLevel: string;
    status: 'Normal' | 'Mild Anomaly' | 'Concern';
    description: string;
  }[];
  diseaseProbabilities: {
    disease: string;
    riskPercentage: number;
    confidence: number;
  }[];
  recommendation: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Immediate';
}
