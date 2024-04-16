import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 사용
import { logoutAsync } from "../../features/accountManagement/accountSlice";
import { AppDispatch } from "../../app/store";
import { post } from "../../api/index";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      // 서버에 로그아웃 요청
      await post("/auth/logout", {});
      localStorage.removeItem("accessToken"); // 로컬 스토리지의 액세스 토큰 삭제
      localStorage.removeItem("userProfile");

      // logoutAsync 액션 디스패치
      await dispatch(logoutAsync());

      alert("로그아웃 되었습니다.");
      navigate("/"); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃 실패", error);
      localStorage.removeItem("userProfile");
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
