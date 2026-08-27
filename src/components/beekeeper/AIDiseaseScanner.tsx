import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../services/aiService';
import { AIAnalysisResult } from '../../types';
import {
  Sparkles,
  Upload,
  Mic,
  Camera,
  CheckCircle2,
  AlertTriangle,
  FileAudio,
  Image as ImageIcon,
  Activity,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const AIDiseaseScanner: React.FC = () => {
  const { hives, showToast } = useApp();
  const [selectedHiveId, setSelectedHiveId] = useState(hives[0]?.id || 'HV-KER-0101');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const selectedHive = hives.find((h) => h.id === selectedHiveId) || hives[0];

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setResult(null);

    setAnalysisStep('Spectral audio decomposition (150Hz - 600Hz)...');
    await new Promise((r) => setTimeout(r, 600));

    setAnalysisStep('Brood frame computer vision & capping density estimation...');
    await new Promise((r) => setTimeout(r, 700));

    setAnalysisStep('Cross-referencing sensor temperature & humidity curves...');
    await new Promise((r) => setTimeout(r, 700));

    const analysis = await AIService.analyzeColonyHealth({
      hiveId: selectedHiveId,
      currentTemp: selectedHive?.sensorData.temperature,
      currentHumidity: selectedHive?.sensorData.humidity,
    });

    setResult(analysis);
    setIsAnalyzing(false);
    showToast('AI Diagnostics Complete', `Health Score: ${analysis.healthScore}/100`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Acoustic & Computer Vision Engine
          </span>
          <span className="text-xs font-mono text-stone-400">Gemini Edge Inference Ready</span>
        </div>
        <h2 className="text-2xl font-bold text-[#20221F] font-heading mt-1.5">
          AI Colony Health & Disease Anomaly Detection
        </h2>
        <p className="text-xs sm:text-sm text-[#7A7467] mt-0.5">
          Non-invasive diagnostic analysis evaluating acoustic frequency, entrance traffic, and brood cell regularity.
        </p>
      </div>

      {/* Main Analysis Input Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#20221F] mb-1">Select Hive to Inspect</label>
              <select
                value={selectedHiveId}
                onChange={(e) => setSelectedHiveId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9D3C3] text-xs font-semibold focus:border-[#D9A441] bg-[#FCFBF7]"
              >
                {hives.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.id}) — {h.healthStatus.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Simulated Upload Buttons */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#20221F]">Upload Inspection Assets</label>

              <div
                onClick={() => setImageUploaded(!imageUploaded)}
                className={`p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-between ${
                  imageUploaded
                    ? 'border-emerald-400 bg-emerald-50/60 text-emerald-900'
                    : 'border-[#D9D3C3] bg-[#FCFBF7] hover:bg-[#FFFDF9] text-[#666]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center">
                    <Camera className="w-4 h-4 text-[#8C6B1F]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">
                      {imageUploaded ? 'Brood_Frame_Scan_01.jpg Attached' : 'Attach Comb / Hive Photo'}
                    </p>
                    <p className="text-[10px] text-stone-400">Click to {imageUploaded ? 'remove' : 'simulate photo upload'}</p>
                  </div>
                </div>
                {imageUploaded && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </div>

              <div
                onClick={() => setAudioUploaded(!audioUploaded)}
                className={`p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-between ${
                  audioUploaded
                    ? 'border-emerald-400 bg-emerald-50/60 text-emerald-900'
                    : 'border-[#D9D3C3] bg-[#FCFBF7] hover:bg-[#FFFDF9] text-[#666]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">
                      {audioUploaded ? 'Acoustic_Mic_Sample_20s.wav Attached' : 'Attach Acoustic Audio Recording'}
                    </p>
                    <p className="text-[10px] text-stone-400">Click to {audioUploaded ? 'remove' : 'simulate audio sample'}</p>
                  </div>
                </div>
                {audioUploaded && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-2xl bg-[#20221F] hover:bg-[#383C35] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#F6E7A1]" />
                  <span>Processing Diagnostic Neural Mesh...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F6E7A1]" />
                  <span>Run AI Health & Risk Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Environmental Context Card */}
          <div className="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs space-y-1.5">
            <p className="font-bold text-[#8C6B1F]">Active IoT Sensor Telemetry Feed</p>
            <p className="text-[#666]">
              Current Internal Temp: <strong className="text-[#20221F]">{selectedHive?.sensorData.temperature}°C</strong> | Humidity: <strong className="text-[#20221F]">{selectedHive?.sensorData.humidity}%</strong> | Pitch: <strong className="text-[#20221F]">{selectedHive?.sensorData.acousticFrequency} Hz</strong>
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Analysis Output */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="p-12 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFF8E6] border border-[#F6E7A1] flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8 text-[#D9A441] animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#20221F]">Analyzing Hive Biomarkers...</h3>
                <p className="text-xs font-mono text-[#8C6B1F] mt-1">{analysisStep}</p>
              </div>
            </div>
          ) : result ? (
            <div className="p-6 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs space-y-6 animate-in fade-in duration-200">
              {/* Score Header */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D2]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A7467]">
                    Colony Health Score
                  </span>
                  <div className="text-4xl font-extrabold font-mono-num text-[#20221F] mt-0.5">
                    {result.healthScore} <span className="text-base font-normal text-stone-400">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                      result.riskStatus === 'healthy'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    AI Risk: {result.riskStatus.toUpperCase()}
                  </span>
                  <p className="text-[10px] text-stone-400 mt-1">Urgency Level: {result.urgency}</p>
                </div>
              </div>

              {/* AI Observations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7467]">
                  Computer Vision & Acoustic Observations
                </h4>
                <div className="space-y-2">
                  {result.visualObservations.map((obs, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs flex items-start gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5 ${
                          obs.status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {obs.status}
                      </span>
                      <div>
                        <p className="font-bold text-[#20221F]">{obs.metric}</p>
                        <p className="text-[#666] text-[11px] mt-0.5">{obs.description}</p>
                      </div>
                    </div>
                  ))}
                  {result.acousticObservations.map((obs, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#FAF7EF] border border-[#EAE4D4] text-xs flex items-start gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5 ${
                          obs.status === 'Normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {obs.status}
                      </span>
                      <div>
                        <p className="font-bold text-[#20221F]">
                          Acoustic Frequency: {obs.dominantFrequency} Hz ({obs.varianceLevel})
                        </p>
                        <p className="text-[#666] text-[11px] mt-0.5">{obs.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disease Probability Spectrum */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A7467]">
                  Disease Probability & Risk Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {result.diseaseProbabilities.map((dp, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#EBE6D7] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#20221F] truncate">{dp.disease}</span>
                        <span className="font-mono font-bold text-[#8C6B1F]">{dp.riskPercentage}%</span>
                      </div>
                      <div className="w-full bg-stone-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                        <div
                          style={{ width: `${dp.riskPercentage}%` }}
                          className={`h-full ${dp.riskPercentage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation & Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F6E7A1] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#8C6B1F]">
                  <Sparkles className="w-4 h-4 text-[#D9A441]" />
                  <span>Veterinary & Apiary Recommendation:</span>
                </div>
                <p className="text-[#555] leading-relaxed text-[11px]">{result.recommendation}</p>
                <div className="pt-2 border-t border-[#F2E8CD] text-[10px] text-stone-400 italic">
                  *AI-assisted prediction — laboratory & KVK expert physical inspection required before clinical chemical treatment.
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-white border border-[#EBE6D7] shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7EF] border border-[#EAE4D4] flex items-center justify-center mx-auto text-stone-400">
                <Activity className="w-6 h-6 text-[#8C6B1F]" />
              </div>
              <h3 className="text-sm font-bold text-[#20221F]">Ready to Inspect</h3>
              <p className="text-xs text-[#7A7467] max-w-sm mx-auto">
                Select a hive and click "Run AI Health Analysis" to detect anomalies across acoustic and visual indicators.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
