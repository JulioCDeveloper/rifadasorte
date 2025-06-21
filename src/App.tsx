import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FeaturedRaffle } from './components/FeaturedRaffle';
import { RaffleCard } from './components/RaffleCard';
import { CartModal } from './components/CartModal';
import { featuredRaffle, raffles } from './data/mockData';
import { Trophy } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <div className="transition-all duration-300">
          <Header onMenuToggle={toggleSidebar} onCartToggle={toggleCart} />
          
          <main className="p-4 max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-6 h-6 text-emerald-600" />
                <h1 className="text-xl font-bold text-gray-800">
                  Campanhas
                </h1>
                <span className="text-sm text-gray-500">Escolha sua sorte</span>
              </div>
            </div>

            {/* Featured Raffle */}
            <FeaturedRaffle {...featuredRaffle} />

            {/* Campaign Grid */}
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {raffles.map((raffle) => (
                  <RaffleCard
                    key={raffle.id}
                    {...raffle}
                    isHighlighted={raffle.status === 'active'}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>

        {/* Cart Modal */}
        <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;