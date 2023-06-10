import styles from "../../../styles/UI/Buttons/WhiteButton.module.scss";

const WhiteButton = (props) => {
  return (
    <button
      className={styles.button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default WhiteButton;
