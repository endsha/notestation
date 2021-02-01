import styles from "./styles/input.module.scss";

interface InputProps {
  style?: object;
  className?: string;
  onChange?: (event: any) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
}

const Input = (props: InputProps) => {
  const {
    style,
    className,
    onChange,
    value,
    placeholder,
    disabled,
    type,
  } = props;

  return (
    <input
      style={style}
      className={`${styles.inputDefault} ${className}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
    />
  );
};

export default Input;