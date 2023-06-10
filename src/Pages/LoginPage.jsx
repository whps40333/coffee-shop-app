import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
} from "react";
import BlackCard from "../components/UI/Modals/BlcakCard";
import WhiteButton from "../components/UI/Buttons/WhiteButton";
import Input from "../components/UI/Inputs/Input";
import styles from "../styles/pages/Login.module.scss";
import coffeeLogo from "../images/coffeeLogo.png";
import AuthContext from "../store/auth-context";
import CoffeeShop from "../vedio/CoffeeShop.mp4";

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

function LoginPage(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

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

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      console.log(emailState.value, passwordState.value);
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
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
              placeholder="email"
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
              placeholder="密碼"
            />
            {passwordIsValid === false && <p>密碼長度要超過6個字</p>}
            <div className={styles.actions}>
              <WhiteButton type="submit" className={styles.btn}>
                登入
              </WhiteButton>
            </div>
            <a href="register">前往註冊</a>
          </form>
        </BlackCard>
        <video className={styles.vedio} autoPlay loop muted>
          <source src={CoffeeShop} type="video/mp4" />
        </video>
      </div>
    </>
  );
}

export default LoginPage;
