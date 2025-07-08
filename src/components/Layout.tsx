import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Users, TicketIcon, BarChart3, Trophy, CreditCard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { user, logout, switchUser } = useAuth();

  const handleUserSwitch = (userId: string) => {
    switchUser(userId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-green-600">Sorte da Norte</h1>
              </div>
              <div className="hidden md:block">
                <span className="text-gray-600 text-sm">•</span>
                <span className="text-gray-600 text-sm ml-2">{title}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Switch for Demo */}
              <div className="hidden md:flex space-x-2">
                <button
                  onClick={() => handleUserSwitch('1')}
                  className={`px-3 py-1 rounded-full text-xs ${user?.role === 'admin'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  Admin
                </button>
                <button
                  onClick={() => handleUserSwitch('2')}
                  className={`px-3 py-1 rounded-full text-xs ${user?.role === 'associado'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  Associado
                </button>
                <button
                  onClick={() => handleUserSwitch('3')}
                  className={`px-3 py-1 rounded-full text-xs ${user?.role === 'comprador'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  Comprador
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}