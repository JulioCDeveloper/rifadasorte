import React from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from '../assets/logo.png'
interface HeaderProps {
  onMenuToggle: () => void;
  onCartToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onCartToggle }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-black text-white h-16 flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left - Menu Button */}
      <button
        onClick={onMenuToggle}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Center - Logo */}
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Logo" className="w-16 h-14" />
      </div>

      {/* Right - Cart and Meus títulos */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onCartToggle}
          className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
        <span className="text-sm font-medium hidden sm:inline">Meus títulos</span>
      </div>
    </header>
  );
};