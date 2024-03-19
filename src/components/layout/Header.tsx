import React from "react";
import styled from "styled-components";
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderContainer = styled.header`
  background: #eceff7;
  color: #333; /* 텍스트 색상 변경 */
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem; /* 적절한 텍스트 크기 설정 */
`;

const UserName = styled.div`
  margin-right: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
`;

const IconContainer = styled.span`
  margin-left: 10px;
  display: flex;
  align-items: center;
  font-size: 1.5rem; /* 아이콘 크기 설정 */
  margin-right: 1rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>MyApp</Logo>
      <UserInfo>
        <UserName>
          정유진님 반갑습니다 🙌
          {/* <IconContainer>🙌</IconContainer> */}
        </UserName>
        <IconContainer>
          <IoIosNotificationsOutline />
        </IconContainer>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
