import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
// import { Btn } from "./components/Btn/Btn";
// import { Input } from "./components/Input/Input";

export const Input = (props) => {
  return <input type={props.type} min={props.min} max={props.max}></input>;
};

export const Btn = (props) => {
  const [amount, setAmount] = useState("0");

  const clickHandler = () => {
    setAmount();
  };

  return (
    <>
      <button onClick={clickHandler}>{props.title}</button>
      <p>amount: {amount}</p>
    </>
  );
};

function App() {
  const fetchPosts = async () => {
    const [posts, setPosts] = useState([]);
    const [postsAmount, setPostsAmount] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const changeAmount = () => {
    	setPostsAmount(Input.target.value)
    }

	 const fetchPosts = async () => {
		try {
		  const { data } = await axios.get(`https://studapi.teachmeskills.by/blog/posts/?limit=${postsAmount}`);
  
		  setPosts(data.results);
		} catch (error) {
		  console.log(error);
		} finally {
		  setIsLoading(false);
		}

		useEffect(() => {
			fetchPosts();
		 }, []);
	  
		 return (
			<>
			  <Btn title="Get posts"></Btn>
			  <Input
				 type="number"
				 min="1"
				 max="100"
				//  onChange={() => setPostsAmount(Input.target.value)}
				onChange={changeAmount}
			  ></Input>
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

  };

  }
}

export default App;
