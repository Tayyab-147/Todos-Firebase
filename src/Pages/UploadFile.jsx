import React, { useState } from "react";
import { MuiFileInput } from "mui-file-input";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, storage } from "../Firebase/firebase";
import { Box, Button, Divider, Typography } from "@mui/material";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [perc, setPerc] = useState(100);
  // const currentUser = auth.currentUser;
  const userUID = JSON.parse(localStorage.getItem("UserUID"));
  const [imageUrls, setImageUrls] = useState([]);

  const getImageData = () => {
    const listRef = ref(storage, `users/${userUID}`);
    listAll(listRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).catch((error) => {
            console.error("Error getting download URL:", error);
            return null;
          })
        );
        // Wait for all promises to resolve
        return Promise.all(promises);
      })
      .then((downloadUrls) => {
        const validUrls = downloadUrls.filter((url) => url !== null);
        setImageUrls(validUrls);
      })
      .catch((error) => {
        console.error("Error listing files:", error);
      });
  };
  getImageData();

  const handleChange = (newFile) => {
    setFile(newFile);
  };

  const handleSubmit = () => {
    file && (uploadFile(), setFile(null));
  };

  const uploadFile = () => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, `users/${userUID}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setPerc(progress);
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        //   default:
        //     break;
        // }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef)
          .then((downloadURL) => {
            setImageUrls([...imageUrls, downloadURL]);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          marginBottom: 3,
        }}
      >
        <MuiFileInput
          value={file}
          onChange={handleChange}
          placeholder="Select a file..."
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={perc === 100 ? false : true}
          sx={{ marginLeft: 2 }}
        >
          {perc === 100 ? "Upload" : "Uploading..."}
        </Button>
      </Box>
      <Divider />
      <Typography sx={{ marginTop: 2, textAlign: "center" }}>
        Uploaded Files
      </Typography>
      <Box
        sx={{
          marginTop: 1,
          textAlign: "center",
        }}
      >
        {imageUrls.map(
          (imageUrl, index) =>
            imageUrl && (
              <Box
                key={index}
                sx={{
                  margin: 1,
                  border: 1,
                  display: "inline-block",
                  borderRadius: 2,
                  padding: 0.8,
                  boxShadow: 5,
                }}
              >
                <img
                  src={imageUrl}
                  alt="img"
                  style={{ width: "125px", height: "125px" }}
                />
              </Box>
            )
        )}
      </Box>
    </>
  );
};

export default UploadFile;
