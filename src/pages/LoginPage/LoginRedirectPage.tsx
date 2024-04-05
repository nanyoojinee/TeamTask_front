import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../api/index";
import { fetchUserProfile } from "../../api/accountApi";

const LoginRedirectPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleOAuthToken = async () => {
      try {
        const response = await get("/auth");
        const { accessToken } = response.data;

        // Await the asynchronous call to fetchUserProfile
        const userProfile = await fetchUserProfile();

        // Assuming userProfile is an object, you should convert it to a string
        // to store in localStorage
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
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
