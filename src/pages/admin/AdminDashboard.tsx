import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { AssociadosList } from './AssociadosList';
import { RifasList } from './RifasList';
import { Home, Users, TicketIcon } from 'lucide-react';

export function AdminDashboard() {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const sections = [
    { id: 'inicio', label: 'Início', icon: <Home className="h-5 w-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'associados', label: 'Associados', icon: <Users className="h-5 w-5" /> },
    { id: 'rifas', label: 'Rifas', icon: <TicketIcon className="h-5 w-5" /> },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AdminOverview />;
      case 'associados':
        return <AssociadosList />;
      case 'rifas':
        return <RifasList />;
      case 'inicio':
        return window.location.href = '/'
      default:
        return <AdminOverview />;
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