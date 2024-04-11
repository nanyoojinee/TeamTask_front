import React, { useState, useEffect } from "react";
import styled from "styled-components";
// 필요한 아이콘 라이브러리를 임포트합니다.
import { FaSearch } from "react-icons/fa"; // 예시로 react-icons 사용
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { getProjects } from "../../features/projects/projectsSlice";
import { ProjectForm } from "./ProjectForm";
import { CreateProjectModal } from "./CreateProjectModal";
import { Project } from "../../types/index";
import { AppDispatch } from "../../app/store";
const Container = styled.div`
  padding: 1rem;
  margin: 2rem;
  margin-top: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 20rem;
  background-color: #eee;
  padding: 0.5rem;
  border-radius: 20px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  margin-left: 0.5rem;
  outline: none;
`;
const ProjectContainer = styled.div`
  margin: 3rem;
`;
const ProjectDetails = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const ProjectListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 2rem;
`;
const ViewSelector = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px; /* Increase gap between links */
  margin-bottom: 20px; /* Add margin below for the line */
  border-bottom: 1px solid #ccc; /* Add line */
  padding-bottom: 10px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 12px;
  text-decoration: none;
  font-size: 1rem;
`;
const ListContainer = styled.div`
  // 전체 리스트를 위한 스타일
  margin-top: 1rem;
`;

const ProjectBox = styled.div`
  // 각 프로젝트 아이템을 위한 박스 스타일
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 5px;
`;

export const Separator = styled.span`
  display: inline-block;
  position: relative;
  color: #ccc;

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: 50%;
    border-left: 0.5px solid #a0a0a0;
    /* height: calc(100% + 20px); */
    height: 2.7rem;
    transform: translateX(-50%);
  }
`;
interface DetailItemProps {
  padding: string; // Example: "0 15px"
}
const DetailItem = styled.span<DetailItemProps>`
  padding: ${({ padding }) =>
    padding || "0px"}; // Use provided padding or default
  display: inline-block;
`;

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("list"); // "list", "card", "board" 중 하나
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const projects: Project[] = useSelector(
    (state: RootState) => state.projects.list
  ); // 상태 선택자를 이용하여 프로젝트 목록 가져오기
  const reloadProjects = () => {
    dispatch(getProjects());
  };
  useEffect(() => {
    dispatch(getProjects()); // 페이지가 렌더링될 때 프로젝트 목록을 가져오는 액션 디스패치
  }, [dispatch]); // useEffect의 의존성 배열에 dispatch 추가

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleCreateProject = () => {
    navigate("/path-to-create-project"); // Update this path as necessary
  };
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const showMainView = () => setViewType("list");
  const showCardView = () => setViewType("card");
  const showBoardView = () => setViewType("board");

  // 검색어를 받아 처리하는 함수로 변경
  const handleSearchSubmit = (searchTerm: string) => {
    console.log("검색어 처리 로직, 검색어:", searchTerm);
    // 여기에 검색 로직 구현
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(searchTerm); // 변경된 함수 시그니처에 따라 searchTerm을 직접 전달
    }
  };

  return (
    <Container>
      <Header>
        <h1>프로젝트 조회/생성</h1>
        <StyledButton onClick={handleOpenModal}>+ 프로젝트 생성</StyledButton>
        <CreateProjectModal
          showModal={showModal}
          onClose={handleCloseModal}
          onCreateSuccess={reloadProjects}
        />
      </Header>
      <ViewSelector>
        <StyledButton onClick={showMainView}>메인</StyledButton>
        <Separator></Separator> {/* Replace this with the styled Separator */}
        <StyledButton onClick={showCardView}>카드</StyledButton>
        <Separator></Separator> {/* Replace this with the styled Separator */}
        <StyledButton onClick={showBoardView}>보드</StyledButton>
      </ViewSelector>
      <SearchContainer>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="프로젝트 검색"
          value={searchTerm}
          onChange={handleSearchInput}
          onKeyPress={handleEnterKeyPress}
        />
      </SearchContainer>
      <ProjectContainer>
        {viewType === "list" && (
          <ProjectForm viewType="list" projects={projects} />
        )}
        {viewType === "card" && (
          <ProjectForm viewType="card" projects={projects} />
        )}
        {viewType === "board" && (
          <ProjectForm viewType="board" projects={projects} />
        )}
        {/* 필터 및 정렬 드롭다운 추가 위치 */}
        {/* 프로젝트 리스트 헤더 */}
        {/* 프로젝트 리스트 렌더링 위치 */}
      </ProjectContainer>
    </Container>
  );
};

export default ProjectsPage;
