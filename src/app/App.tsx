import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectsPage/ProjectDetailPage";
import AccountPage from "../pages/AccountPage/AccountTeamPage";
import AccountUsers from "../pages/AccountPage/AccountUsersPage";
import LogoutPage from "../pages/LoginPage/LogoutPage";
import ResourceChartPage from "../pages/ResourceChartPage/ResourceChartPage";
import LoginRedirectPage from "../pages/LoginPage/LoginRedirectPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import AccountTeamPage from "../pages/AccountPage/AccountTeamPage";
import GlobalStyle from "../styles/GlobalStyle";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import styled from "styled-components";
import { fetchUserProfile } from "../api/accountApi";
const MainContent = styled.div`
  margin-left: 13rem;
  padding: 1rem;
`;

function App() {
  useEffect(() => {
    const path = window.location.pathname.substring(1);
    async function loadUserprofile() {
      if (path.length > 20) {
        localStorage.setItem("accessToken", path);
        window.location.replace("/");
        const userProfile = await fetchUserProfile();
        console.log(userProfile);
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
      }
    }
    loadUserprofile();
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
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account/team" element={<AccountTeamPage />} />
          <Route path="/account-management" element={<AccountUsers />} />
          <Route path="/auth" element={<LoginRedirectPage />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
