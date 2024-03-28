import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project, UpdateProject } from "../../types";
import {
  fetchProjectById,
  updateProject,
  deleteProject,
} from "../../api/projectsApi"; // Ensure correct import
const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  // 프로젝트의 수정 가능한 필드 상태 관리
  const [status, setStatus] = useState("");
  const [progressStage, setProgressStage] = useState("");
  const [buildStage, setBuildStage] = useState("");
  const [creationStage, setcreationStage] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      const fetchedProject = await fetchProjectById(parseInt(id));
      setProject(fetchedProject);
      // API로부터 받아온 프로젝트 정보로 상태 업데이트
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
  if (!project) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="creationStage">creation Stage:</label>
        <input
          id="creationStage"
          type="text"
          value={creationStage || ""} // 초기값으로 creationStage 상태 사용
          onChange={(e) => setcreationStage(e.target.value)} // 입력값 변경 시 slackUrl 상태 업데이트
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <input
          id="status"
          type="text"
          value={status || ""} // 초기값으로 status 상태 사용
          onChange={(e) => setStatus(e.target.value)} // 입력값 변경 시 status 상태 업데이트
        />
      </div>
      <div>
        <label htmlFor="progressStage">Progress Stage:</label>
        <input
          id="progressStage"
          type="text"
          value={progressStage || ""} // 초기값으로 progressStage 상태 사용
          onChange={(e) => setProgressStage(e.target.value)} // 입력값 변경 시 progressStage 상태 업데이트
        />
      </div>
      <div>
        <label htmlFor="buildStage">Build Stage:</label>
        <input
          id="buildStage"
          type="text"
          value={buildStage || ""} // 초기값으로 buildStage 상태 사용
          onChange={(e) => setBuildStage(e.target.value)} // 입력값 변경 시 buildStage 상태 업데이트
        />
      </div>

      <button type="submit">Update Project</button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ backgroundColor: "red", marginLeft: "10px" }}
      >
        Delete Project
      </button>
    </form>
  );
};

export default ProjectDetailPage;
