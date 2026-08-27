import React, { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  id?: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  icon: ReactNode;
  accentColor?: 'yellow' | 'green' | 'blue' | 'amber' | 'red';
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subtitle,
  trend,
  icon,
  accentColor = 'yellow',
  onClick,
}) => {
  const accentStyles = {
    yellow: 'bg-[#FFFBEA] border-[#F6E7A1] text-[#9A6B1F]',
    green: 'bg-[#F2F9F0] border-[#CCE8C5] text-[#2E6930]',
    blue: 'bg-[#F0F6FD] border-[#CDE1F9] text-[#1D5E9E]',
    amber: 'bg-[#FFF4EB] border-[#FBD9C3] text-[#B24E18]',
    red: 'bg-[#FDF2F0] border-[#FBCBC7] text-[#B92921]',
  }[accentColor];

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative p-5 rounded-2xl bg-white border border-[#EBE6D7] shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-[#D9A441] hover:shadow-md' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#6E6A60] tracking-wide uppercase">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono-num text-[#20221F] mt-1.5">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${accentStyles}`}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F5F2EA] text-xs">
          {trend && (
            <span
              className={`inline-flex items-center font-semibold font-mono-num ${
                trend.isPositive ? 'text-[#2E6930]' : 'text-[#B92921]'
              }`}
            >
              {trend.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {trend.value}
            </span>
          )}
          {subtitle && <span className="text-[#888377] truncate">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
