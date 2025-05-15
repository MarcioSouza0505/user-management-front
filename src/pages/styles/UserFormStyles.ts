import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #005fcc;
  }
`;

export const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: -0.75rem;
  margin-bottom: 0.75rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.375rem;
  transition: background 0.2s, transform 0.1s;

  ${({ variant }) =>
    variant === 'secondary'
      ? `
    background: #6c757d;
    color: #fff;
    &:hover { background: #5a6268; }
  `
      : `
    background: #005fcc;
    color: #fff;
    &:hover { background: #004bb5; }
  `}

  &:active {
    transform: scale(0.98);
  }
`;
