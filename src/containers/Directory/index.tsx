import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Modal, Input, Button } from "@components";
import { RootStoreType } from "#types/stores";
import firebase from "@utils/firebase";
import styles from "@styles/Directory.module.scss";

interface DirectoryProps {}

const userSelector = (state: RootStoreType) => state.user;

const directoryLifecycle = (props: DirectoryProps) => {
  const [userDirectories, setUserDirectories] = useState<any[]>([]);
  const [newNoteName, setNewNoteName] = useState("");
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);

  const router = useRouter();
  const user = useSelector(userSelector);

  const createNote = () => {
    if (!newNoteName) {
      alert("Empty note name");
      return;
    }
    const directoryRef = firebase.database().ref("Notestation/endsha");
    directoryRef.push({ name: newNoteName, value: "" });
    setShowNewNoteModal(false);
  };

  useEffect(() => {
    const directoryRef = firebase.database().ref("Notestation/endsha");
    if (user.isAuthenticated) {
      directoryRef.on("child_added", (snapshot) => {
        const dir = snapshot.val();
        setUserDirectories((userDirectories) => [
          ...userDirectories,
          { key: snapshot.key, ...dir },
        ]);
      });
    }
    return () => {
      if (user.isAuthenticated) {
        directoryRef.off();
      }
    };
  }, [user]);

  return {
    userDirectories,
    showNewNoteModal,
    newNoteName,
    createNote,
    setNewNoteName,
    setShowNewNoteModal,
  };
};

const Directory = (props: DirectoryProps) => {
  const {
    newNoteName,
    userDirectories,
    showNewNoteModal,
    createNote,
    setShowNewNoteModal,
    setNewNoteName,
  } = directoryLifecycle(props);
  return (
    <div className={styles.directoryContainer}>
      {userDirectories.length > 0 &&
        userDirectories.map((directory, index) => {
          return (
            <span key={index} className={styles.noteCard}>
              <a className={styles.noteName}>{directory.name}</a>
            </span>
          );
        })}
      <a className={styles.newNote} onClick={() => setShowNewNoteModal(true)}>
        + New Note
      </a>
      <Modal
        visible={showNewNoteModal}
        onClose={() => setShowNewNoteModal(false)}
      >
        <div className={styles.createNewNoteModal}>
          CREATE NEW NOTE
          <Input
            placeholder="Note Name"
            value={newNoteName}
            onChange={(event) => setNewNoteName(event.target.value)}
            className={styles.noteNameInput}
          />
          <Button onClick={() => createNote()}>CREATE</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Directory;
