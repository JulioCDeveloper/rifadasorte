import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { AssociadoOverview } from './AssociadoOverview';
import { MinhasRifas } from './MinhasRifas';
import { Home, TicketIcon } from 'lucide-react';

export function AssociadoDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const sections = [
    { id: 'inicio', label: 'Início', icon: <Home className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'rifas', label: 'Minhas Rifas', icon: <TicketIcon className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AssociadoOverview />;
      case 'rifas':
        return <MinhasRifas />;
      case 'inicio':
        return window.location.href = '/'
      default:
        return <AssociadoOverview />;
    }
  };

  const getTitle = () => {
    const section = sections.find(s => s.id === currentSection);
    return section ? section.label : 'Dashboard';
  };

  return (
    <DashboardLayout
      title={getTitle()}
      currentSection={currentSection}
      onSectionChange={setCurrentSection}
      sections={sections}
    >
      {renderContent()}
    </DashboardLayout>
  );
}