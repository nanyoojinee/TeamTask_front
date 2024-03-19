import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import ResourceChartPage from "../pages/ResourceChartPage/ResourceChartPage";
import GlobalStyle from "../styles/GlobalStyle";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import styled from "styled-components";

// 메인 컨텐츠 영역을 위한 스타일 컴포넌트 생성
const MainContent = styled.div`
  margin-left: 13rem; // 사이드바 너비만큼 마진을 줍니다.
  padding: 1rem; // 컨텐츠에 패딩을 추가합니다.
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Sidebar />
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/resource" element={<ResourceChartPage />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
