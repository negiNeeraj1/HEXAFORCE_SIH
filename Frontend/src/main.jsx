import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { StudyMaterialProvider } from "./context/StudyMaterialContext";
import Navbar from "./Components/common/Navbar";
import Footer from "./Components/common/Footer";
import "./index.css";



const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <React.StrictMode>
        <AuthProvider>
          <StudyMaterialProvider>
            <Navbar />
            <App />
            <Footer />
          </StudyMaterialProvider>
        </AuthProvider>
      </React.StrictMode>
    </BrowserRouter>
  );
} else {
  console.error("Root element not found");
}
