export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";
export { default as CreatePersonPage } from "./pages/CreatePersonPage";
export { default as PreloadPage } from "./pages/PreloadPage";
export { isAuthenticated, login, logout, register } from "./services/authService";
export type { AuthUser } from "./services/authService";
