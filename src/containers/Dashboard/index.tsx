import { useState, useEffect } from "react";
import styles from "@styles/Dashboard.module.scss";
import showdown from "showdown";

const dashboardLifeCycle = (props: any) => {
  const [rawValue, setRawValue] = useState("");
  const [compiledValue, setCompiledValue] = useState("");
  const converter = new showdown.Converter({ simpleLineBreaks: true });

  useEffect(() => {
    const html = converter.makeHtml(rawValue);
    setCompiledValue(html);
  }, [rawValue]);

  return {
    compiledValue,
    setRawValue,
  };
};

const Dashboard = (props: any) => {
  const { compiledValue, setRawValue } = dashboardLifeCycle(props);
  return (
    <div className={styles.container}>
      <textarea
        className={styles.editorDefault}
        onChange={(event) => {
          setRawValue(event.target.value);
        }}
      />
      <div
        className={styles.markdownDefault}
        dangerouslySetInnerHTML={{ __html: compiledValue }}
      />
    </div>
  );
};

export default Dashboard;
