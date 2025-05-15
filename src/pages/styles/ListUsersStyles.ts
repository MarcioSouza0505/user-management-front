// src/styles/ListUsersStyles.ts
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #222;
  margin-bottom: 1.5rem;
`;

export const NewUserButton = styled.button`
  background: #005fcc;
  color: #fff;
  font-weight: 600;
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.2s, transform 0.1s;

  &:hover { background: #004bb5; }
  &:active { transform: scale(0.98); }
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Th = styled.th`
  background: #005fcc;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  color: #333;
`;

export const ActionButton = styled.button<{ variant: 'edit' | 'delete' }>`
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: background 0.2s;

  ${({ variant }) =>
    variant === 'delete'
      ? `
    background: #d32f2f;
    color: #fff;
    &:hover { background: #b71c1c; }
  `
      : `
    background: #388e3c;
    color: #fff;
    &:hover { background: #2e7d32; }
  `}
`;

export const ReportsLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #005fcc;
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #004bb5; text-decoration: underline; }
`;
