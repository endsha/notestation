import styles from "./styles/button.module.scss";

interface ButtonProps {
  children?: React.Component | string;
  style?: object;
  className?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, style, className, onClick } = props;
  return (
    <button
      style={style}
      className={`${styles.buttonDefault} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
