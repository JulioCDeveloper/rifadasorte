import React, { useState, useEffect } from 'react';
import { X, Copy, Clock, CheckCircle, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  pixCode: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, totalAmount, pixCode }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'confirmed'>('pending');
  // const [pixCode] = useState('00020126580014BR.GOV.BCB.PIX013636c4c14e-4b8a-4c4a-9c4a-1234567890ab5204000053039865802BR5925SORTE DA NORTE PREMIOS LTDA6009SAO PAULO62070503***6304A1B2');
  const [copied, setCopied] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(15 * 60);
      setPaymentStatus('processing');
      setCopied(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Simular confirmação de pagamento após 10 segundos (para demonstração)
  useEffect(() => {
    if (paymentStatus === 'processing') {
      const confirmTimer = setTimeout(() => {
        console.log('en')
        // setPaymentStatus('confirmed');
      }, 3000);
      return () => clearTimeout(confirmTimer);
    }
  }, [paymentStatus]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar código PIX:', err);
    }
  };

  // const handleSimulatePayment = () => {
  //   setPaymentStatus('processing');
  // };

  const handleConfirmPayment = () => {
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-800">
            {paymentStatus === 'confirmed' ? 'Pagamento Confirmado!' : 'Pagamento PIX'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {paymentStatus === 'confirmed' ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pagamento Confirmado!</h3>
              <p className="text-gray-600 mb-6">
                Seus títulos foram adquiridos com sucesso. Boa sorte!
              </p>
              <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                <p className="text-emerald-800 font-medium">
                  Valor pago: R$ {totalAmount.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Continuar
              </button>
            </div>
          ) : (
            // Payment State
            <>
              {/* Timer */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 text-red-700">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Tempo restante:</span>
                  <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  O QR Code expira em 15 minutos
                </p>
              </div>

              {/* Amount */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                <p className="text-gray-600 text-sm mb-1">Valor a pagar</p>
                <p className="text-3xl font-bold text-gray-800">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Escaneie o QR Code com seu app de pagamento
                </p>

                {/* PIX Code */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-2">Código PIX Copia e Cola:</p>
                  <div className="bg-white border rounded p-2 text-xs font-mono break-all text-gray-800 max-h-20 overflow-y-auto">
                    {pixCode}
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyPixCode}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${copied
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                  <Copy className="w-4 h-4" />
                  <span>{copied ? 'Código Copiado!' : 'Copiar Código PIX'}</span>
                </button>
              </div>

              {/* Payment Status */}
              {paymentStatus === 'processing' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 text-yellow-700">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-700"></div>
                    <span className="font-medium">Processando pagamento...</span>
                  </div>
                  <p className="text-yellow-600 text-sm mt-1">
                    Aguarde a confirmação do pagamento
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Como pagar:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Abra seu app de pagamento (Banco, PicPay, etc.)</li>
                  <li>2. Escaneie o QR Code ou cole o código PIX</li>
                  <li>3. Confirme o pagamento no seu app</li>
                  <li>4. Aguarde a confirmação automática</li>
                </ol>
              </div>

              {/* Demo Button - Remove in production */}
              {/* <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={handleSimulatePayment}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition-colors text-sm"
                  disabled={paymentStatus === 'processing'}
                >
                  {paymentStatus === 'processing' ? 'Processando...' : '🔧 Simular Pagamento (Demo)'}
                </button>
                <p className="text-xs text-gray-500 text-center mt-1">
                  Botão apenas para demonstração
                </p>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};