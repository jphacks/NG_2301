import { Route, Routes } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import { Home } from "../components/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
