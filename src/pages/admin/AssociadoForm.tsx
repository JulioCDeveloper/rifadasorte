import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Associado } from '../../types';
import { useRequest } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

interface AssociadoFormProps {
  associado: Associado | null;
  onClose: () => void;
  fetchData: () => void;
}

export function AssociadoForm({ associado, onClose, fetchData }: AssociadoFormProps) {
  const [formData, setFormData] = useState({
    name: associado?.cliente_id?.nome || '',
    email: associado?.cliente_id?.email || '',
    password: associado?.password || '',
    phone: associado?.phone || '',
    document: associado?.document || '',
  });
  const { data, error, loading, request } = useRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await request("POST", "/api/auth/register-associado", { ...formData, nome: formData.name });
    const response = await request(
      `${associado?.cliente_id?._id ? "PUT" : "POST"}`,
      `${associado?.cliente_id?._id ? `/api/auth/clientes/${associado?.cliente_id?._id}` : "/api/auth/register-associado"}`,
      { ...formData, nome: formData.name }
      // Não precisa passar headers, o axios cuida do Content-Type
    );
    if (response) {
      toast.success('Cadastro realizado com sucesso!');
      await fetchData()
      onClose();
    }
    if (error) {
      toast.error(error || "Erro ao criar conta.")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {associado ? 'Editar Associado' : 'Novo Associado'}
          </h2>
          <p className="text-gray-600">
            {associado ? 'Edite as informações do associado' : 'Cadastre um novo associado'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              // required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              // required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF
              </label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              // required
              />
            </div>

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div> */}
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}