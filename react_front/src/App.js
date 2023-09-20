import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { Container, Paper, Typography } from "@mui/material";
import Axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./components/Tasks";
import jwtDecode from "jwt-decode";
import Logout from "./components/Logout";
import TaskDetails from "./components/TaskDetails";
import AddTask from "./components/AddTask";
import Register from "./components/Register";
function App() {
  Axios.defaults.baseURL = "http://localhost:5000/api";
  
  const [tokenData, setTokenData] = useState(
    localStorage.getItem("accessToken")
      ? jwtDecode(localStorage.getItem("accessToken"))
      : null
  );

  useEffect(() => {
    if (tokenData && tokenData.exp && tokenData.iat) {
      const currentTimestamp = new Date().getTime();
      if (currentTimestamp > tokenData.exp * 1000) {
        // if token is expired
        localStorage.removeItem("accessToken");
        setTokenData(null);
      }
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={tokenData ? <Tasks /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
