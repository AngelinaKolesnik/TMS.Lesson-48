import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Btn } from "./components/Btn/Btn";
import { Input } from "./components/Input/Input";

function App() {
  const [posts, setPosts] = useState([]);
  const [postsAmount, setPostsAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeAmount = (e) => {
    setPostsAmount(e.target.value);
  };

  const fetchPosts = async () => {
	setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://studapi.teachmeskills.by/blog/posts/?limit=${postsAmount}`
      );

      setPosts(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Btn title="Get posts" onClick={fetchPosts}></Btn>
      <Input type="number" min="1" max="100" onChange={changeAmount}></Input>
		<p>amount: {posts.length}</p>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              style={{
                height: 100,
              }}
            />
            <div>{new Date(post.date).toISOString()}</div>
            <div>{post.title}</div>
          </div>
        ))
      )}
    </>
  );
}

export default App;
