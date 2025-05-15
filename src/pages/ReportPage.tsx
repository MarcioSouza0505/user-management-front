import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner/Spinner';
import { fetchCount, fetchByMonth } from '../features/reports/reportsSlice';
import { useDelayedLoading } from '../hooks/useDelayedLoading';
import { Container, Title, Table, Th, Tr, Td } from './styles/ListUsersStyles';
import { Subtitle } from './styles/ReportPageStyles';
import { Button } from './styles/UserFormStyles';


export default function ReportPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { count, byMonth, loading, error } = useAppSelector(s => s.reports);

  const showSpinner = useDelayedLoading(loading, 2000);

  useEffect(() => {
    dispatch(fetchCount());
    dispatch(fetchByMonth());
  }, [dispatch]);

  if (showSpinner) return <Spinner />;
  if (error) {
    return (
      <Container>
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      {/* Botão Voltar */}
      <Button
        variant="secondary"
        onClick={() => navigate('/users')}
        style={{ marginBottom: '1rem' }}
      >
        Voltar
      </Button>

      <Title>Relatórios</Title>
      <p><strong>Total de usuários:</strong> {count}</p>
      <Subtitle>Usuários por Mês</Subtitle>
      <Table>
        <thead>
          <tr>
            <Th>Mês</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {byMonth.map((r, idx) => (
            <Tr key={idx}>
              <Td>{r.month}</Td>
              <Td>{r.total}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
