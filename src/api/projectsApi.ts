import instance from './index';

export const fetchProjects = async () => {
  try {
    const response = await instance.get('/projects');
    return response.data;
  } catch (error) {
    throw error;
  }
};
// 프로젝트 데이터의 타입을 정의하는 인터페이스
export interface ProjectData {
  name: string;
  description: string;
  // 프로젝트 데이터에 포함될 다른 필드들...
}

// addProject 함수에서 ProjectData 타입을 사용
export const addProject = async (projectData: ProjectData) => {
  try {
    const response = await instance.post('/projects', projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

