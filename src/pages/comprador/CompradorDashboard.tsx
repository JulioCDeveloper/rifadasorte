import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { MeusTitulos } from './MeusTitulos';
import { CompradorOverview } from './CompradorOverview';
import { Home, TicketIcon } from 'lucide-react';

export function ComspradorDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const sections = [
    { id: 'inicio', label: 'Início', icon: <Home className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'titulos', label: 'Meus Títulos', icon: <TicketIcon className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <CompradorOverview />;
      case 'titulos':
        return <MeusTitulos />;
      case 'inicio':
        return window.location.href = '/'
      default:
        return <CompradorOverview />;
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