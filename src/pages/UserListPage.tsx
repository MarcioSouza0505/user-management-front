import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner/Spinner';
import { fetchUsers, removeUser } from '../features/users/usersSlice';
import { Container, Title, NewUserButton, Table, Th, Tr, Td, ActionButton, ReportsLink } from './styles/ListUsersStyles';

export default function UserListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useAppSelector(s => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <Container>
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Usuários</Title>
      <NewUserButton onClick={() => navigate('/users/new')}>
        Novo Usuário
      </NewUserButton>

      <Table>
        <thead>
          <tr>
            <Th>Matrícula</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Documento</Th>
            <Th>Nascimento</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {list.map(u => {
            // usa o ID como matrícula, garantindo 6 dígitos com zeros à esquerda
            const matricula = u.id.toString().padStart(6, '0');
            return (
              <Tr key={u.id}>
                <Td>{matricula}</Td>
                <Td>{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>{u.documentNumber}</Td>
                <Td>{new Date(u.birthDate).toLocaleDateString()}</Td>
                <Td>
                  <ActionButton
                    variant="edit"
                    onClick={() => navigate(`/users/${u.id}`)}
                  >
                    Editar
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => dispatch(removeUser(u.id))}
                  >
                    Excluir
                  </ActionButton>
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>

      <ReportsLink href="/reports">Ver Relatórios</ReportsLink>
    </Container>
  );
}
