import React, { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Loader } from "lucide-react";
import { useRequest } from '../hooks/useRequest';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const LoginForm = ({ onRegisterClick }) => {
    const [form, setForm] = useState({ cpf: '', senha: '', email: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const { setUser } = useAuth();
    const { data, error, loading, request } = useRequest();

    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = loginSchema.safeParse(form);

        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors('');
        const response = await request("POST", "/api/auth/login", { ...form, password: form.senha });
        if (response) {
            console.log(response?.dados)
            toast.success('Login realizado com sucesso!');
            setUser(response?.dados)
            localStorage.setItem("authTokenSorte", JSON.stringify(response?.dados))
            let to = "/";
            if (response?.dados?.cargo === "admin") to = "/dashboard/admin";
            else if (response?.dados?.cargo === "associado") to = "/dashboard/associado";
            else if (response?.dados?.cargo === "comprador") to = "/dashboard/comprador";
            navigate(to, { replace: true });
        } else {
            toast.error(response || "Erro ao realizar login");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#10b981]">Entrar</h2>
            {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <input
                    type="text"
                    name="cpf"
                    value={form.cpf}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="Digite seu CPF"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.cpf ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cpf && touched.cpf && (
                    <span className="text-red-500 text-xs">{errors.cpf}</span>
                )}
            </div> */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="email@email.com"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.cpf ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && touched.email && (
                    <span className="text-red-500 text-xs">{errors.email}</span>
                )}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                    type="password"
                    name="senha"
                    value={form.senha}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="Digite sua senha"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.senha ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.senha && touched.senha && (
                    <span className="text-red-500 text-xs">{errors.senha}</span>
                )}
            </div>
            {error && error && (
                <span className="text-red-500 text-xs">{error}</span>
            )}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-semibold transition-colors shadow
        ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#10b981] hover:bg-[#059669] text-white"
                    }`
                }
            >
                {loading ? (
                    <span className="flex items-center justify-center">
                        <Loader className="animate-spin mr-2 w-5 h-5" />
                        Entrando...
                    </span>
                ) : (
                    "Entrar"
                )}
            </button>
            <div className="text-center mt-4 text-sm text-gray-600">
                Não tem uma conta?{' '}
                <span
                    className="text-[#10b981] font-semibold cursor-pointer hover:underline"
                    onClick={onRegisterClick}
                >
                    Registre-se aqui.
                </span>
            </div>
        </form>
    );
};
