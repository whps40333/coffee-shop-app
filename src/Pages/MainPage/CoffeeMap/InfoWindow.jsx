import { InfoWindow } from "@react-google-maps/api";
import styles from "../../../styles/pages/MainPage/CoffeeMap/Infowindows.module.scss";
import Clrbutton from "../../../components/UI/Buttons/ClrButton";
import { useEffect, useState } from "react";

function InfoWindowComponent({ feature }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // 檢查是否已經收藏
    fetch(
      "https://coffee-shop-30b10-default-rtdb.firebaseio.com/favoriteItem.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const favoriteItems = Object.values(data);
          const isFavorite = favoriteItems.some(
            (item) => item.id === feature.id
          );
          setIsFavorite(isFavorite);
          setIsDisabled(isFavorite);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [feature.id]);

  const addTofavoriteHandler = () => {
    if (!isFavorite) {
      const favoriteItem = {
        id: feature.id,
        name: feature.name,
        time: feature.time,
        price: feature.price,
        score: feature.score,
      };

      fetch(
        "https://coffee-writing-default-rtdb.firebaseio.com/favoriteItem.json",
        {
          method: "POST",
          body: JSON.stringify(favoriteItem),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setIsFavorite(true);
          setIsDisabled(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("已经收藏過了！");
    }
  };

  return (
    <InfoWindow
      position={{
        lat: feature.lat,
        lng: feature.lng,
      }}
    >
      {/* 在这里添加您希望显示在信息窗口中的内容 */}
      <div className={styles.wrapper}>
        <h3>{feature.name}</h3>
        <p>{feature.site}</p>
        <div>{feature.time}</div>
        <div>{feature.score}</div>
        <Clrbutton
          className={isDisabled ? `${styles.disabled}` : null}
          disabled={isDisabled}
          onClick={addTofavoriteHandler}
        >
          {isFavorite ? "已收藏" : "收藏"}
        </Clrbutton>
      </div>
    </InfoWindow>
  );
}

export default InfoWindowComponent;
