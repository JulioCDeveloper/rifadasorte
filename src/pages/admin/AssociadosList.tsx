import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';
// import { mockAssociados } from '../../data/mockData';
import { AssociadoForm } from './AssociadoForm';
import { Associado } from '../../types';
import { useRequest } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

export function AssociadosList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [associados, setAssociados] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAssociado, setEditingAssociado] = useState<Associado | null>(null);
  const [viewingDetails, setViewingDetails] = useState<Associado | null>(null);
  const { error, loading, request } = useRequest();

  const fetchData = async () => {
    try {
      const data = await request('GET', '/api/auth/clientes');
      console.log(data)
      setAssociados(data?.users || [])
    } catch {
      console.log('erro na api')
    }
  }


  useEffect(() => {
    fetchData();
  }, []); // Apenas uma vez

  const filteredAssociados = associados?.filter(associado =>
    associado?.cliente_id?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    associado?.cliente_id?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (associado: Associado) => {
    setEditingAssociado(associado);
    setShowForm(true);
  };

  const handleDelete = async (associado: Associado) => {
    console.log(associado);
    const data = await request('DELETE', `/api/auth/clientes/${associado?.cliente_id?._id}`);

    if (data) {
      toast.success("Associado deletado com sucesso")
      await fetchData()
    }
  };

  const handleNew = () => {
    setEditingAssociado(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAssociado(null);
  };

  const handleViewDetails = (associado: Associado) => {
    setViewingDetails(associado);
  };

  if (showForm) {
    return (
      <AssociadoForm
        associado={editingAssociado}
        onClose={handleCloseForm}
        fetchData={fetchData}
      />
    );
  }

  if (viewingDetails) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewingDetails(null)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Voltar
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Detalhes do Associado</h2>
            <p className="text-gray-600">{viewingDetails.name}</p>
          </div>
        </div>

        {/* Associado Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Nome</p>
                  <p className="font-medium">{viewingDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{viewingDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{viewingDetails.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CPF</p>
                  <p className="font-medium">{viewingDetails.document}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Total de Vendas</p>
                  <p className="font-medium text-green-600">R$ {viewingDetails.totalSales.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Comissão Total (10%)</p>
                  <p className="font-medium text-blue-600">R$ {viewingDetails.totalEarnings.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Sacado</p>
                  <p className="font-medium text-purple-600">R$ {viewingDetails.totalWithdrawn.toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Saldo Disponível</p>
                  <p className="font-medium text-orange-600">
                    R$ {(viewingDetails.totalEarnings - viewingDetails.totalWithdrawn).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendas por Rifa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Vendas por Rifa</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Rifa</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Números Vendidos</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Receita Total</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Comissão (10%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {viewingDetails.rifasSales?.map((sale) => (
                  <tr key={sale.rifaId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{sale.rifaTitle}</td>
                    <td className="px-6 py-4 text-gray-900">{sale.soldNumbers}</td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      R$ {sale.totalRevenue.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">
                      R$ {sale.commission.toLocaleString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Associados</h2>
          <p className="text-gray-600">Gerencie os associados da plataforma</p>
        </div>
        <button
          onClick={handleNew}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Associado
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar associados..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nome</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Email</th>
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Telefone</th> */}
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th> */}
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Total Vendas</th> */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Comissão (10%)</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssociados.map((associado) => (
                <tr key={associado._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{associado?.cliente_id?.nome}</div>
                      <div className="text-sm text-gray-500">{associado.document}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{associado?.cliente_id?.email}</td>
                  {/* <td className="px-6 py-4 text-gray-900">{associado.phone}</td> */}
                  {/* <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${associado.status === 'ativo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {associado?.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td> */}
                  {/* <td className="px-6 py-4 font-medium text-green-600">
                    R$ {associado?.total_faturado?.toLocaleString('pt-BR') || 0}
                  </td> */}
                  <td className="px-6 py-4 font-medium text-blue-600">
                    {/* R$ {associado?.totalEarnings.toLocaleString('pt-BR')} */}
                    Comissão 10%
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(associado)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Ver detalhes"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(associado)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(associado)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}