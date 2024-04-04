import React from "react";
import { post } from "../../api/index";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      // 서버에 로그아웃 요청
      //   await post("/auth/logout", {});
      localStorage.removeItem("accessToken"); // 로컬 스토리지의 액세스 토큰 삭제
      alert("로그아웃 되었습니다."); // 사용자에게 로그아웃 알림
      navigate("/"); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <h1>로그아웃 페이지</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default LogoutPage;
