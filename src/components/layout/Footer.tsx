// components/layout/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      © 2023 MyApp. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
