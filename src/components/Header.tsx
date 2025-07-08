import React, { useState } from 'react';
import { Menu, ShoppingCart, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  onCartToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onCartToggle }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navigate = useNavigate();
  // Recupera o token e o nome do usuário do localStorage
  const authTokenSorte = JSON.parse(localStorage.getItem('authTokenSorte'));
  const userName = authTokenSorte?.nome // ajuste a chave conforme seu projeto
  // Função para peg  ar as iniciais
  const getInitials = (name: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAvatarClick = () => setDropdownOpen((v) => !v);

  const goToHome = () => {
    let to = "/";
    if (authTokenSorte?.cargo === "admin") to = "/dashboard/admin";
    else if (authTokenSorte?.cargo === "associado") to = "/dashboard/associado";
    else if (authTokenSorte?.cargo === "comprador") to = "/dashboard/comprador";

    console.log(to)
    navigate(to, { replace: true });
    setDropdownOpen(false);
  };

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

      {/* Right - Cart, Meus títulos e Avatar */}
      <div className="flex items-center space-x-4 relative">
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

        {/* Avatar e Dropdown */}
        {authTokenSorte && (
          <div className="relative">
            <button
              onClick={handleAvatarClick}
              className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg focus:outline-none"
            >
              {getInitials(userName)}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2 z-50">
                <button
                  onClick={goToHome}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ir para Home
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
