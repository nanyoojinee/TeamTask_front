export const getToken = (): string | null => {
  return localStorage.getItem("accessToken"); // 'token'은 로컬 스토리지에 저장된 토큰의 키입니다.
};
