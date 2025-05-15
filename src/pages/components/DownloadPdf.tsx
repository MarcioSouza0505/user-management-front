import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAppSelector } from '../../app/hooks';
import { Button } from '../styles/UserFormStyles';

export default function DownloadPdfButton() {
  const { count, byMonth } = useAppSelector(s => s.reports);
  const { list: users } = useAppSelector(s => s.users);

  const handleClick = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'A4' });
    const margin = 40;
    let y = 60;

    doc.setFontSize(18);
    doc.text('Relatório de Usuários', margin, y);

    y += 30;
    doc.setFontSize(12);
    doc.text(`Total de usuários: ${count}`, margin, y);

    y += 30;
    autoTable(doc, {
      head: [['Mês', 'Total']],
      body: byMonth.map(r => [r.month, r.total.toString()]),
      startY: y,
      margin: { left: margin, right: margin },
      styles: { fontSize: 10 },
      headStyles: { fillColor: '#005fcc' },
    });

    // pega finalY da primeira tabela
    const afterSummary = (doc as any).lastAutoTable.finalY + 40;

    doc.setFontSize(14);
    doc.text('Detalhamento de Usuários', margin, afterSummary);

    const detailStart = afterSummary + 20;
    autoTable(doc, {
      head: [['Matrícula','Nome','E-mail','Documento','Nascimento']],
      body: users.map(u => [
        u.id.toString().padStart(6,'0'),
        u.name,
        u.email,
        u.documentNumber,
        new Date(u.birthDate).toLocaleDateString(),
      ]),
      startY: detailStart,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 },
      headStyles: { fillColor: '#005fcc' },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 100 },
        2: { cellWidth: 120 },
      },
    });

    doc.save('relatorio-usuarios.pdf');
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      style={{ marginBottom: '1rem' }}
    >
      Baixar PDF
    </Button>
  );
}
