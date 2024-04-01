import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectsPage/ProjectDetailPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import AccountUsers from "../pages/AccountPage/AccountUsersPage";

import ResourceChartPage from "../pages/ResourceChartPage/ResourceChartPage";
import LoginRedirectPage from "../pages/AccountPage/LoginRedirectPage";
import AccountTeamPage from "../pages/AccountPage/AccountTeamPage";
import GlobalStyle from "../styles/GlobalStyle";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import styled from "styled-components";

const MainContent = styled.div`
  margin-left: 13rem;
  padding: 1rem;
`;

function App() {
  useEffect(() => {
    const path = window.location.pathname.substring(1);
    if (path.length > 20) {
      localStorage.setItem("accessToken", path);
      window.location.replace("/");
    }
  }, []);
  return (
    <Router>
      <GlobalStyle />
      <Sidebar />
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/project" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/resource" element={<ResourceChartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/team" element={<AccountTeamPage />} />
          <Route path="/account-management" element={<AccountUsers />} />
          <Route path="/auth/google-redirect" element={<LoginRedirectPage />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
