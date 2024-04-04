import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/index";

const LoginRedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleOAuthToken = async () => {
      try {
        const response = await get("/auth/google-redirect");
        const { accessToken } = response.data;
        console.log(response.data);
        localStorage.setItem("authToken", accessToken);
        navigate("/");
      } catch (error) {
        console.error("Google OAuth 토큰을 받아오는데 실패했습니다.", error);
      }
    };

    fetchGoogleOAuthToken();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default LoginRedirectPage;
