import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../api/accountApi";
import { updateUserProfile } from "../../features/accountManagement/accountSlice";
import { User } from "../../types";
import { AppDispatch } from "../../app/store";

const Container = styled.div`
  padding: 1rem;
  margin: 2rem;
  margin-top: 0;
`;
const MiddleContainer = styled.div`
  padding: 2rem 4rem;
`;
const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  margin-left: 0.5rem;
  outline: none;
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20rem;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 20px;
  margin-top: 1rem;
`;
const UserRow = styled.div<{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? "#D7FFEF" : "#F7F7F7")};
  padding: 7px 15px;
  display: flex;
  border-radius: 1rem;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const HeaderItem = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
`;
const Label = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
`;
const Button = styled.button<{ isEditing?: boolean }>`
  background-color: ${({ isEditing }) => (isEditing ? "red" : "black")};
  color: white;
  border: none;
  border-radius: 3rem;
  padding: 5px 15px;
  cursor: pointer;
`;
const EditableInput = styled.input`
  border: none;
  text-align: center;
  width: 5rem;
`;
const EditBox = styled.div`
  display: flex;
  border-radius: 0.7rem;
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 8rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

const AccountUsersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [team, setTeam] = useState<number | null>(null);
  const [date, setDate] = useState("");
  useEffect(() => {
    fetchUsers(); // 초기에 모든 사용자를 불러옴
  }, [dispatch]);

  const fetchUsers = async (name = "") => {
    setLoading(true);
    try {
      const fetchedUsers = await fetchAllUsers(name);
      setUsers(fetchedUsers);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    console.log("검색어 처리 로직, 검색어:", searchTerm);
    fetchUsers(searchTerm);
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(searchTerm);
    }
  };
  const statusTranslations: { [key: string]: string } = {
    active: "재직중",
    rejected: "거절",
    onleave: "휴직",
    resigned: "퇴사",
  };

  const handleEditClick = (user: User) => {
    setEditUserId(user.id);
    setPosition(user.role || "");
    setTeam(user.team ?? null);

    const safeStatusKey = user.status || "default";
    setStatus(statusTranslations[safeStatusKey] || user.status || "기본값");

    setName(user.name || "");
    setDate(user.modifiedDate || "");
    console.log(user);
    console.log(status);
  };

  const handleUpdateProfile = async () => {
    if (!editUserId) return;

    const updatedInfo = {
      name: name,
      role: position,
      team: team,
      status: status,
      modifiedDate: date,
    };

    try {
      console.log("Before update:", users);

      const updateResult = await dispatch(
        updateUserProfile({ userId: editUserId, userInfo: updatedInfo })
      ).unwrap();
      console.log("After update:", users);
      // 데이터 업데이트 후 사용자 목록을 다시 가져옴
      if (updateResult) {
        alert("Profile updated successfully!");

        console.log("true!!", updateResult);
        fetchAllUsers().then((fetchedUsers) => {
          setUsers(fetchedUsers);
        });
      }
      alert("Profile updated successfully!");
      setEditUserId(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <h1>계정 관리</h1>
      <SearchContainer>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="이름을 검색하세요"
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyPress={handleEnterKeyPress}
        />
      </SearchContainer>
      <MiddleContainer>
        <Header>
          <HeaderItem flexValue={2}>이름</HeaderItem>
          <HeaderItem flexValue={2}>직급</HeaderItem>
          <HeaderItem flexValue={2}>소속</HeaderItem>
          <HeaderItem flexValue={2}>상태</HeaderItem>
          <HeaderItem flexValue={2}>적용일</HeaderItem>
          <HeaderItem>수정</HeaderItem>
        </Header>
        {users.map((user, index) => (
          <UserRow key={user.id} isEven={index % 2 === 0}>
            {editUserId === user.id ? (
              <>
                <EditBox>
                  <EditableInput
                    type="text"
                    value={name === null ? "" : name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </EditBox>
                <EditBox>
                  <EditableInput
                    type="text"
                    value={position === null ? "" : position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </EditBox>
                <EditBox>
                  <EditableInput
                    type="number"
                    value={team === null ? "" : team}
                    onChange={(e) =>
                      setTeam(
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                </EditBox>
                <EditBox>
                  <EditableInput
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </EditBox>
                <EditBox>
                  <EditableInput
                    type="text"
                    value={date === null ? "" : date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </EditBox>
                <Button isEditing onClick={() => handleUpdateProfile()}>
                  확인
                </Button>
              </>
            ) : (
              <>
                <Label flexValue={2}>{user.name}</Label>
                <Label flexValue={2}>{user.role}</Label>
                <Label flexValue={2}>{user.team}</Label>
                <Label flexValue={2}>
                  {statusTranslations[user.status ?? ""]}
                </Label>
                <Label flexValue={2}>{user.modifiedDate}</Label>
                <Label>
                  <Button onClick={() => handleEditClick(user)}>Edit</Button>
                </Label>
              </>
            )}
          </UserRow>
        ))}
      </MiddleContainer>
    </Container>
  );
};

export default AccountUsersPage;
