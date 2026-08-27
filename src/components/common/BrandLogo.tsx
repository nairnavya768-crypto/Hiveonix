import React from 'react';
import logoImage from '../../assets/images/hiveonix_logo_1787763932218.jpg';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  badge?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = false,
  showTagline = false,
  theme = 'light',
  className = '',
  badge,
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Circular Emblem Container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shrink-0 shadow-xs border-2 ${
          isDark ? 'border-[#D9A441]/80 ring-1 ring-[#D9A441]/40' : 'border-[#D9A441] ring-1 ring-[#D9A441]/30'
        } bg-[#181611] transition-transform duration-200 group-hover:scale-105`}
      >
        <img
          src={logoImage}
          alt="HIVEONIX Emblem"
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Optional Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold tracking-tight font-heading leading-tight ${
                size === 'xs'
                  ? 'text-sm'
                  : size === 'sm'
                  ? 'text-base'
                  : size === 'md'
                  ? 'text-lg'
                  : size === 'lg'
                  ? 'text-xl'
                  : 'text-2xl'
              } ${isDark ? 'text-white' : 'text-[#20221F]'}`}
            >
              HIVEONIX
            </span>
            {badge && (
              <span
                className={`text-[9px] font-mono-num font-bold px-1.5 py-0.5 rounded-md ${
                  isDark
                    ? 'bg-[#3A321B] text-[#F6E7A1] border border-[#D9A441]/40'
                    : 'bg-[#FFF8E6] text-[#8C6B1F] border border-[#F6E7A1]'
                }`}
              >
                {badge}
              </span>
            )}
          </div>
          {showTagline && (
            <p
              className={`text-[10px] tracking-wide -mt-0.5 font-medium ${
                isDark ? 'text-stone-400' : 'text-[#7A7568]'
              }`}
            >
              Smart Hives • Pure Honey • Trusted Future
            </p>
          )}
        </div>
      )}
    </div>
  );
};
