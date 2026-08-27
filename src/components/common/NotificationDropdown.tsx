import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, AlertTriangle, ShieldAlert, CloudRain, Truck, FlaskConical, ExternalLink } from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveTab, setSelectedHiveId, setSelectedBatchId } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'health_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'counterfeit':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'lab_update':
        return <FlaskConical className="w-4 h-4 text-purple-600" />;
      case 'weather':
        return <CloudRain className="w-4 h-4 text-blue-600" />;
      case 'logistics':
        return <Truck className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markNotificationRead(n.id);
    if (n.linkAction) {
      if (n.linkAction.tab) setActiveTab(n.linkAction.tab);
      if (n.linkAction.entityId && n.linkAction.tab === 'hive_detail') {
        setSelectedHiveId(n.linkAction.entityId);
      }
      if (n.linkAction.entityId && n.linkAction.tab === 'batches') {
        setSelectedBatchId(n.linkAction.entityId);
      }
    }
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-[#E8E2D2] shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="p-4 border-b border-[#F0EBE0] flex items-center justify-between bg-[#FCFBF7]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#9A6B1F]" />
          <h4 className="text-sm font-bold text-[#20221F]">Intelligence & Alerts</h4>
        </div>
        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-semibold text-[#8C6B1F] hover:text-[#20221F] flex items-center gap-1 transition-colors"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark all read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-[#F5F1E8]">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-400">No active alerts at this moment.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`p-3.5 hover:bg-[#FFFDF7] cursor-pointer transition-colors flex items-start gap-3 ${
                !n.read ? 'bg-[#FFFDF4]' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className={`text-xs truncate ${!n.read ? 'font-bold text-[#20221F]' : 'font-medium text-[#555]'}`}>
                    {n.title}
                  </p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#D9A441] shrink-0" />}
                </div>
                <p className="text-[11px] text-[#666] line-clamp-2 mt-0.5 leading-relaxed">{n.message}</p>
                <div className="flex items-center justify-between mt-1.5 text-[10px] text-stone-400">
                  <span>{n.timestamp}</span>
                  {n.linkAction && (
                    <span className="text-[#8C6B1F] flex items-center gap-0.5 font-medium">
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-[#FAF7EF] border-t border-[#EFE9DC] text-center text-[11px] text-[#888]">
        National Beekeeping & Quality Mesh Telemetry
      </div>
    </div>
  );
};
