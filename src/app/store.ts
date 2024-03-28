// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import projectsModalReducer from "../features/projects/projectsModalSlice";
import projectsReducer from "../features/projects/projectsSlice";
import authReducer from "../features/auth/authSlice";
import accountReducer from "../features/accountManagement/accountSlice";
import resourceChartReducer from "../features/resourceChart/resourceChartSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    projectsModal: projectsModalReducer,
    projects: projectsReducer,
    account: accountReducer,
    resourceChart: resourceChartReducer,
    auth: authReducer,
  },
  // Redux DevTools 확장 프로그램 사용 설정 (기본적으로 활성화됨)
  devTools: process.env.NODE_ENV !== "production",
  // 필요한 경우 추가 미들웨어 설정
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // 추가 설정이 필요한 경우 여기에 추가
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;
