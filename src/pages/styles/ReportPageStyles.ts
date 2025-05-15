import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #222;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
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
