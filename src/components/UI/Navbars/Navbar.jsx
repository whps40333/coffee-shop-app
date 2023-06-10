import TextButton from "../Buttons/TextButton";
import styles from "../../../styles/UI/Navbars/Navbar.module.scss";

const NavBar = (props) => {
  const handleButtonClick = (sectionName) => {
    props.onSectionToggle(sectionName);
  };

  return (
    <div className={styles.wrapper}>
      <TextButton
        className={styles.button}
        onClick={() => handleButtonClick("writing")}
      >
        撰寫評論
      </TextButton>
      <TextButton
        className={styles.button}
        onClick={() => handleButtonClick("comment")}
      >
        查看評論
      </TextButton>
      <TextButton
        className={styles.button}
        onClick={() => handleButtonClick("favorite")}
      >
        查看收藏
      </TextButton>
    </div>
  );
};

export default NavBar;
