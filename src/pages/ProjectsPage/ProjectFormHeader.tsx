import React from "react";
import styled from "styled-components";

const ListHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const HeaderItem = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1};
  text-align: center;
`;

const DetailValue = styled.div<{ flexValue?: number }>`
  flex: ${({ flexValue }) => flexValue || 1}; // 기본값은 1, 변경 가능
  text-align: center;
`;

export const ProjectFormHeader = () => {
  return (
    <ListHeaderContainer>
      <HeaderItem>작성단계</HeaderItem>
      <HeaderItem>프로젝트ID</HeaderItem>
      <HeaderItem flexValue={2}>고객사</HeaderItem>
      <HeaderItem>담당PM</HeaderItem>
      <HeaderItem flexValue={1.2}>상태</HeaderItem>
      <HeaderItem flexValue={2}>진행단계</HeaderItem>
      <HeaderItem flexValue={1.3}>구축단계</HeaderItem>
      <HeaderItem>최근 업데이트</HeaderItem>
    </ListHeaderContainer>
  );
};
