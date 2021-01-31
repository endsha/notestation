import React, { useState } from "react";
import styles from "./Login.module.scss";

import { Input, Button } from "@components";

const loginLifecycle = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log("Login: ", username, password);
    props.history.push("/");
  };

  return {
    username,
    password,
    login,
    setUsername,
    setPassword,
  };
};

const Login = (props) => {
  const {
    username,
    password,
    login,
    setUsername,
    setPassword,
  } = loginLifecycle(props);

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <Input
          placeholder="Username"
          value={username}
          className={styles.input}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          className={styles.input}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={() => login()}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
