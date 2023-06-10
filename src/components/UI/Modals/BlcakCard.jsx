import styles from "../../../styles/UI/Modals/Blackcard.module.scss";

const BlackCard = (props) => {
  return (
    <div className={`${props.className} ${styles.card}`}>{props.children}</div>
  );
};

export default BlackCard;
