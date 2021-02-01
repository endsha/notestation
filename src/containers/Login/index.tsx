import { Input, Button } from "@components";
import styles from "@styles/Login.module.scss";

const Login = () => {
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
        />
        <Input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
        />
        <Button className={styles.loginButton}>LOGIN</Button>
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
