import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

import { UserContext } from "./hooks/UserContext";

export function Router() {
  const { user, loading } = useContext(UserContext);

  const { id } = user;

  return (
    <>
      {id != null ? (
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </>
  );
}
