import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { RootStoreType } from "#types/stores";
import { writeNote } from "@redux/note/noteSlice";
import { useInterval } from "@hooks";
import firebase from "@utils/firebase";
import styles from "@styles/Editor.module.scss";
import showdown from "showdown";

const userSelector = (state: RootStoreType) => state.user;

const editorLifeCycle = (props: any) => {
  const [rawValue, setRawValue] = useState("");
  const [compiledValue, setCompiledValue] = useState("");
  const converter = new showdown.Converter({ simpleLineBreaks: true });

  const dispatch = useDispatch();
  const router = useRouter();

  const storeNote = () => {
    // dispatch(writeNote(rawValue));
  };

  useInterval(() => {
    compareNote();
  }, 3000);

  const compareNote = () => {
    const directoryRef = firebase
      .database()
      .ref(`Notestation/endsha/${router.query.note}`);
    directoryRef.once("value", (snapshot) => {
      const data = snapshot.val();
      if (data && data.value !== rawValue) {
        directoryRef.set({ ...data, value: rawValue });
      }
    });
  };

  useEffect(() => {
    if (!router.query || !router.query.note) {
      router.replace("/");
    }
    const directoryRef = firebase
      .database()
      .ref(`Notestation/endsha/${router.query.note}`);
    directoryRef.once("value", (snapshot) => {
      const data = snapshot.val();
      console.log("DATA: ", data);
      if (data) {
        setRawValue(data.value);
      }
    });
  }, []);

  useEffect(() => {
    const html = converter.makeHtml(rawValue);
    setCompiledValue(html);
  }, [rawValue]);

  return {
    rawValue,
    compiledValue,
    setRawValue,
    storeNote,
  };
};

const Editor = (props: any) => {
  const { rawValue, compiledValue, setRawValue, storeNote } = editorLifeCycle(
    props
  );
  return (
    <div className={styles.container}>
      <textarea
        className={styles.editorDefault}
        value={rawValue}
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
