import React from "react";
import Sidebar from "../components/common/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>

      <div style={{ display: "flex", flexGrow: 1 }}>
       {/* Sidebar Content */}     
        <Sidebar />

        {/* Main Content */}
        <div
          style={{
            marginLeft: "250px",
            padding: "20px",
            width: "100%",
          }}
        >
          {/* Toast Notification */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* Dynamic Content */}
          <Outlet />
        </div>
      </div>

      <Footer
        style={{
          width: "100%",
          marginLeft: 0,
        }}
      />
    </div>
  );
};

export default MainLayout;
