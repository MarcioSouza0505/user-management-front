import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Spinner from '../components/Spinner';
import { fetchUsers, removeUser } from '../features/users/usersSlice';
import { NewUserButton, ActionButton, ReportsLink } from './styles/ListUsersStyles';
import { Container, Title, Table, Th, Td } from './styles/ReportPageStyles';


export default function UserListPage() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector(s => s.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <Container><p style={{ color: 'red' }}>Error: {error}</p></Container>;

  return (
    <Container>
      <Title>Users</Title>
      <NewUserButton onClick={() => navigate('/users/new')}>
        New User
      </NewUserButton>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th><Th>Name</Th><Th>Email</Th><Th>Document</Th><Th>Birth</Th><Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {list.map(u => (
            <tr key={u.id}>
              <Td>{u.id}</Td>
              <Td>{u.name}</Td>
              <Td>{u.email}</Td>
              <Td>{u.documentNumber}</Td>
              <Td>{new Date(u.birthDate).toLocaleDateString()}</Td>
              <Td>
                <ActionButton onClick={() => navigate(`/users/${u.id}`)}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => dispatch(removeUser(u.id))}>
                  Delete
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ReportsLink href="/reports">View Reports</ReportsLink>
    </Container>
  );
}
