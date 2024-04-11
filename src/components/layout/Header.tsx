import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderContainer = styled.header`
  background: #eceff7;
  color: #333;
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
  font-size: 1rem;
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
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  console.log(localStorage);
  useEffect(() => {
    const userProfileString = localStorage.getItem("userProfile");
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      if (userProfile && userProfile.name) {
        setUserName(userProfile.name);
      }
    }
  }, []);

  return (
    <HeaderContainer>
      <Logo>MyApp</Logo>
      <UserInfo>
        <UserName>
          {userName ? `${userName}님 반갑습니다 🙌` : "반갑습니다 🙌"}
        </UserName>
        <IconContainer>
          <IoIosNotificationsOutline />
        </IconContainer>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
