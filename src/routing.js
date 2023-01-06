import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Loader from "./components/global/Loader";

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Chats = lazy(() => import("./pages/Chats"));
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));

function Routing() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/login">
              <Chats />
            </PrivateRoute>
          }
        />

        <Route component={Error} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
