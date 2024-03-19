// api/index.ts
import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 환경 변수에서 API 기본 주소를 가져옵니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
