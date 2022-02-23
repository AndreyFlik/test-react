import React, { useState, useEffect, useCallback } from "react";
import { Grid, Box, Button, Container } from "@mui/material";
import { getPosts, deletePostById } from "../services/api";
import PostsList from "../PostsList/PostsList";
import ModalFormUpdatePost from "../ModalFormUpdatePost/ModalFormUpdatePost";
import ModalFormNewPost from "../ModalFormNewPost/ModalFormNewPost";
import ModalDeletePost from "../ModalDeletePost/ModalDeletePost";

const Posts = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddNewPostModal, setOpenAddNewPostModal] = useState(false);
  const [postsList, setPostsList] = useState([]);
  const [postId, setPostId] = useState("");
  const [sendDelete, setSendDelete] = useState(false);
  const [currentPostContent, setCurrentPostContent] = useState(null);

  const handleClickUpdate = useCallback(
    (id) => {
      setOpenUpdateModal(true);
      setCurrentPostContent(postsList.find((item) => item.id === id));
    },
    [setOpenUpdateModal, postsList]
  );

  const handleCloseAndNotUpdate = () => {
    setOpenUpdateModal(false);
    setCurrentPostContent(null);
  };

  const handleClickDelete = useCallback(
    (id) => {
      setOpenDeleteModal(true);
      setPostId(id);
    },
    [setOpenDeleteModal, setPostId]
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

  const handleClickAddNewPost = useCallback(() => {
    setOpenAddNewPostModal(true);
  }, []);
  const handleClickNotAddNewPost = useCallback(() => {
    setOpenAddNewPostModal(false);
  }, []);

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
        console.log(`Delete`);
      })
      .catch((error) => console.error(error.message));

    setSendDelete(false);
    setPostId("");
  }, [postId, sendDelete]);

  return (
    <>
      <Container>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickAddNewPost}
        >
          Add New Post
        </Button>
        <Box>
          <Grid container spacing={4}>
            <PostsList
              handleClickDelete={handleClickDelete}
              handleClickUpdate={handleClickUpdate}
              postsList={postsList}
            />
            <ModalDeletePost
              openModal={openDeleteModal}
              handleCloseAndNotDelete={handleCloseAndNotDelete}
              handleCloseAndDelete={handleCloseAndDelete}
            />
            {currentPostContent && (
              <ModalFormUpdatePost
                currentPostContent={currentPostContent}
                openUpdateModal={openUpdateModal}
                handleCloseAndNotUpdate={handleCloseAndNotUpdate}
                setCurrentPostContent={setCurrentPostContent}
                setPostsList={setPostsList}
                postsList={postsList}
              />
            )}
            <ModalFormNewPost
              openModal={openAddNewPostModal}
              closeModal={handleClickNotAddNewPost}
              setPostsList={setPostsList}
              postsList={postsList}
              closeModalAddPost={setOpenAddNewPostModal}
            />
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Posts;
