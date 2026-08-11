import ReactDOM from "react-dom/client";

import App from "@/app";
import "@/styles/styles.css";

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
