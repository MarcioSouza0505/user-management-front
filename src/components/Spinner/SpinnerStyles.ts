import styled, { keyframes } from 'styled-components';

// Animação de rotação contínua
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

/**
 * A bolinha que vai girar
 */
export const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 95, 204, 0.2);
  border-top-color: #005fcc;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

/**
 * Container centralizado para o spinner
 */
export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;     /* ocupa toda a altura disponível */
  width: 100%;
`;
