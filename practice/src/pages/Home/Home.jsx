import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>리액트 스터디 실습</h1>
      <Link to="publdaze">
        <h3>publdaze</h3>
      </Link>
    </div>
  );
};

export default Home;
