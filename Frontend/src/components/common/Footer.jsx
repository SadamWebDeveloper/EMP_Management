import React from "react";

const Footer = ({ style }) => {
  return (
    <footer
      style={{
        color: "#fff",
        padding: "10px 20px",
        textAlign: "center",
        position: "relative",
        width: "100%",
        ...style, // Allow overriding styles
      }}
    >
      © {new Date().getFullYear()} Ki Mobility Solutions. All Rights Reserved.
    </footer>
  );
};

export default Footer;
