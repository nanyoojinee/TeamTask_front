// src/components/ProjectList.tsx
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { ProjectFormHeader } from "./ProjectFormHeader";
import { Project } from "../../types/index";
import { useNavigate } from "react-router-dom";
// 리스트, 카드, 보드 형태에 따른 스타일 컴포넌트 예시

const ListContainer = styled.div`
  // 전체 리스트를 위한 스타일
  margin-top: 1rem;
`;

const ProjectBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 1rem;
  cursor: pointer; // Change cursor to pointer to indicate it's clickable

  &:hover {
    background-color: #f0f0f0; // Optional: change background color on hover for visual feedback
  }
`;
const DetailButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const SmallCircle = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor}; // 배경색을 props에서 받음
  border-radius: 3rem; // 완벽한 원형 모양
  width: 7rem; // 고정된 너비
  height: 3rem; // 고정된 높이
  display: flex; // flex 아이템으로 표시
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  font-size: 15px; // 폰트 사이즈 조정이 필요할 수 있음
`;

export const DetailValue = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.span`
  display: inline-block;
  position: relative;
  color: #ccc;
  margin-top: 1rem;
  &:before {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: 50%;
    border-left: 0.5px solid #a0a0a0;
    height: 2.7rem;
    transform: translateX(-50%);
  }
`;

export const ProjectForm = ({
  viewType,
  projects,
}: {
  viewType: "list" | "card" | "board";
  projects: Project[];
}) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const calculateTimeDiff = (updatedAt: string, createdAt: string) => {
    const updatedAtDate = new Date(updatedAt).getTime();
    const currentDate = new Date().getTime(); // 현재 시간으로 변경
    const diffInMs = currentDate - updatedAtDate;
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 1) {
      return "방금";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}분 전`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`;
    } else if (diffInDays < 2) {
      return "어제";
    } else {
      const date = new Date(updatedAt);
      return `${date.getFullYear().toString().slice(2)}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    }
  };
  const handleNavigate = (projectId: any) => {
    // Navigate to the project detail page with the projectId
    navigate(`/project/${projectId}`);
  };

  switch (viewType) {
    case "list":
      return (
        <ListContainer>
          <ProjectFormHeader />
          <ListContainer>
            {projects.map((project) => (
              <ProjectBox
                key={project.id}
                onClick={() => handleNavigate(project.id)}
              >
                <DetailValue>{project.creationStage}</DetailValue>
                <DetailValue>{project.projectId}</DetailValue>
                <DetailValue flexValue={2}>{project.client}</DetailValue>
                <DetailValue>{project.managerId}</DetailValue>
                <DetailValue flexValue={1.2}>
                  <SmallCircle bgColor="#ffa500">{project.status}</SmallCircle>
                </DetailValue>
                <DetailValue flexValue={2}>
                  <SmallCircle bgColor="#90ee90">
                    {project.progressStage}
                  </SmallCircle>
                </DetailValue>
                <DetailValue flexValue={1.3}>
                  <SmallCircle bgColor="#ffff00">
                    {project.buildStage}
                  </SmallCircle>
                </DetailValue>
                <DetailValue>
                  {calculateTimeDiff(project.updatedAt, project.createdAt)}
                </DetailValue>
              </ProjectBox>
            ))}
          </ListContainer>
        </ListContainer>
      );
    // 'card'와 'board' 뷰 타입 처리는 여기서 생략
    case "card":
    case "board":
    default:
      return null;
  }
};
