import React, { memo } from "react";

import { styled } from "@mui/material/styles";
import { Grid, Paper, Button } from "@mui/material";
// import PropTypes from 'prop-types'

const PostsList = ({ postsList, handleClickDelete, handleClickUpdate }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "start",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      {postsList.map((post, index) => (
        <Grid item xs={4} key={post.id}>
          <Item>
            <img
              src={`https://picsum.photos/300/200/?random=${index}`}
              alt={`random pic`}
            />
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Button onClick={() => handleClickUpdate(post.id)}>Update</Button>
            <Button onClick={() => handleClickDelete(post.id)}>Delete</Button>
          </Item>
        </Grid>
      ))}
    </>
  );
};

// PostsList.propTypes = {}

export default memo(PostsList);
