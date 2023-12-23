import React from "react";
import { Route, Routes } from "react-router-dom";
import { StartLogin } from "./startLogin";
import { LoginCallback } from "./loginCallback";
import { ProfileView } from "./profileView";

export function LoginRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<StartLogin />} />
      <Route path={"/callback"} element={<LoginCallback />} />
      <Route path={"/profile"} element={<ProfileView />} />
      <Route path={"*"} element={<h2>Login page not found</h2>} />
    </Routes>
  );
}
