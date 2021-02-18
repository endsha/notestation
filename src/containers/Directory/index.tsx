import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Modal, Input, Button, ModalAlert } from "@components";
import { RootStoreType } from "#types/stores";
import firebase from "@utils/firebase";
import styles from "@styles/Directory.module.scss";

interface DirectoryProps {}

interface NoteObject {
  key: String;
  name: String;
  value?: String;
}

const userSelector = (state: RootStoreType) => state.user;

const directoryLifecycle = (props: DirectoryProps) => {
  const [userDirectories, setUserDirectories] = useState<any[]>([]);
  const [newNoteName, setNewNoteName] = useState("");
  const [selectedNote, setSelectedNote] = useState<NoteObject>();
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);

  const router = useRouter();
  const user = useSelector(userSelector);

  const getAlertContentText = () => {
    return `Are you sure to delete note "${selectedNote?.name}"?`;
  };

  const createNote = () => {
    if (!newNoteName) {
      alert("Empty note name");
      return;
    }
    const directoryRef = firebase.database().ref("Notestation/endsha");
    directoryRef.push({ name: newNoteName, value: "" });
    setShowNewNoteModal(false);
  };

  const deleteNote = () => {
    if (selectedNote) {
      const directoryRef = firebase
        .database()
        .ref(`Notestation/endsha/${selectedNote.key}`);
      directoryRef.set(null);
    }
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
    showModalAlert,
    userDirectories,
    showNewNoteModal,
    newNoteName,
    selectedNote,
    getAlertContentText,
    createNote,
    deleteNote,
    setNewNoteName,
    setShowNewNoteModal,
    setShowModalAlert,
    setSelectedNote,
  };
};

const Directory = (props: DirectoryProps) => {
  const {
    newNoteName,
    userDirectories,
    showNewNoteModal,
    showModalAlert,
    selectedNote,
    getAlertContentText,
    createNote,
    deleteNote,
    setShowNewNoteModal,
    setShowModalAlert,
    setNewNoteName,
    setSelectedNote,
  } = directoryLifecycle(props);
  return (
    <div className={styles.directoryContainer}>
      {userDirectories.length > 0 &&
        userDirectories.map((directory, index) => {
          return (
            <span key={index} className={styles.noteCard}>
              <Link
                href={{ pathname: "/editor", query: { note: directory.key } }}
              >
                <a className={styles.noteName}>{directory.name}</a>
              </Link>
              <span
                className={styles.noteDelete}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedNote({ name: directory.name, key: directory.key });
                  setShowModalAlert(true);
                }}
              >
                X
              </span>
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
      <ModalAlert
        visible={showModalAlert}
        onClose={() => setShowModalAlert(false)}
        headerTitle="NOTICE"
        contentText={getAlertContentText()}
        confirmBtnText="DELETE"
        cancelBtnText="CANCEL"
        onConfirm={() => {
          deleteNote();
        }}
      />
    </div>
  );
};

export default Directory;
