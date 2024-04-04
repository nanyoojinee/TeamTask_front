import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addProject } from "../../api/projectsModalApi";
import { ProjectData } from "../../types/index";
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 0 3rem;
`;

const Label = styled.label`
  flex-basis: 30%;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.7rem 1.8rem;
  margin-top: 2rem;
  border-radius: 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "black")};
  color: white;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "darkgrey")};
  }
`;

export const CreateProjectModal: React.FC<{
  showModal: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}> = ({ showModal, onClose, onCreateSuccess }) => {
  const [projectId, setProjectId] = useState("");
  const [client, setClient] = useState(""); // 'customer'를 'client'로 이름 변경
  const [managerId, setManagerId] = useState("");
  const [slackUrl, setSlackUrl] = useState("");

  const isFormValid = projectId && client && managerId && slackUrl;

  // Inside your CreateProjectModal component
  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        // Construct the data object according to the ProjectData interface
        const projectData: ProjectData = {
          managerId: Number(managerId), // 유저 목록에서 선택된 담당자의 ID
          projectId: projectId, // 프로젝트 ID, 적절한 값을 설정해야 합니다.
          client: client, // 고객사명
          slackUrl: slackUrl, // Slack URL
        };

        await addProject(projectData);
        onCreateSuccess();
        alert("프로젝트가 생성되었습니다!");
        // Reset form and close modal
        closeModal();
      } catch (error) {
        console.error("Failed to create project", error);
        alert("Failed to create project.");
      }
    }
  };

  const closeModal = () => {
    setProjectId("");
    setClient("");
    setManagerId("");
    setSlackUrl("");
    onClose();
  };

  if (!showModal) return null;

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <FormRow>
          <Label>프로젝트 ID</Label>
          <InputField
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Label>고객사</Label>
          <InputField
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Label>담당 PM</Label>
          <InputField
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <Label>슬랙 URL</Label>
          <InputField
            value={slackUrl}
            onChange={(e) => setSlackUrl(e.target.value)}
          />
        </FormRow>
        <SubmitButton disabled={!isFormValid} onClick={handleSubmit}>
          생성
        </SubmitButton>
      </ModalContainer>
    </ModalBackground>
  );
};
