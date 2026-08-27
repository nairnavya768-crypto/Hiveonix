import React from 'react';
import { HiveHealthStatus, BatchStatus } from '../../types';
import { CheckCircle2, AlertTriangle, AlertOctagon, Clock, ShieldCheck, Truck, Package, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: HiveHealthStatus | BatchStatus | 'passed' | 'failed' | 'verified' | 'unverified' | 'pending';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-semibold gap-2',
  }[size];

  switch (status) {
    // Hive Health
    case 'healthy':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#EBF5E9] text-[#2E6930] border border-[#CDE5C8] ${sizeClasses}`}>
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-[#3C8C3F]" />}
          Healthy Colony
        </span>
      );
    case 'watch':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1] ${sizeClasses}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 text-[#D9A441]" />}
          Under Watch
        </span>
      );
    case 'at_risk':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#FEF3EB] text-[#B24E18] border border-[#FCD8C1] ${sizeClasses}`}>
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-[#D95F24]" />}
          At Risk
        </span>
      );
    case 'critical':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#FDF0EE] text-[#B92921] border border-[#F9CBC7] ${sizeClasses}`}>
          {showIcon && <AlertOctagon className="w-3.5 h-3.5 text-[#D83A31]" />}
          Critical Anomaly
        </span>
      );

    // Batch Statuses
    case 'retail_ready':
    case 'verified':
    case 'passed':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#E8F5E9] text-[#1E6B24] border border-[#BDE3BD] ${sizeClasses}`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B34]" />}
          {status === 'retail_ready' ? 'Passport Verified' : status === 'passed' ? 'Lab Passed' : 'Verified'}
        </span>
      );
    case 'lab_pending':
    case 'pending':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#FFFBEA] text-[#8C6418] border border-[#F4DC88] ${sizeClasses}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 text-[#D9A441]" />}
          Lab Testing Pending
        </span>
      );
    case 'in_logistics':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#EBF3FC] text-[#1D5E9E] border border-[#C6DCFA] ${sizeClasses}`}>
          {showIcon && <Truck className="w-3.5 h-3.5 text-[#2879CC]" />}
          In Cold Transit
        </span>
      );
    case 'packaged':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#F4EFFC] text-[#5C2E91] border border-[#DCCAF7] ${sizeClasses}`}>
          {showIcon && <Package className="w-3.5 h-3.5 text-[#7B42BC]" />}
          Packaged & Serialized
        </span>
      );
    case 'harvested':
    case 'processing':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#F5F2EB] text-[#524B3D] border border-[#DDD5C5] ${sizeClasses}`}>
          {showIcon && <Clock className="w-3.5 h-3.5 text-[#887B64]" />}
          {status === 'harvested' ? 'Raw Harvested' : 'Centrifugal Processing'}
        </span>
      );
    case 'lab_rejected':
    case 'failed':
    case 'unverified':
      return (
        <span className={`inline-flex items-center rounded-full bg-[#FDF0EE] text-[#B92921] border border-[#F9CBC7] ${sizeClasses}`}>
          {showIcon && <XCircle className="w-3.5 h-3.5 text-[#D83A31]" />}
          {status === 'lab_rejected' ? 'Quality Rejected' : status === 'failed' ? 'Lab Failed' : 'Unverified'}
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center rounded-full bg-stone-100 text-stone-700 border border-stone-200 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};
