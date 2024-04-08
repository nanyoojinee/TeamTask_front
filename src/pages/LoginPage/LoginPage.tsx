// LoginPage.tsx
import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const GoogleLoginButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #357ae8;
  }
`;

const LoginPage: React.FC = () => {
  const handleGoogleLogin = (): void => {
    
    const googleLoginUrl: string = `http://localhost:5001/auth/google-redirect`;
    window.location.href = googleLoginUrl;
  };

  return (
    <LoginContainer>
      <GoogleLoginButton onClick={handleGoogleLogin}>
        구글 로그인하기
      </GoogleLoginButton>
    </LoginContainer>
  );
};

export default LoginPage;
