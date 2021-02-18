import { Button } from "@components";
import styles from "./styles/modalAlert.module.scss";

interface ModalAlertProps {
  visible: boolean;
  headerTitle: String;
  contentText: String;
  confirmBtnText: String;
  cancelBtnText: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ModalAlert = (props: ModalAlertProps) => {
  const {
    visible,
    headerTitle,
    contentText,
    confirmBtnText,
    cancelBtnText,
    onClose,
    onConfirm,
    onCancel,
  } = props;
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.overlay}
        onClick={(event) => {
          event.preventDefault();
          onClose();
        }}
      />
      <div className={styles.modal}>
        <h2>{headerTitle}</h2>
        <p>{contentText}</p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              onConfirm();
            }}
          >
            {confirmBtnText}
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (!onCancel) {
                onClose();
              } else {
                onCancel();
              }
            }}
          >
            {cancelBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
