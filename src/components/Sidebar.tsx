import React from 'react';
import {
  Home,
  Trophy,
  MessageCircle,
  CreditCard,
  UserPlus,
  Users,
  FileText,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

import Logo from '../assets/logo.png';

const navigationItems = [
  { icon: Home, label: 'Início', href: '#' },
  { icon: Trophy, label: 'Campanhas', href: '#' },
  { icon: MessageCircle, label: 'Comunicados', href: '#' },
  { icon: CreditCard, label: 'Meus títulos', href: '#' },
  // { icon: Gift, label: 'Minhas caixas', href: '#', badge: 'Novo' },
  { icon: UserPlus, label: 'Cadastro', href: '#' },
  { icon: Users, label: 'Ganhadores', href: '#' },
];

const legalItems = [
  { icon: FileText, label: 'Termos de uso', href: '#' },
  { icon: Shield, label: 'Política de privacidade', href: '#' },
  // { icon: Cookie, label: 'Política de cookies', href: '#' },
  // { icon: HelpCircle, label: 'Suporte', href: '#' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-80 bg-black text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-800">
            <div className="flex items-center space-x-3 p-6 mt-6 bg-red-400">
              <img src={Logo} alt="Logo" className="w-full h-full" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-400" />
                <span className="font-medium">{item?.label}</span>
                {item?.badge && (
                  <span className="ml-auto bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    {item?.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Legal Links */}
          <div className="px-4 py-4 border-t border-gray-800 space-y-1">
            {legalItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm text-gray-400 hover:text-white group"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Login Button */}
          <div className="p-4 border-t border-gray-800">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
              Entrar
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};