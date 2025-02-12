import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
