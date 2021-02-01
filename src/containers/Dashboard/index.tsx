import { useState } from "react";
import styles from "@styles/Dashboard.module.scss";

const Dashboard = () => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.container}>
      <textarea
        className={styles.editorDefault}
        onChange={(event) => {
          console.log(event.target.value);
          setValue(event.target.value);
        }}
      />
      <div className={styles.markdownDefault}>{value}</div>
    </div>
  );
};

export default Dashboard;
