import styles from "../../../styles/pages/UserPage/Favorites/FavoriteItem.module.scss";

const FavoriteItem = (props) => {
  const removeFavoriteHandler = () => {
    const favoriteItemId = props.id;
    console.log(favoriteItemId);

    fetch(
      `https://coffee-shop-30b10-default-rtdb.firebaseio.com/favoriteItem/${favoriteItemId}.json`,
      {
        method: "delete",
      }
    )
      .then((response) => {
        console.log("Deleted successfully");
        props.onRemove(favoriteItemId);
      })
      .catch((response) => console.error(response));
  };

  return (
    <div className={styles.favoriteItem}>
      <h3>{props.name}</h3>
      <div className={styles.description}>{props.time}</div>
      <div className={styles.price}>{props.price}</div>
      <div className={styles.score}>{props.score}</div>
      <button className={styles.button} onClick={removeFavoriteHandler}>
        移除
      </button>
    </div>
  );
};

export default FavoriteItem;
