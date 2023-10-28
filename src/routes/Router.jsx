import { Route, Routes } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import { Home } from "../components/Home";
import { RegisterLocation } from "../components/RegisterLocation";

export const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/register_location" element={<RegisterLocation />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
