// Main application controller. This is one of the most important files. It decides which page/dashboard the user sees based on their role.
// the brain of the frontend
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/public/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { MadhukrantiFlowModal } from './components/auth/MadhukrantiFlowModal';
import { GovernmentAdminDashboard } from './components/admin/GovernmentAdminDashboard';
import { BeekeeperDashboard } from './components/beekeeper/BeekeeperDashboard';
import { NonRegisteredDashboard } from './components/unregistered/NonRegisteredDashboard';
import { LabTechnicianDashboard } from './components/lab/LabTechnicianDashboard';
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { ConsumerPortal } from './components/consumer/ConsumerPortal';
import { HoneyPassportModal } from './components/consumer/HoneyPassportModal';
import { BlockchainExplorerModal } from './components/blockchain/BlockchainExplorerModal';
import { AIChatDrawer } from './components/chat/AIChatDrawer';

const MainLayout: React.FC = () => {
  const { currentRole, isAuthenticated } = useApp();
  const [showLanding, setShowLanding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // If user is not authenticated, require login first (or show public landing if explicitly selected)
  if (!isAuthenticated && !showLanding) {
    return <LoginPage onOpenLanding={() => setShowLanding(true)} onBackToApp={() => setShowLogin(false)} />;
  }

  if (showLanding) {
    return (
      <LandingPage
        onEnterPortal={() => {
          setShowLanding(false);
          setShowLogin(true);
        }}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginPage
        onBackToApp={() => setShowLogin(false)}
        onOpenLanding={() => setShowLanding(true)}
      />
    );
  }

  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'government':
        return <GovernmentAdminDashboard />;
      case 'beekeeper':
        return <BeekeeperDashboard />;
      case 'non_registered_beekeeper':
        return <NonRegisteredDashboard />;
      case 'lab':
        return <LabTechnicianDashboard />;
      case 'logistics':
        return <LogisticsDashboard />;
      case 'consumer':
        return <ConsumerPortal />;
      default:
        return <BeekeeperDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#20221F] flex flex-col font-sans selection:bg-[#F6E7A1] selection:text-[#20221F]">
      {/* Top Navigation */}
      <Navbar
        onOpenLanding={() => setShowLanding(true)}
        onOpenLogin={() => setShowLogin(true)}
      />

      {/* Main Content View with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar onOpenLogin={() => setShowLogin(true)} />
        <main className="flex-1 min-w-0">{renderRoleDashboard()}</main>
      </div>

      {/* Global Modals & Notifications */}
      <MadhukrantiFlowModal />
      <HoneyPassportModal />
      <BlockchainExplorerModal />
      <AIChatDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
