import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const ModalDeletePost = ({
  openModal,
  handleCloseAndNotDelete,
  handleCloseAndDelete,
}) => {
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseAndNotDelete}
      aria-labelledby="alert-dialog-Delete"
    >
      <DialogTitle id="alert-dialog-Delete">Delete?</DialogTitle>
      <DialogContent>
        <DialogContentText>Delete this post?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAndNotDelete}>No</Button>
        <Button onClick={handleCloseAndDelete} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalDeletePost.propTypes = {
  openModal: PropTypes.bool,
  handleCloseAndNotDelete: PropTypes.func,
  handleCloseAndDelete: PropTypes.func,
};

export default ModalDeletePost;
