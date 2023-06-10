import styles from "../../../styles/UI/Buttons/TextButton.module.scss";

const TextButton = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default TextButton;
