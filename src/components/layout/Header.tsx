// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
// const HeaderContainer = styled.header`
//   background: #eceff7;
//   color: #333;
//   height: 5vh;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Logo = styled.div`
//   font-weight: bold;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 1rem;
// `;

// const UserName = styled.div`
//   margin-right: 5rem;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   font-size: 0.9rem;
// `;

// const IconContainer = styled.span`
//   margin-left: 10px;
//   display: flex;
//   align-items: center;
//   font-size: 1.5rem;
//   margin-right: 1rem;
// `;

// // const Header: React.FC = () => {
// //   const [userName, setUserName] = useState<string | null>(null);
// //   console.log(localStorage);

// //   useEffect(() => {
// //     const userProfileString = localStorage.getItem("userProfile");
// //     if (userProfileString) {
// //       const userProfile = JSON.parse(userProfileString);
// //       if (userProfile && userProfile.name) {
// //         setUserName(userProfile.name);
// //       }
// //     }
// //   }, []);

// //   return (
// //     <HeaderContainer>
// //       <Logo>MyApp</Logo>
// //       <UserInfo>
// //         <UserName>
// //           {userName ? `${userName}님 반갑습니다 🙌` : "반갑습니다 🙌"}
// //         </UserName>
// //         <IconContainer>
// //           <IoIosNotificationsOutline />
// //         </IconContainer>
// //       </UserInfo>
// //     </HeaderContainer>
// //   );
// // };

// // export default Header;

// const Header = () => {
//   // 리덕스 스토어에서 사용자 정보 가져오기
//   const userInfoFromStore = useSelector(
//     (state: RootState) => state.account.userInfo
//   );

//   // 로컬 스토리지에서 사용자 정보 가져오기
//   const [userInfoFromStorage, setUserInfoFromStorage] = useState(() => {
//     const storedUserInfo = localStorage.getItem("userProfile");
//     return storedUserInfo ? JSON.parse(storedUserInfo) : null;
//   });
//   // 로컬 스토리지의 변경 감지
//   useEffect(() => {
//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === "userProfile") {
//         setUserInfoFromStorage(
//           event.newValue ? JSON.parse(event.newValue) : null
//         );
//       }
//     };
//     console.log(userInfoFromStorage);
//     window.addEventListener("storage", handleStorageChange);

//     // 컴포넌트 언마운트 시 이벤트 리스너 제거
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // 최종 사용자 정보 결정 (리덕스 스토어 또는 로컬 스토리지)
//   const userInfo = userInfoFromStore || userInfoFromStorage;
//   return (
//     <HeaderContainer>
//       <Logo>MyApp</Logo>
//       <UserInfo>
//         <UserName>
//           {userInfo ? `${userInfo.name}님 반갑습니다 🙌` : "반갑습니다 🙌"}
//         </UserName>
//         <IconContainer>
//           <IoIosNotificationsOutline />
//         </IconContainer>
//       </UserInfo>
//     </HeaderContainer>
//   );
// };

// export default Header;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

// 기존 스타일드 컴포넌트는 유지
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

interface User {
  name: string;
  // 필요에 따라 User 인터페이스를 확장할 수 있습니다.
}

const Header = () => {
  // 리덕스 스토어에서 사용자 정보 가져오기
  const userInfoFromStore = useSelector(
    (state: RootState) => state.account.userInfo
  );

  // 로컬 스토리지에서 사용자 정보 가져오기
  const [userInfoFromStorage, setUserInfoFromStorage] = useState<User | null>(
    () => {
      const storedUserInfo = localStorage.getItem("userProfile");
      return storedUserInfo ? JSON.parse(storedUserInfo) : { name: "게스트" };
    }
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userProfile") {
        setUserInfoFromStorage(
          event.newValue ? JSON.parse(event.newValue) : { name: "게스트" }
        );
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const userInfo = userInfoFromStore || userInfoFromStorage;

  return (
    <HeaderContainer>
      <Logo>MyApp</Logo>
      <UserInfo>
        <UserName>
          {userInfo && userInfo.name
            ? `${userInfo.name}님 반갑습니다 🙌`
            : "반갑습니다 🙌"}
        </UserName>
        <IconContainer>
          <IoIosNotificationsOutline />
        </IconContainer>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
