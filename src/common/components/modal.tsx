import styles from "./styles/modal.module.scss";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[] | String;
}

const Modal = (props: ModalProps) => {
  const { visible, onClose, children } = props;
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
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
