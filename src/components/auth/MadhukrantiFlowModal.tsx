import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MadhukrantiAuthService } from '../../services/authService';
import { User, Hive } from '../../types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Building2,
  Award,
  Sparkles,
  X,
  ExternalLink,
  Plus,
  Box,
  LogIn,
  RefreshCw,
} from 'lucide-react';

export const MadhukrantiFlowModal: React.FC = () => {
  const { isMadhukrantiModalOpen, setIsMadhukrantiModalOpen, login, addHive, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [beekeeperName, setBeekeeperName] = useState('Gurpreet Singh');
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-4821');
  const [mobileNumber, setMobileNumber] = useState('+91 98722 55678');
  const [stateName, setStateName] = useState('Punjab');
  const [districtName, setDistrictName] = useState('Bathinda');
  const [otpCode, setOtpCode] = useState('8849');
  const [isVerifying, setIsVerifying] = useState(false);

  // Hive Registration Details (Step 4)
  const [hiveName, setHiveName] = useState('Malwa Golden Hive #1');
  const [apiaryName, setApiaryName] = useState('Bathinda Honey Cluster Apiary');
  const [species, setSpecies] = useState<'Apis mellifera' | 'Apis cerana indica'>('Apis mellifera');

  // Result from SSO
  const [ssoResult, setSsoResult] = useState<{
    madhukrantiId: string;
    verifiedName: string;
    token: string;
  } | null>(null);

  if (!isMadhukrantiModalOpen) return null;

  const handleStartSSO = async () => {
    setIsVerifying(true);
    const result = await MadhukrantiAuthService.simulateMadhukrantiSSO({
      name: beekeeperName,
      aadhaarNumber,
      mobile: mobileNumber,
      state: stateName,
    });
    setSsoResult(result);
    setIsVerifying(false);
    setStep(3);
  };

  const handleCompleteRegistration = () => {
    if (!ssoResult) return;

    // Create user profile
    const registeredUser: User = {
      id: `usr-bk-${Date.now()}`,
      name: beekeeperName,
      email: `${beekeeperName.toLowerCase().replace(/\s+/g, '')}@hiveonix.in`,
      role: 'beekeeper',
      organization: `${stateName} Beekeeping Producer Co-op`,
      location: `${districtName}, ${stateName}, India`,
      phone: mobileNumber,
      madhukrantiId: ssoResult.madhukrantiId,
      aadhaarVerified: true,
      kycStatus: 'verified',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    // Register initial hive
    const newHive: Hive = {
      id: `HV-${stateName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: hiveName,
      apiaryName: apiaryName,
      location: `${districtName}, ${stateName}, India`,
      coordinates: { lat: 30.211, lng: 74.9455 },
      species,
      establishedDate: new Date().toISOString().split('T')[0],
      healthStatus: 'healthy',
      healthScore: 92,
      honeySuperCount: 2,
      estimatedHarvestYieldKg: 24.0,
      lastInspectionDate: new Date().toISOString().split('T')[0],
      sensorData: {
        temperature: 34.5,
        humidity: 55,
        weight: 38.2,
        acousticFrequency: 210,
        activityIndex: 85,
        batteryLevel: 98,
        lastUpdated: 'Just now',
      },
      queen: {
        id: `QN-${stateName.substring(0, 3).toUpperCase()}-2026-01`,
        installedDate: new Date().toISOString().split('T')[0],
        ageMonths: 4,
        status: 'healthy',
        breed: species === 'Apis mellifera' ? 'Apis mellifera ligustica' : 'Apis cerana indica',
        layingPatternScore: 95,
      },
      historyLogs: [
        {
          date: new Date().toISOString().split('T')[0],
          action: 'Initial Hive Registration via Madhukranti SSO',
          inspector: beekeeperName,
          note: 'Colony onboarded to National Beekeeping Mission digital mesh.',
        },
      ],
    };

    addHive(newHive);

    // Show completion screen step 5
    setStep(5);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F6E7A1', '#D9A441', '#20221F', '#7D9B68'],
      });
    } catch {}
  };

  const handleFinalLogin = () => {
    if (!ssoResult) return;
    const registeredUser: User = {
      id: `usr-bk-${Date.now()}`,
      name: beekeeperName,
      email: `${beekeeperName.toLowerCase().replace(/\s+/g, '')}@hiveonix.in`,
      role: 'beekeeper',
      organization: `${stateName} Beekeeping Producer Co-op`,
      location: `${districtName}, ${stateName}, India`,
      phone: mobileNumber,
      madhukrantiId: ssoResult.madhukrantiId,
      aadhaarVerified: true,
      kycStatus: 'verified',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    login(registeredUser);
    showToast(
      'Authenticated as Registered Beekeeper',
      `Welcome to Hiveonix, ${beekeeperName}! Madhukranti ID: ${ssoResult.madhukrantiId}`,
      'success'
    );
    setIsMadhukrantiModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E8E2D2] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with National Beekeeping Mission theme */}
        <div className="p-5 bg-gradient-to-r from-[#FAF4E4] via-[#FFF9E8] to-[#FCFBF7] border-b border-[#EAE3CE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F6E7A1] border border-[#D9A441]/40 flex items-center justify-center shadow-2xs">
              <Building2 className="w-5 h-5 text-[#8C6B1F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8C6B1F] tracking-wide uppercase">Madhu Kranti Gov App Connect</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  National Portal
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#20221F] font-heading">
                Unregistered Beekeeper Onboarding Flow
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsMadhukrantiModalOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Progress Indicator */}
        <div className="px-6 py-3 bg-[#FCFBF7] border-b border-[#F0EAD9] flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'font-bold text-[#8C6B1F]' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center text-[10px]">1</span>
            <span>Connect</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'font-bold text-[#8C6B1F]' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center text-[10px]">2</span>
            <span>Aadhaar OTP</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'font-bold text-[#8C6B1F]' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center text-[10px]">3</span>
            <span>Verified ID</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'font-bold text-[#8C6B1F]' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center text-[10px]">4</span>
            <span>Add Hive</span>
          </div>
          <span className="text-stone-300">→</span>
          <div className={`flex items-center gap-1.5 ${step >= 5 ? 'font-bold text-emerald-700' : 'text-stone-400'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px]">5</span>
            <span>Log In</span>
          </div>
        </div>

        {/* Modal Body Content by Step */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020] space-y-2">
                <p className="font-bold flex items-center gap-1.5 text-[#8C6B1F]">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  Why connect to the Madhu Kranti Government App?
                </p>
                <p className="leading-relaxed">
                  Under the National Beekeeping & Honey Mission (NBHM), all commercial and artisanal honey producers register via the Madhu Kranti government portal to receive a tamper-proof National Beekeeper ID, access MSP price support, and unlock QR export batch issuance.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Full Legal Name (as on Aadhaar)</label>
                  <input
                    type="text"
                    value={beekeeperName}
                    onChange={(e) => setBeekeeperName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#20221F] mb-1">State / UT</label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Meghalaya">Meghalaya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#20221F] mb-1">District</label>
                    <input
                      type="text"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Aadhaar-Linked Mobile Number</label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Connect to Madhu Kranti Gov SSO</span>
                  <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Simulated Government Portal Frame */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-[#D9A441] bg-[#FFFDF7] space-y-3">
                <div className="flex items-center justify-between border-b border-[#F0EAD9] pb-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#8C6B1F]">
                    <Building2 className="w-4 h-4" />
                    <span>api.madhukranti.gov.in (Official Gov Gateway)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                    UIDAI e-KYC Verified
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Aadhaar Linked Identity</label>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D9D3C3] text-xs font-mono bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Enter 4-Digit Aadhaar SMS OTP</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-sm font-mono font-bold tracking-widest text-center focus:border-[#D9A441] bg-white"
                  />
                  <p className="text-[10px] text-[#777] mt-1 text-center">Demo OTP: 8849 (Simulated UIDAI SMS)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold text-[#555] hover:bg-stone-50 flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="button"
                  disabled={isVerifying}
                  onClick={handleStartSSO}
                  className="w-2/3 py-3 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-[#F6E7A1]" />
                      Verifying with Madhukranti...
                    </span>
                  ) : (
                    <>
                      <span>Authorize & Verify Identity</span>
                      <ShieldCheck className="w-4 h-4 text-[#F6E7A1]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && ssoResult && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Government Verification Successful
                </span>
                <h3 className="text-xl font-bold text-[#20221F] mt-2 font-heading">
                  National Beekeeper ID Issued
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2] text-left space-y-2 font-mono-num text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Madhukranti ID:</span>
                  <span className="font-bold text-[#8C6B1F]">{ssoResult.madhukrantiId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Verified Beekeeper:</span>
                  <span className="font-bold text-[#20221F]">{ssoResult.verifiedName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">KVK Region Cluster:</span>
                  <span className="font-medium text-[#20221F]">{districtName}, {stateName} Honey Cluster</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">Aadhaar Status:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified (UIDAI)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="w-full py-3 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Register First Smart Hive</span>
                <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs text-[#7A6020]">
                <strong>Step 4 of 4:</strong> Connect your first IoT smart hive chamber to activate real-time telemetry and harvest batch logging.
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Hive / Chamber Name</label>
                  <input
                    type="text"
                    value={hiveName}
                    onChange={(e) => setHiveName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Apiary Location Name</label>
                  <input
                    type="text"
                    value={apiaryName}
                    onChange={(e) => setApiaryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#20221F] mb-1">Honeybee Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-medium focus:border-[#D9A441] bg-white"
                  >
                    <option value="Apis mellifera">Apis mellifera (European Honeybee - High Yield)</option>
                    <option value="Apis cerana indica">Apis cerana indica (Indian Native Honeybee - Disease Resistant)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCompleteRegistration}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D9A441] to-[#C28E30] hover:from-[#C28E30] hover:to-[#A97824] text-[#20221F] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Complete Registration & Generate Credentials</span>
              </button>
            </div>
          )}

          {step === 5 && ssoResult && (
            <div className="space-y-5 text-center py-2 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Madhukranti Registration Complete
                </span>
                <h3 className="text-xl font-bold text-[#20221F] mt-2 font-heading">
                  You Are Now a Registered Beekeeper!
                </h3>
                <p className="text-xs text-[#7A7467] mt-1 max-w-md mx-auto">
                  Your identity has been verified by the National Beekeeping & Honey Mission. You can now log in to access your smart apiary dashboard.
                </p>
              </div>

              {/* Newly Generated ID Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF9E8] to-[#FFF1CD] border-2 border-[#D9A441] text-left space-y-2.5 text-xs shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8DEC1] pb-2">
                  <span className="text-[11px] font-bold text-[#8C6B1F]">Your National Beekeeper ID</span>
                  <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-full border border-[#D9A441] font-bold text-[#20221F]">
                    ACTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between font-mono">
                  <span className="text-stone-500">ID:</span>
                  <strong className="text-sm font-bold text-[#8C6B1F]">{ssoResult.madhukrantiId}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Name:</span>
                  <strong className="text-[#20221F]">{ssoResult.verifiedName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Initial Chamber:</span>
                  <strong className="text-[#20221F]">{hiveName} (LoRa Connected)</strong>
                </div>
              </div>

              {/* Action Button to Log In as Registered Beekeeper */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleFinalLogin}
                  className="w-full py-3.5 rounded-2xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-[#F6E7A1]" />
                  <span>Log In as Registered Beekeeper</span>
                  <ArrowRight className="w-4 h-4 text-[#F6E7A1]" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMadhukrantiModalOpen(false)}
                  className="w-full py-2 rounded-xl text-xs font-bold text-stone-500 hover:text-[#20221F] transition-colors"
                >
                  Return to Login Screen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
