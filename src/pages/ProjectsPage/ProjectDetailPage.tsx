// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Project, UpdateProject } from "../../types";
// import {
//   fetchProjectById,
//   updateProject,
//   deleteProject,
// } from "../../api/projectsApi"; // Ensure correct import
// const ProjectDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [project, setProject] = useState<Project | null>(null);

//   // 프로젝트의 수정 가능한 필드 상태 관리
//   const [status, setStatus] = useState("");
//   const [progressStage, setProgressStage] = useState("");
//   const [buildStage, setBuildStage] = useState("");
//   const [creationStage, setcreationStage] = useState("");

//   useEffect(() => {
//     const loadProject = async () => {
//       if (!id) return;
//       const fetchedProject = await fetchProjectById(parseInt(id));
//       setProject(fetchedProject);
//       // API로부터 받아온 프로젝트 정보로 상태 업데이트
//       setStatus(fetchedProject.status || "");
//       setProgressStage(fetchedProject.progressStage || "");
//       setBuildStage(fetchedProject.buildStage || "");
//       setcreationStage(fetchedProject.creationStage || "");
//     };
//     loadProject();
//   }, [id]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!id) return;

//     // 수정된 필드만 포함된 객체 생성
//     const updatedProjectData: UpdateProject = {
//       status: status,
//       progressStage: progressStage,
//       buildStage: buildStage,
//       creationStage: creationStage,
//     };

//     await updateProject(parseInt(id), updatedProjectData); // 수정된 API 함수 사용
//     alert("프로젝트 정보가 업데이트되었습니다.");
//     navigate("/project"); // 업데이트 후 프로젝트 목록 페이지로 이동
//   };

//   const handleDelete = async () => {
//     const confirmation = window.confirm(
//       "Are you sure you want to delete this project?"
//     );
//     if (confirmation && id) {
//       try {
//         await deleteProject(parseInt(id)); // Use the delete function
//         alert("Project has been successfully deleted.");
//         navigate("/project"); // Redirect to the projects listing page
//       } catch (error) {
//         console.error("Error deleting project:", error);
//         alert("Failed to delete the project.");
//       }
//     }
//   };
//   if (!project) return <div>Loading...</div>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="creationStage">creation Stage:</label>
//         <input
//           id="creationStage"
//           type="text"
//           value={creationStage || ""} // 초기값으로 creationStage 상태 사용
//           onChange={(e) => setcreationStage(e.target.value)} // 입력값 변경 시 slackUrl 상태 업데이트
//         />
//       </div>
//       <div>
//         <label htmlFor="status">Status:</label>
//         <input
//           id="status"
//           type="text"
//           value={status || ""} // 초기값으로 status 상태 사용
//           onChange={(e) => setStatus(e.target.value)} // 입력값 변경 시 status 상태 업데이트
//         />
//       </div>
//       <div>
//         <label htmlFor="progressStage">Progress Stage:</label>
//         <input
//           id="progressStage"
//           type="text"
//           value={progressStage || ""} // 초기값으로 progressStage 상태 사용
//           onChange={(e) => setProgressStage(e.target.value)} // 입력값 변경 시 progressStage 상태 업데이트
//         />
//       </div>
//       <div>
//         <label htmlFor="buildStage">Build Stage:</label>
//         <input
//           id="buildStage"
//           type="text"
//           value={buildStage || ""} // 초기값으로 buildStage 상태 사용
//           onChange={(e) => setBuildStage(e.target.value)} // 입력값 변경 시 buildStage 상태 업데이트
//         />
//       </div>

//       <button type="submit">Update Project</button>
//       <button
//         type="button"
//         onClick={handleDelete}
//         style={{ backgroundColor: "red", marginLeft: "10px" }}
//       >
//         Delete Project
//       </button>
//     </form>
//   );
// };

// export default ProjectDetailPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Project, UpdateProject } from "../../types";
import {
  fetchProjectById,
  updateProject,
  deleteProject,
} from "../../api/projectsApi";
const Header = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  margin-top: 1rem;
`;
const ProjectHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div``;

// 다양한 크기의 컨테이너를 위한 스타일 추가
const SmallContainer = styled.div`
  flex: 1; // 모든 컨테이너는 가용 공간에 따라 크기 조정
  margin-right: 1rem;
`;

// 박스 높이 고정을 위한 스타일 수정
const Box = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  overflow: auto;
  height: 20vh;
  background-color: #f1f1f1;
`;
const CenteredBox = styled(Box)`
  display: flex;
  justify-content: center; // 수평 방향 가운데 정렬
`;

const BoxHeader = styled.h3`
  margin: 0 0 10px 0;
`;

const ProjectDetail = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  margin-right: 2rem;
`;

const Link = styled.a`
  color: #0077cc;
