import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    let loginMsg;
    try {
      loginMsg = await axios.post("http://localhost:8000/api/login", user, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error.response);
    }
    if (loginMsg.data.message === "successfully logged in") {
      navigate("/main");
    } else {
      setError(loginMsg.data.message);
    }
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="form-control w-25"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          className="form-control w-25"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default LoginForm;
