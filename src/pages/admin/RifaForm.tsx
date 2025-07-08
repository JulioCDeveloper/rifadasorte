import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { Rifa } from '../../types';
import { useRequest } from '../../hooks/useRequest';
import { toast } from 'react-toastify';

interface RifaFormProps {
  rifa: Rifa | null;
  onClose: () => void;
  fetchData: () => void;
}

export function RifaForm({ rifa, onClose, fetchData }: RifaFormProps) {
  const [formData, setFormData] = useState({
    title: rifa?.nome || '',
    description: rifa?.descricao || '',
    price: rifa?.valor || 0,
    totalNumbers: rifa?.quantidade_numeros || 0,
    drawDate: rifa?.data_fim || '',
    status: rifa?.status || 'active' as 'active' | 'finalizada',
    image: rifa?.image || '',
    desconto: rifa?.desconto || 0,
    is_banner: rifa?.is_banner || false,
  });

  const [imagePreview, setImagePreview] = useState<string>(
    rifa?.image ? `data:image/jpeg;base64,${rifa.image}` : ''
  );
  const [dragActive, setDragActive] = useState(false);
  const { error, loading, request } = useRequest();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mapeando para os nomes exigidos pela API:
    const newFormData = {
      nome: formData.title,
      descricao: formData.description,
      quantidade_numeros: formData.totalNumbers,
      valor: formData.price,
      data_inicio: new Date().toISOString(), // valor do dia de hoje, formato ISO
      data_fim: formData.drawDate,    // ajuste se necessário
      image: formData.image,
      desconto: formData.desconto,
      is_banner: formData.is_banner,
      status: formData.status === "active" ? "ativa" : "aguardando"
    };

    const form = new FormData();
    form.append('nome', newFormData.nome);
    form.append('descricao', newFormData.descricao);
    form.append('quantidade_numeros', newFormData.quantidade_numeros);
    form.append('valor', newFormData.valor);
    form.append('data_inicio', new Date().toISOString());
    form.append('data_fim', newFormData.data_fim);
    form.append('is_banner', newFormData.is_banner);
    form.append('desconto', newFormData.desconto);
    form.append('status', newFormData.status === "active" ? "ativa" : "aguardando");

    // Se formData.image for um File (do input type="file"):
    form.append('image', formData.image);
    // Chamada correta:
    const response = await request(
      `${rifa?._id ? "PUT" : "POST"}`,
      `${rifa?._id ? `/api/auth/rifa/${rifa?._id}` : "/api/auth/register-rifas"}`,
      form // payload é o FormData, não um objeto!
      // Não precisa passar headers, o axios cuida do Content-Type
    );

    if (response?.rifa) {
      toast.success('Cadastro realizado com sucesso!');
      await fetchData()
      onClose()
    }
    if (error) {
      toast.error(error || "Erro ao criar conta.")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value: any = e.target.value;

    if (e.target.type === 'number') {
      value = parseFloat(e.target.value);
    } else if (e.target.type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    }

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

  const handleImageUpload = (file: File) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fullBase64 = e.target?.result as string;
        // Extract only the base64 part, removing the data:image/...;base64, prefix
        const base64Only = fullBase64.split(',')[1];

        setFormData(prev => ({
          ...prev,
          image: base64Only
        }));
        setImagePreview(fullBase64); // Keep full format for preview
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione apenas arquivos PNG ou JPG');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    setImagePreview('');
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
            {rifa ? 'Editar Rifa' : 'Nova Rifa'}
          </h2>
          <p className="text-gray-600">
            {rifa ? 'Edite as informações da rifa' : 'Cadastre uma nova rifa'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem da Rifa
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Arraste e solte uma imagem aqui, ou
                </p>
                <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                  <span>Selecionar Arquivo</span>
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Apenas arquivos PNG ou JPG
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Rifa
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço por Número
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desconto (%)
              </label>
              <input
                type="number"
                name="desconto"
                value={formData.desconto}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total de Números
              </label>
              <input
                type="number"
                name="totalNumbers"
                value={formData.totalNumbers}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Sorteio
              </label>
              <input
                type="date"
                name="drawDate"
                value={formatDate(formData.drawDate)}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="is_banner"
                  checked={formData.is_banner}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Definir como Banner Principal
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Esta rifa será destacada como banner principal na página inicial
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="ativa">Ativa</option>
                <option value="finalizada">Finalizada</option>
                <option value="aguardando">Aguardando</option>
              </select>
            </div>
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
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-2 rounded-lg font-semibold transition-colors shadow flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}