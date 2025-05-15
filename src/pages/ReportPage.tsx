import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import { fetchCount, fetchByMonth } from '../features/reports/reportsSlice';
import { Container, Title, Subtitle, Table, Th, Td } from './styles/ReportPageStyles';

export default function ReportPage() {
  const dispatch = useAppDispatch();
  const { count, byMonth, loading, error } = useAppSelector(s => s.reports);

  useEffect(() => {
    dispatch(fetchCount());
    dispatch(fetchByMonth());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <Container><p style={{ color: 'red' }}>Error: {error}</p></Container>;

  return (
    <Container>
      <Title>Reports</Title>
      <p><strong>Total users:</strong> {count}</p>
      <Subtitle>Users by Month</Subtitle>
      <Table>
        <thead>
          <tr>
            <Th>Month</Th>
            <Th>Total</Th>
          </tr>
        </thead>
        <tbody>
          {byMonth.map((r, idx) => (
            <tr key={idx}>
              <Td>{r.month}</Td>
              <Td>{r.total}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
