const URL = "https://jsonplaceholder.typicode.com/";

const getPosts = async () => {
  const res = await fetch(`${URL}posts`);
  if (res.status !== 200) {
    return Promise.reject("Oops, something went wrong");
  }
  return res.json();
};

const deletePostById = async (postId) => {
  const res = await fetch(`${URL}posts/${postId}`, {
    method: "DELETE",
  });
  if (res.status !== 200) {
    return Promise.reject("Oops, something went wrong");
  }

  return res.json();
};

const updatePostById = async (currentPostContent, newBody) => {
  const res = await fetch(`${URL}posts/${currentPostContent.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...currentPostContent,
      title: newBody.title,
      body: newBody.body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 200) {
    return Promise.reject("Oops, something went wrong");
  }

  return res.json();
};
const addNewPost = async (body) => {
  const res = await fetch(`${URL}posts`, {
    method: "POST",
    body: JSON.stringify({
      title: body.title,
      body: body.body,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 201) {
    return Promise.reject("Oops, something went wrong");
  }

  return res.json();
};

export { getPosts, deletePostById, updatePostById, addNewPost };
