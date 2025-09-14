/* eslint-disable no-unused-vars */
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import ScrollToTopButton from "../../shared/CustomBackToTopButton";
import CustomFooter from "../../shared/CustomFooter";

const CustomNavbar = lazy(() => import("../../shared/CustomNavbar"));
const PageNotFound = lazy(() => import("../../shared/PageNotFound"));

const routesConfig = [
  {
    path: "/",
    Component: HomePage,
    accessRule: "public",
  },
  {
    path: "/login",
    Component: LoginPage,
    accessRule: "public",
  },
];

const RouteWrapper = ({ Component, accessRule }) => {
  const token = sessionStorage.getItem("token");

  switch (accessRule) {
    case "requireAuth":
      return token ? <Component /> : <Navigate to="/login" />;
    case "redirectIfAuth":
      return !token ? <Component /> : <Navigate to="/" />;
    case "public":
    default:
      return <Component />;
  }
};

function Router() {
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const loginPage = location.pathname === "/login";
    setIsLoginPage(loginPage);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Suspense fallback={<div />}>
        <CustomNavbar />
      </Suspense>

      {/* Main Content */}
      <main className={`flex-1 ${isLoginPage ? "" : "pt-[100px]"}`}>
        {/* Adjust pt-[100px] to match navbar height */}
        <Routes>
          {routesConfig.map(({ path, Component, accessRule }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <Suspense fallback={<div />}>
                  <RouteWrapper Component={Component} accessRule={accessRule} />
                </Suspense>
              }
            />
          ))}
          <Route
            path="*"
            element={
              <Suspense fallback={<div />}>
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>

      {/* Scroll Button */}
      <ScrollToTopButton />

      {/* Footer */}
      <CustomFooter />
    </div>
  );
}

export default Router;
