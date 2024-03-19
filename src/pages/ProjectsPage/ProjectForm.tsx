// src/components/ProjectList.tsx
import React from "react";
import styled, { css } from "styled-components";
import { ProjectFormHeader } from "./ProjectFormHeader";
// 리스트, 카드, 보드 형태에 따른 스타일 컴포넌트 예시

const ListContainer = styled.div`
  // 전체 리스트를 위한 스타일
  margin-top: 1rem;
`;

const ProjectBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const DetailValue = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1}; // 기본값은 1, 변경 가능
  text-align: center;
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
export interface Project {
  id: number;
  writingStage: string; // 작성단계
  projectId: string; // 프로젝트ID
  customer: string; // 고객사
  pm: string; // 담당PM
  status: string; // 상태
  progressStage: string; // 진행단계
  constructionStage: string; // 구축단계
  lastUpdate: string; // 최근 업데이트
}
const SmallCircle = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor}; // 배경색을 props에서 받음
  border-radius: 10rem; // 원형 모양
  padding: 0.5rem 2rem;
  width: auto; // 작은 원의 너비
  height: 2.5vh; // 작은 원의 높이
  display: inline-flex; // flex 아이템으로 표시
  justify-content: center; // 가로 중앙 정렬
  align-items: center; // 세로 중앙 정렬
  font-size: 15px;
  margin-top: -2rem;
`;
export const ProjectForm = ({
  viewType,
  projects,
}: {
  viewType: "list" | "card" | "board";
  projects: Project[];
}) => {
  switch (viewType) {
    case "list":
      return (
        <ListContainer>
          <ProjectFormHeader />
          <ListContainer>
            {projects.map((project) => (
              <ProjectBox key={project.id}>
                <DetailValue>{project.writingStage}</DetailValue>
                <DetailValue>{project.projectId}</DetailValue>
                <DetailValue flexValue={2}>{project.customer}</DetailValue>
                <DetailValue>{project.pm}</DetailValue>
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
                    {project.constructionStage}
                  </SmallCircle>
                </DetailValue>
                <DetailValue>{project.lastUpdate}</DetailValue>
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
