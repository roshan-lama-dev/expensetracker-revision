import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <div>
      {" "}
      <Header />
      <div className="main">{children} </div>
      <Footer />
    </div>
  );
};
