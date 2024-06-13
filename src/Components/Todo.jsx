import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Todo = ({ data, todos, showButtons, userUID, db }) => {
  const handleDeleteTodo = async (id) => {
    try {
      const todoDocRef = doc(db, `users/${userUID}/todos`, id);
      await deleteDoc(todoDocRef);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const todoDocRef = doc(db, `users/${userUID}/todos/`, id);
      const currentTodo = todos.find((todo) => todo.id === id);
      const currentCompleted = currentTodo.completed;
      await updateDoc(todoDocRef, {
        completed: !currentCompleted,
      });
    } catch (error) {
      console.error("Error updating todo completion status:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        border: 1.34,
        marginY: 1,
        borderRadius: 2,
        padding: 1,
        boxShadow: 4,
        backgroundColor: data.completed
          ? "rgba(0,255,0,0.4)"
          : "rgba(255,0,0,0.5)",
      }}
    >
      <Typography sx={{ margin: "auto" }}>{data.text}</Typography>
      {showButtons && (
        <>
          <Button
            variant="contained"
            onClick={() => handleCompleteTodo(data.id)}
            sx={{ marginX: 2, textTransform: "none" }}
          >
            {data.completed ? "Mark Incomplete" : "Mark Completed"}
          </Button>
          <Button variant="contained" onClick={() => handleDeleteTodo(data.id)}>
            X
          </Button>
        </>
      )}
    </Box>
  );
};

export default Todo;
