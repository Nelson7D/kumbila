
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from 'react-router-dom';

const PaymentStatus = ({ status }) => {
  const navigate = useNavigate();

  if (status === 'loading') {
    return <div className="animate-pulse">Carregando...</div>;
  }

  if (status === 'not_found') {
    return (
      <>
        <Alert>
          <AlertDescription>
            Reserva não encontrada.
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => navigate('/dashboard/usuario')}
          className="mt-4"
        >
          Voltar para o Dashboard
        </Button>
      </>
    );
  }

  if (status === 'already_paid') {
    return (
      <>
        <Alert>
          <AlertDescription>
            Pagamento já realizado para esta reserva.
          </AlertDescription>
        </Alert>
        <Button
          onClick={() => navigate('/dashboard/usuario')}
          className="mt-4"
        >
          Ver Minhas Reservas
        </Button>
      </>
    );
  }

  return null;
};

export default PaymentStatus;
