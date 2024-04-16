// types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  position: string | null;
  team: number | null;
  status: string | null;
}

// export interface Project {
//   id: number;
//   name: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   status: 'active' | 'completed' | 'paused';
// }
// types/index.ts
export interface Project {
  id: number;
  managerId: number;
  creationStage: string | null; // `null` 또는 다른 타입을 허용하려면 `|` 연산자를 사용하세요.
  projectId: string;
  status: string | null;
  progressStage: string | null;
  buildStage: string | null;
  client: string | null; // 클라이언트의 이름이 문자열이 될 수 있다면 `string | null`을 사용합니다.
  slackUrl: string;
  createdAt: string; // ISO 8601 형식의 날짜 문자열을 예상합니다.
  updatedAt: string; // ISO 8601 형식의 날짜 문자열을 예상합니다.
}

export interface ProjectData {
  managerId: number;
  projectId: string;
  client: string;
  slackUrl: string;
}
export interface UpdateProject {
  status: string | null;
  progressStage: string | null;
  buildStage: string | null;
  creationStage: string | null;
}
// types/index.ts 파일에 추가
export interface AccountState {
  userInfo: User | null;
  userProjects: Project[];
  isLoading: boolean;
  error: string | null;
}
