import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Todo from "../Components/Todo";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import UploadFile from "./UploadFile";

const Home = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState();
  const [tempTodos, setTempTodos] = useState([]);
  const [showSortCompleted, setShowSortCompleted] = useState(false);
  const [showSortIncompleted, setShowSortIncompleted] = useState(false);

  // const user = auth.currentUser;
  const userUID = JSON.parse(localStorage.getItem("UserUID"));

  // const userUID = currentUser;
  // console.log("Home", userUID);
  // // console.log("tpye", typeof currentUser);
  // console.log("tpye", typeof userUID);

  useEffect(() => {
    const todoCollectionRef = collection(db, `users/${userUID}/todos`);
    const q = query(todoCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(updatedTodos);
    });
    return () => unsubscribe();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      try {
        const todoRef = collection(db, `users/${userUID}/todos`);
        const docRef = addDoc(todoRef, {
          text: input,
          completed: false,
          createdAt: serverTimestamp(),
        });
        setInput("");
        setShowSortCompleted(false);
        setShowSortIncompleted(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const sortByCompletion = () => {
    const check = todos.filter((todo) => todo.completed === true);
    setTempTodos(check);
    setShowSortCompleted(true);
    setShowSortIncompleted(false);
  };

  const sortByIncompletion = () => {
    const check = todos.filter((todo) => todo.completed === false);
    setTempTodos(check);
    setShowSortCompleted(false);
    setShowSortIncompleted(true);
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight={"bold"}>
          Create a To-Do
        </Typography>
        <TextField
          variant="outlined"
          type="input"
          // label="To-Do"
          placeholder="Type here..."
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          // InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: 1, width: { xs: "70%", lg: "40%" } }}
        />
        {todos &&
          todos.map((todo) => (
            <Todo
              key={todo.id}
              data={todo}
              todos={todos}
              showButtons={true}
              db={db}
              userUID={userUID}
            />
          ))}
        {todos && (
          <>
            <Divider sx={{ marginY: 2 }} />
            <Box>
              <Button variant="outlined" onClick={sortByCompletion}>
                Show Completed
              </Button>
              <Button
                variant="outlined"
                onClick={sortByIncompletion}
                sx={{ marginLeft: 2 }}
              >
                Show Incomplete
              </Button>
            </Box>
          </>
        )}
        {showSortCompleted &&
          tempTodos.map((todo, index) => (
            <Todo key={index} data={todo} showButtons={false} />
          ))}
        {showSortIncompleted &&
          tempTodos.map((todo, index) => (
            <Todo key={index} data={todo} showButtons={false} />
          ))}
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6" fontWeight={"bold"}>
          Upload Files
        </Typography>
      </Box>
      <UploadFile />
    </>
  );
};

export default Home;
