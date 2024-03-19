import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
`;

interface LayoutProps {
  children: ReactNode; // ReactNode 타입을 사용하여 children을 정의
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Sidebar />
        {children} // 이제 children 사용이 타입 체크를 통과합니다.
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
