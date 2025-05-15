import styled from 'styled-components';

// Container geral
export const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fafafa;
`;

// Cada grupo de label+input
export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

// Label
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

// Input
export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #999;
  border-radius: 4px;
  font-size: 1rem;
`;

// Texto de erro
export const ErrorText = styled.p`
  color: #c00;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// Container dos botões
export const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
`;

// Botões genéricos
export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ variant }) =>
    variant === 'secondary' ? '#6c757d' : '#007bff'};
  color: white;
  &:hover {
    opacity: 0.9;
  }
`;
