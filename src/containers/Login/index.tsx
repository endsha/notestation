import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@components";
import { login, loginWithGoogle } from "@redux/user/userSlice";
import { RootStoreType } from "#types/stores";
import firebase from "@utils/firebase";
import styles from "@styles/Login.module.scss";

const userSelector = (state: RootStoreType) => state.user;

const loginLifecycle = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(userSelector);

  console.log("USER: ", user);

  useEffect(() => {
    if (user.isAuthenticated) {
      router.replace("/");
    }
  }, []);

  const loginAccount = (event: any) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      dispatch(login(true));
      router.push("/");
    } else {
      alert("Wrong username or password!");
    }
  };

  const loginGoogle = (event: any) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(loginWithGoogle(result));
        router.push("/");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        alert(
          `ERROR WHEN LOGIN WITH GOOGLE: ${errorMessage}, CODE: ${errorCode}`
        );
      });
  };

  return {
    setUsername,
    setPassword,
    loginAccount,
    loginGoogle,
  };
};

const Login = (props: any) => {
  const {
    loginAccount,
    setUsername,
    setPassword,
    loginGoogle,
  } = loginLifecycle(props);
  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <label className={styles.loginLabel}>Welcome to</label>
          <h1 className={styles.appName}>{"<"}NoteStation/_</h1>
        </div>
        <Input
          type="text"
          placeholder="Username"
          className={styles.loginInput}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          className={styles.loginButton}
          onClick={(event) => {
            loginAccount(event);
          }}
        >
          LOGIN
        </Button>
        <Button
          className={styles.loginButton}
          onClick={(event) => {
            loginGoogle(event);
          }}
        >
          LOGIN WITH GOOGLE
        </Button>
      </div>
      <div className={styles.background}>
        <div className={styles.polygonMiddleLeft} />
        <div className={styles.lineGreen} />
        <div className={styles.polygonLowLeft} />
        <div className={styles.lineWhite} />
      </div>
    </div>
  );
};

export default Login;
