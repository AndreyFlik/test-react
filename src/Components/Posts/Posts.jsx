import React, { useState, useEffect, useCallback } from "react";
// import PropTypes from 'prop-types'

import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getPosts, deletePostById } from "../services/api";
import PostsList from "../PostsList/PostsList";

const Posts = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [postsList, setPostsList] = useState([]);
  const [postId, setPostId] = useState("");
  const [sendDelete, setSendDelete] = useState(false);

  const handleClickDelete = useCallback(
    (id) => {
      setOpenDeleteModal(true);
      setPostId(id);
    },
    [setOpenDeleteModal, setPostId]
  );
  const handleClickUpdate = useCallback(
    (id) => {
      setOpenUpdateModal(true);
      setPostId(id);
    },
    [setOpenUpdateModal, setPostId]
  );

  const handleCloseAndNotDelete = () => {
    setOpenDeleteModal(false);
  };
  const handleCloseAndDelete = () => {
    setSendDelete(true);
    setOpenDeleteModal(false);
    if (postId) {
      setPostsList(postsList.filter((item) => item.id !== postId));
    }
  };

  const handleCloseAndNotUpdate = () => {
    setOpenUpdateModal(false);
  };
  const handleCloseAndUpdate = () => {
    setOpenUpdateModal(false);
  };

  useEffect(() => {
    getPosts()
      .then((post) => setPostsList(post))
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    if (!sendDelete) {
      return;
    }
    deletePostById(postId)
      .then((post) => {
        console.log(post);
      })
      .catch((error) => console.error(error.message));

    setSendDelete(false);
    setPostId("");
  }, [postId, sendDelete]);

  return (
    <>
      <Box sx={{ width: "1000px" }}>
        <Grid container spacing={2}>
          <PostsList
            handleClickDelete={handleClickDelete}
            handleClickUpdate={handleClickUpdate}
            postsList={postsList}
          />
          {/* Модалка удаления */}
          <Dialog
            open={openDeleteModal}
            onClose={handleCloseAndNotDelete}
            aria-labelledby="alert-dialog-Delete"
          >
            <DialogTitle id="alert-dialog-Delete">Delete?</DialogTitle>
            <DialogContent>
              <DialogContentText>Delete this post?</DialogContentText>
            </DialogContent>
            {/* Кнопки подтверждения */}
            <DialogActions>
              <Button onClick={handleCloseAndNotDelete}>No</Button>
              <Button onClick={handleCloseAndDelete} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {/* Модалка изменения */}
          <Dialog
            open={openUpdateModal}
            onClose={handleCloseAndNotUpdate}
            aria-labelledby="alert-dialog-Update"
          >
            <DialogTitle id="alert-dialog-Update">Update post</DialogTitle>
            <DialogContent>
              <DialogContentText>Form Update Post</DialogContentText>
            </DialogContent>
            {/* Кнопки подтверждения */}
            <DialogActions>
              <Button onClick={handleCloseAndNotUpdate}>No</Button>
              <Button onClick={handleCloseAndUpdate} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </>
  );
};

// Posts.propTypes = {}

export default Posts;

// GET	/posts
// GET	/posts/1
// GET	/posts/1/comments
// GET	/comments?postId=1
// POST	/posts
// PUT	/posts/1
// PATCH	/posts/1
// DELETE	/posts/1
