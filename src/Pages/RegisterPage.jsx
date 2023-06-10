import React, { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BlackCard from "../components/UI/Modals/BlcakCard";
import WhiteButton from "../components/UI/Buttons/WhiteButton";
import Input from "../components/UI/Inputs/Input";
import styles from "../styles/pages/Login.module.scss";
import coffeeLogo from "../images/coffeeLogo.png";
import CoffeeShop from "../vedio/CoffeeShop.mp4";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

function RegisterPage() {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailState.value,
        passwordState.value
      );
      navigate("main");
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    console.log(emailState.value, passwordState.value);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.circle}>
          <img src={coffeeLogo} alt="coffee-logo" />
        </div>
        <BlackCard>
          <form className={styles.login} onSubmit={submitHandler}>
            <h2>咖啡收藏</h2>
            <Input
              ref={emailInputRef}
              id="email"
              label="E-Mail"
              type="email"
              isValid={emailIsValid}
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              placeholder="帳號(含有@的電子信箱)"
            />
            {emailIsValid === false && <p>電子郵件格式不正確</p>}
            <Input
              ref={passwordInputRef}
              id="password"
              label="Password"
              type="password"
              isValid={passwordIsValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              placeholder="密碼(由英數組成至少7個字)"
            />
            {passwordIsValid === false && <p>密碼長度要超過6個字</p>}
            <div className={styles.actions}>
              <WhiteButton type="submit" className={styles.btn}>
                註冊
              </WhiteButton>
            </div>
          </form>
        </BlackCard>
        <video className={styles.vedio} autoPlay loop muted>
          <source src={CoffeeShop} type="video/mp4" />
        </video>
      </div>
    </>
  );
}

export default RegisterPage;
