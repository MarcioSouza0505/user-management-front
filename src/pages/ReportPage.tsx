import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCount, fetchByMonth } from '../features/reports/reportsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { useDelayedLoading } from '../hooks/useDelayedLoading';
import Spinner from '../components/Spinner/Spinner';

import ReportTable from './components/ReportTable';
import DownloadPdfButton from './components/DownloadPdf';
import { Container, Title } from './styles/ListUsersStyles';
import { Subtitle } from './styles/ReportPageStyles';
import { Button } from './styles/UserFormStyles';

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const rpt = useAppSelector(s => s.reports);
  const usr = useAppSelector(s => s.users);
  const loading = rpt.loading || usr.loading;
  const error = rpt.error || usr.error;
  const showSpinner = useDelayedLoading(loading, 2000);

  useEffect(() => {
    dispatch(fetchCount());
    dispatch(fetchByMonth());
    dispatch(fetchUsers());
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
      <Button
        variant="secondary"
        onClick={() => navigate('/users')}
        style={{ marginBottom: '1rem' }}
      >
        Voltar
      </Button>

      <Title>Relatórios</Title>
      <p><strong>Total de usuários:</strong> {rpt.count}</p>

      <DownloadPdfButton />

      <Subtitle>Usuários por Mês</Subtitle>
      <ReportTable />
    </Container>
  );
}
