import React, { memo } from "react";

// import { styled } from "@mui/material/styles";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import PropTypes from "prop-types";

const PostsList = ({ postsList, handleClickDelete, handleClickUpdate }) => {
  return (
    <>
      {postsList.map((post, index) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <img
              src={`https://picsum.photos/300/200/?random=${index}`}
              alt={`random pic`}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Typography>{post.body}</Typography>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickUpdate(post.id)}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClickDelete(post.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

PostsList.propTypes = {
  postsList: PropTypes.array,
  handleClickDelete: PropTypes.func,
  handleClickUpdate: PropTypes.func,
};

export default memo(PostsList);
