import { useAppSelector } from '../../app/hooks';
import { Th, Tr, Td, Table } from '../styles/ListUsersStyles';


export default function ReportTable() {
  const { byMonth } = useAppSelector(s => s.reports);

  return (
    <Table>
      <thead>
        <tr>
          <Th>Mês</Th>
          <Th>Total</Th>
        </tr>
      </thead>
      <tbody>
        {byMonth.map((r, i) => (
          <Tr key={i}>
            <Td>{r.month}</Td>
            <Td>{r.total}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}
