import React, { useState } from 'react';
import { Trophy, LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (login(email, password)) {
            // Login successful
        } else {
            setError('Credenciais inválidas');
        }
    };

    const demoAccounts = [
        { email: 'admin@sorteданорte.com', role: 'Administrador', password: 'admin123' },
        { email: 'joao@email.com', role: 'Associado', password: 'joao123' },
        { email: 'maria@email.com', role: 'Comprador', password: 'maria123' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <Trophy className="h-12 w-12 text-green-600" />
                        <h1 className="text-3xl font-bold text-green-600">Sorte da Norte</h1>
                    </div>
                    <p className="text-gray-600">Sistema de Gestão de Rifas</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Fazer Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <LogIn className="h-5 w-5" />
                            <span>Entrar</span>
                        </button>
                    </form>
                </div>

                {/* Demo Accounts */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contas Demo</h3>
                    <div className="space-y-3">
                        {demoAccounts.map((account, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setEmail(account.email);
                                    setPassword(account.password);
                                }}
                                className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="font-medium text-gray-800">{account.role}</div>
                                <div className="text-sm text-gray-600">{account.email}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}