import React, { useState } from "react";
import styled from "styled-components";
import { updateTeam } from "../../api/accountTeamApi"; // api 함수 import 경로에 따라 조정하세요.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #4285f4;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const AccountTeamPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<number>(0);

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(Number(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      await updateTeam(selectedTeam);
      alert("팀 정보가 업데이트되었습니다.");
    } catch (error) {
      alert("팀 정보 업데이트에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>팀 선택</Title>
      <Select value={selectedTeam} onChange={handleTeamChange}>
        <option value="0">팀을 선택하세요</option>
        <option value="1">팀 1</option>
        <option value="2">팀 2</option>
        <option value="3">팀 3</option>
        <option value="4">팀 4</option>
      </Select>
      <Button onClick={handleSubmit}>제출</Button>
    </Container>
  );
};

export default AccountTeamPage;
