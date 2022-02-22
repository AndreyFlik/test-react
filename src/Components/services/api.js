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

const updatePostById = async (postId, newBody) => {
  const res = await fetch(`${URL}posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify(newBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (res.status !== 200) {
    return Promise.reject("Oops, something went wrong");
  }

  return res.json();
};

export { getPosts, deletePostById, updatePostById };
