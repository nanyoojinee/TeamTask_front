// components/layout/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  width: 13rem;
  height: 100vh; /* 전체 높이 */
  position: fixed; /* 고정 위치 */
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 9vh;
  font-size: 22px;
  font-weight: 400;
`;

const DivideContainer = styled.div`
  padding: 20px 20px;
  height: 91vh;
  border-right: 0.5px solid #3e3e3e;
`;
const TitleLink = styled(Link)`
  color: white;
  display: block;
  padding: 10px;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;
const MenuBox = styled.div`
  margin-bottom: 50px;
`;
const MenuLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
  margin-bottom: 15px;
  margin-left: 17px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
`;

const MenuHeading = styled.p`
  font-weight: bold;
  margin-top: 0px;
  text-align: left;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <TitleContainer>
        <TitleLink to="/">DS실 업무관리</TitleLink>
      </TitleContainer>
      <DivideContainer>
        <nav>
          <MenuBox>
            <MenuHeading>프로젝트</MenuHeading>
            <Divider />
            <MenuLink to="/dashboard">대시보드</MenuLink>
            <MenuLink to="/project">프로젝트 조회/생성</MenuLink>
            <MenuLink to="/production">생산/납품관리</MenuLink>
          </MenuBox>
          <MenuBox>
            <MenuHeading>리소스</MenuHeading>
            <Divider />
            <MenuLink to="/resource-dashboard">대시보드</MenuLink>
            <MenuLink to="/resource-management">리소스 관리</MenuLink>
          </MenuBox>
          <MenuBox>
            <MenuHeading>계정관리</MenuHeading>
            <Divider />
            <MenuLink to="/account-management">계정관리</MenuLink>
          </MenuBox>
        </nav>
      </DivideContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
