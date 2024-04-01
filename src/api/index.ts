// import axios, { AxiosResponse } from "axios";

// // 백엔드 서버 URL 설정
// const backendPort = "5001";
// const serverUrl = `http://${window.location.hostname}:${backendPort}`;

// // 로컬 스토리지에서 액세스 토큰을 가져오는 함수
// function getAccessToken() {
//   return localStorage.getItem("accessToken") || ""; // 액세스 토큰이 없으면 빈 문자열 반환
// }

// // GET 요청
// async function get(
//   endpoint: string,
//   params: string = ""
// ): Promise<AxiosResponse> {
//   const accessToken = getAccessToken();
//   console.log("get!!!!token!!", accessToken);
//   console.log(`${serverUrl}${endpoint}/${params}`);

//   return axios.get(`${serverUrl}${endpoint}/${params}`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       withCredentials: true,
//     },
//   });
// }

// // POST 요청
// async function post(endpoint: string, data: any): Promise<AxiosResponse> {
//   const accessToken = getAccessToken();
//   return axios.post(`${serverUrl}${endpoint}`, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       withCredentials: true,
//     },
//   });
// }

// // PUT 요청
// async function put(endpoint: string, data: any): Promise<AxiosResponse> {
//   const accessToken = getAccessToken();
//   return axios.put(`${serverUrl}${endpoint}`, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//       withCredentials: true,
//     },
//   });
// }

// // PATCH 요청
// async function patch(endpoint: string, data: any): Promise<AxiosResponse> {
//   const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰을 가져옵니다.
//   return axios.patch(`${serverUrl}${endpoint}`, data, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`, // 요청 헤더에 액세스 토큰을 포함시킵니다.
//     },
//   });
// }
// // DELETE 요청
// export async function del(
//   endpoint: string,
//   params: string = ""
// ): Promise<AxiosResponse> {
//   const accessToken = getAccessToken();
//   return axios.delete(`${serverUrl}${endpoint}/${params}`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       withCredentials: true,
//     },
//   });
// }

// // 모듈로부터 함수들을 내보냅니다.
// export { get, post, put, patch, del as delete };

import axios, { AxiosResponse } from "axios";

const backendPort = "5001";
const serverUrl = `http://${window.location.hostname}:${backendPort}`;

function getAccessToken() {
  return localStorage.getItem("accessToken") || "";
}

const apiClient = axios.create({
  baseURL: serverUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 에러가 발생했고, 리트라이하지 않았다면
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 리트라이 했음을 표시
      try {
        // '/auth/refresh' 엔드포인트를 호출하여 액세스 토큰을 재발급 받습니다.
        // 이때 리프레시 토큰은 서버에서 쿠키를 통해 자동으로 처리됩니다.
        const { data } = await apiClient.post(`/auth/refresh`);
        localStorage.setItem("accessToken", data.accessToken); // 새 액세스 토큰 저장
        apiClient.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`; // 새 토큰으로 헤더 설정
        return apiClient(originalRequest); // 원래 요청을 새 토큰으로 재시도
      } catch (refreshError) {
        console.error("Unable to refresh access token", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function get(
  endpoint: string,
  params: string = ""
): Promise<AxiosResponse> {
  return apiClient.get(`${endpoint}/${params}`);
}

async function post(endpoint: string, data: any): Promise<AxiosResponse> {
  return apiClient.post(endpoint, data);
}

async function put(endpoint: string, data: any): Promise<AxiosResponse> {
  return apiClient.put(endpoint, data);
}

async function patch(endpoint: string, data: any): Promise<AxiosResponse> {
  return apiClient.patch(endpoint, data);
}

async function del(
  endpoint: string,
  params: string = ""
): Promise<AxiosResponse> {
  return apiClient.delete(`${endpoint}/${params}`);
}

export { get, post, put, patch, del };
