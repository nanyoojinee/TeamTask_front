import axios, { AxiosResponse } from "axios";

// 백엔드 서버 URL 설정
const backendPort = "5001";
const serverUrl = `http://${window.location.hostname}:${backendPort}`;

// 로컬 스토리지에서 액세스 토큰을 가져오는 함수
function getAccessToken() {
  return localStorage.getItem("accessToken") || ""; // 액세스 토큰이 없으면 빈 문자열 반환
}

// GET 요청
async function get(
  endpoint: string,
  params: string = ""
): Promise<AxiosResponse> {
  const accessToken = getAccessToken();
  console.log("get!!!!token!!", accessToken);
  console.log(`${serverUrl}${endpoint}/${params}`);

  return axios.get(`${serverUrl}${endpoint}/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    },
  });
}

// POST 요청
async function post(endpoint: string, data: any): Promise<AxiosResponse> {
  const accessToken = getAccessToken();
  return axios.post(`${serverUrl}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    },
  });
}

// PUT 요청
async function put(endpoint: string, data: any): Promise<AxiosResponse> {
  const accessToken = getAccessToken();
  return axios.put(`${serverUrl}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    },
  });
}

// PATCH 요청
async function patch(endpoint: string, data: any): Promise<AxiosResponse> {
  const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰을 가져옵니다.
  return axios.patch(`${serverUrl}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`, // 요청 헤더에 액세스 토큰을 포함시킵니다.
    },
  });
}
// DELETE 요청
export async function del(
  endpoint: string,
  params: string = ""
): Promise<AxiosResponse> {
  const accessToken = getAccessToken();
  return axios.delete(`${serverUrl}${endpoint}/${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      withCredentials: true,
    },
  });
}

// 모듈로부터 함수들을 내보냅니다.
export { get, post, put, patch, del as delete };
