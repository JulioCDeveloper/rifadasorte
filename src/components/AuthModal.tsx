import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthModal = ({ onClose }) => {
    const [view, setView] = useState('login'); // 'login' ou 'register'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-8 relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                    onClick={onClose}
                    aria-label="Fechar"
                >&times;</button>

                {/* <div className="mb-6 flex justify-center">
                    <span
                        className={`px-4 py-2 rounded-l cursor-pointer select-none transition-colors font-semibold ${view === 'login'
                            ? 'bg-[#10b981] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setView('login')}
                    >
                        Entrar
                    </span>
                    <span
                        className={`px-4 py-2 rounded-r cursor-pointer select-none transition-colors font-semibold ${view === 'register'
                            ? 'bg-[#10b981] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setView('register')}
                    >
                        Registrar
                    </span>
                </div> */}

                {view === 'login'
                    ? <LoginForm onRegisterClick={() => setView('register')} />
                    : <RegisterForm onRegisterClick={() => setView('login')} />}
            </div>
        </div>
    );
};
