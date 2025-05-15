import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

export const NewUserButton = styled.button`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid #ccc;
  padding: 0.5rem;
  background: #f0f0f0;
  text-align: left;
`;

export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 0.5rem;
`;

export const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  background: #28a745;
  color: white;
  cursor: pointer;
  &:last-child { background: #dc3545; }
  &:hover { opacity: 0.9; }
`;

export const ReportsLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;
