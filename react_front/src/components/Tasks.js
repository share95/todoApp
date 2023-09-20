import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataGrid, GridRow } from "@mui/x-data-grid";
import GridColDeff from "@mui/x-data-grid";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { Item } from "../theme";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Undo from "@mui/icons-material/Undo";
import Check from "@mui/icons-material/Check";
function Tasks() {
  const [taskList, setTaskList] = useState([{}]);
  const accessToken = localStorage.getItem("accessToken");
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`; // Set the JWT token as the authorization header
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => response.data)
      .then((data) => {
        setTaskList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.default",
        display: "table-row-group",
      }}
    >
      <Typography variant="h4" align="center">
        Task list
      </Typography>
      {typeof taskList === "undefined" || !taskList ? (
        <p> Tasks not found</p>
      ) : (
        taskList.map((t, i) => (
          <Item key={i}>
            <span className="lead">
              {t.completed ? <s> {t.title}</s> : t.title}
            </span>

            {t.completed ? (
              t.due
            ) : (
              <Typography variant="caption"> {t.due}</Typography>
            )}
             <Button variant="" color="success">
              <Check />
              
            </Button>
            <Button>
              <Edit />
              Edit
            </Button>
            <Button color="error">
              <Delete />
              Delete
            </Button>
          </Item>
        ))
      )}
    </Box>
  );
}

export default Tasks;
