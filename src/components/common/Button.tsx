// components/common/Button.tsx
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);
