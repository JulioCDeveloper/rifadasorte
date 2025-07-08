import React, { useState } from 'react';
import { z } from 'zod';
import { useRequest } from '../hooks/useRequest';
import { toast } from 'react-toastify';

const registerSchema = z.object({
    nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    // cpf: z.string()
    //     .min(11, 'CPF deve ter 11 dígitos')
    //     .max(14, 'CPF inválido')
    //     .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, 'CPF inválido'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const RegisterForm = ({ onRegisterClick }) => {
    const [form, setForm] = useState({ nome: '', cpf: '', email: '', senha: '' });
    const [errors, setErrors] = useState({});
    const [errorMsg, setError] = useState("");
    const [touched, setTouched] = useState({});
    const { error, loading, request } = useRequest();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = registerSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors = {};
            result.error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        const data = await request("POST", "/api/auth/register", { ...form, password: form.senha });

        if (data) {
            localStorage.setItem("authTokenSorte", JSON.stringify(data?.dados))
            toast.success('Cadastro realizado com sucesso!');
        }
        if (error) {
            setError(error || "Erro ao criar conta.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-[#10b981]">Registrar</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="Digite seu nome"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.nome && touched.nome && (
                    <span className="text-red-500 text-xs">{errors.nome}</span>
                )}
            </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="Digite seu e-mail"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                    placeholder="Crie uma senha"
                    className={`w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#10b981] ${errors.senha ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.senha && touched.senha && (
                    <span className="text-red-500 text-xs">{errors.senha}</span>
                )}
            </div>
            {errorMsg && (
                <span className="text-red-500 text-xs">{errorMsg}</span>
            )}
            <button
                type="submit"
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-lg font-semibold transition-colors shadow flex items-center justify-center"
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                ) : null}
                {loading ? 'Registrando...' : 'Registrar'}
            </button>
            <div className="text-center mt-4 text-sm text-gray-600">
                Já tem uma conta?{' '}
                <span
                    className="text-[#10b981] font-semibold cursor-pointer hover:underline"
                    onClick={onRegisterClick}
                >
                    Faça login.
                </span>
            </div>
        </form>
    );
};
