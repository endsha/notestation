import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootStoreType } from "#types/stores";
import { writeNote } from "@redux/note/noteSlice";
import styles from "@styles/Editor.module.scss";
import showdown from "showdown";

const userSelector = (state: RootStoreType) => state.user;

const editorLifeCycle = (props: any) => {
  const [rawValue, setRawValue] = useState("");
  const [compiledValue, setCompiledValue] = useState("");
  const converter = new showdown.Converter({ simpleLineBreaks: true });

  const dispatch = useDispatch();

  const storeNote = () => {
    dispatch(writeNote(rawValue));
  };

  useEffect(() => {
    const html = converter.makeHtml(rawValue);
    setCompiledValue(html);
  }, [rawValue]);

  return {
    compiledValue,
    setRawValue,
    storeNote,
  };
};

const Editor = (props: any) => {
  const { compiledValue, setRawValue, storeNote } = editorLifeCycle(props);
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

export default Editor;
