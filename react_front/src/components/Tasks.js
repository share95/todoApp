import axios from "axios";
import React, { useEffect, useState } from "react";

function Tasks() {
  const [taskList, setTaskList] = useState([{}]);
  const accessToken = localStorage.getItem("accessToken");
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${accessToken}`; // Set the JWT token as the authorization header
    return config;
  }, error =>{
    return Promise.reject(error);
  });
  useEffect(() => {
    axios
      .get("/tasks")
      // .then((response) => response.json())
      .then((data) => {
        setTaskList(data);
      })
      .catch((error) => {
        alert("error");
      });
  }, []);

  return (
    <div>
      {typeof taskList.taskList === "undefined" || !taskList.taskList ? (
        <p> Data not found </p>
      ) : (
        taskList.taskList.map((t, i) => <p key={i}>{t}</p>)
      )}
    </div>
  );
}

export default Tasks;
