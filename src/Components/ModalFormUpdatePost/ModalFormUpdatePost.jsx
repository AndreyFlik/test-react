import React from "react";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import { updatePostById } from "../services/api";
import { useFormik } from "formik";
import PropTypes from "prop-types";

const ModalFormUpdatePost = ({
  currentPostContent,
  openUpdateModal,
  handleCloseAndNotUpdate,
  setCurrentPostContent,
  setPostsList,
  postsList,
}) => {
  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length > 100 || values.title.length < 1) {
      errors.title = "1-100 characters";
    }
    if (!values.body) {
      errors.body = "Required";
    } else if (values.body.length > 1000 || values.body.length < 1) {
      errors.body = "1-1000 characters";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: currentPostContent?.title,
      body: currentPostContent?.body,
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      updatePostById(currentPostContent, values)
        .then((post) => {
          const newArray = postsList.map((list) => {
            if (list.id === post.id) {
              return { ...list, ...post };
            }
            return list;
          });
          setPostsList(newArray);
        })
        .catch((error) => console.error(error.message));
      setCurrentPostContent(null);
      resetForm();
    },
  });

  return (
    <Dialog
      open={openUpdateModal}
      onClose={handleCloseAndNotUpdate}
      aria-labelledby="alert-dialog-Update"
    >
      <DialogTitle id="alert-dialog-Update">Update post</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ width: "100%" }}
            multiline
            rows={5}
            onChange={formik.handleChange}
            value={formik.values.title}
            type="text"
            name="title"
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            margin="normal"
            label="Title"
            required
          />

          <TextField
            sx={{ width: "100%" }}
            multiline
            rows={5}
            onChange={formik.handleChange}
            value={formik.values.body}
            type="text"
            name="body"
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            margin="normal"
            label="Body"
            required
          />

          <div>
            <Button color="primary" variant="contained" type="submit">
              Update Post
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndNotUpdate}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
ModalFormUpdatePost.propTypes = {
  currentPostContent: PropTypes.object,
  openUpdateModal: PropTypes.bool,
  handleCloseAndNotUpdate: PropTypes.func,
  setCurrentPostContent: PropTypes.func,
  setPostsList: PropTypes.func,
  postsList: PropTypes.array,
};
export default ModalFormUpdatePost;
