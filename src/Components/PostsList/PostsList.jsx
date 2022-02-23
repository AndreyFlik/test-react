import React, { memo } from "react";

// import { styled } from "@mui/material/styles";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from "@mui/material";
import PropTypes from "prop-types";

const PostsList = ({ postsList, handleClickDelete, handleClickUpdate }) => {
  return (
    <>
      {postsList.map((post, index) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card
            sx={{
              maxWidth: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <Grid container direction="column"> */}
            <CardMedia
              component="img"
              width="350"
              image={`https://picsum.photos/350/200/?random=${index}`}
              alt="random pic"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" component="p">
                {post.body}
              </Typography>
            </CardContent>

            <CardActions sx={{ mt: "auto" }}>
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
            {/* </Grid> */}
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