`;

const SecondContainer = styled.div`
  display: flex;
  flex-direction: row;
  // 박스들이 서로 다른 크기를 갖도록 flex 값 조정
  & > *:first-child {
    flex: 1;
  } // 첫 번째 박스 더 크게
  & > *:nth-child(2) {
    flex: 1;
  } // 두 번째 박스 기본 크기
  & > *:last-child {
    flex: 3;
  } // 마지막 박스 가장 크게
`;

const Section = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
`;
const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 5rem;
`;
const FirstBottomSection = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-direction: row;
`;
const SecondBottomSection = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-direction: column;
`;

const SmallCircle = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 3rem;
  width: 9rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
const ClientName = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;
const DetailName = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
`;
const EditableInput = styled.input`
  border: none;
  text-align: center;
`;
const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [status, setStatus] = useState("");
  const [progressStage, setProgressStage] = useState("");
  const [buildStage, setBuildStage] = useState("");
  const [creationStage, setcreationStage] = useState("");
  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      const fetchedProject = await fetchProjectById(parseInt(id));
      setProject(fetchedProject);
      setStatus(fetchedProject.status || "");
      setProgressStage(fetchedProject.progressStage || "");
      setBuildStage(fetchedProject.buildStage || "");
      setcreationStage(fetchedProject.creationStage || "");
    };
    loadProject();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) return;

    // 수정된 필드만 포함된 객체 생성
    const updatedProjectData: UpdateProject = {
      status: status,
      progressStage: progressStage,
      buildStage: buildStage,
      creationStage: creationStage,
    };

    await updateProject(parseInt(id), updatedProjectData); // 수정된 API 함수 사용
    alert("프로젝트 정보가 업데이트되었습니다.");
    navigate("/project"); // 업데이트 후 프로젝트 목록 페이지로 이동
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmation && id) {
      try {
        await deleteProject(parseInt(id)); // Use the delete function
        alert("Project has been successfully deleted.");
        navigate("/project"); // Redirect to the projects listing page
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete the project.");
      }
    }
  };

  if (!project) return <Container>Loading...</Container>;

  return (
    <Container>
      <Header>
        <ProjectHeader>
          <ClientName>{project.projectId}</ClientName>
          <ClientName>{project.client}</ClientName>
        </ProjectHeader>
        <Section>
          <ProjectDetail>
            <label htmlFor="status">상태</label>
            <EditableInput
              id="status"
              type="text"
              value={status || ""} // 초기값으로 status 상태 사용
              onChange={(e) => setStatus(e.target.value)}
            />
            <SmallCircle bgColor="#ffa500"></SmallCircle>
          </ProjectDetail>
          <ProjectDetail>
            <label htmlFor="progressStage">진행단계</label>
            <EditableInput
              id="progressStage"
              type="text"
              value={progressStage}
              onChange={(e) => setProgressStage(e.target.value)}
            />
            <SmallCircle bgColor="#90ee90">{project.progressStage}</SmallCircle>
          </ProjectDetail>
          <ProjectDetail>
            <DetailName>구축단계</DetailName>{" "}
            <SmallCircle bgColor="#ffff00">{project.buildStage}</SmallCircle>
          </ProjectDetail>
          <ProjectDetail>
            <DetailName>Slack URL</DetailName>{" "}
            <SmallCircle bgColor="#cecece">
              <Link href={project.slackUrl}>{project.slackUrl}</Link>
            </SmallCircle>
          </ProjectDetail>
        </Section>
      </Header>

      <BottomSection>
        <FirstBottomSection>
          <SmallContainer>
            <BoxHeader>담당자</BoxHeader>
            <Box>PM {project.managerId}</Box>
          </SmallContainer>
          <SmallContainer>
            <BoxHeader>프로젝트 정보</BoxHeader>
            <Box>계약기간 {/* 여기에 계약기간 입력 필드 추가 */}</Box>
          </SmallContainer>
          <SmallContainer>
            <BoxHeader>납품 정보</BoxHeader>
            <Box>최종납품일 {/* 여기에 날짜 선택 필드 추가 */}</Box>
          </SmallContainer>
        </FirstBottomSection>

        <SecondBottomSection>
          <BoxHeader>진행단계 상세</BoxHeader>
          <SecondContainer>
            <SmallContainer>
              <Box>내부킥오프</Box>
            </SmallContainer>
            <SmallContainer>
              <CenteredBox>
                <SmallCircle bgColor="#ffffff">완 료</SmallCircle>
              </CenteredBox>
            </SmallContainer>
            <SmallContainer>
              <Box>24/01/31 정유진, 한인규, 박승현</Box>
            </SmallContainer>
          </SecondContainer>
        </SecondBottomSection>
      </BottomSection>
      {/* 여기에 추가 박스/섹션 구성 */}
    </Container>
  );
};

export default ProjectDetailPage;
