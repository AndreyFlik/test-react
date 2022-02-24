import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import PropTypes from "prop-types";
import { addNewPost } from "../services/api";

const ModalFormNewPost = ({
  openModal,
  closeModal,
  setPostsList,
  postsList,
  closeModalAddPost,
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
      title: "",
      body: "",
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addNewPost(values)
        .then((post) => {
          setPostsList([...postsList, post]);
          closeModalAddPost(false);
        })
        .catch((error) => console.error(error.message));
      resetForm();
    },
  });

  return (
    <Dialog
      open={openModal}
      onClose={closeModal}
      aria-labelledby="alert-dialog-Update"
    >
      <DialogTitle id="alert-dialog-Update">Add New Post</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            sx={{ width: "100%" }}
            multiline
            maxRows={4}
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
            maxRows={4}
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
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

ModalFormNewPost.propTypes = {
  openModal: PropTypes.bool,
  closeModal: PropTypes.func,
  setPostsList: PropTypes.func,
  postsList: PropTypes.array,
  closeModalAddPost: PropTypes.func,
};

export default ModalFormNewPost;
