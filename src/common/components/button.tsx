import styles from "./styles/button.module.scss";

interface ButtonProps {
  children?: JSX.Element | JSX.Element[] | String;
  style?: object;
  className?: string;
  onClick?: (event: any) => void;
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
