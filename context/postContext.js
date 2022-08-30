import { useState, createContext } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [post, setPost] = useState({
    posts: [],
  });

  return (
    <PostContext.Provider value={[post, setPost]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
