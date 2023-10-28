import { useState } from "react";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin.css";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(`/${auth.currentUser.uid}`);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = () => {
    onSignIn();
    reset();
  };

  return (
    <div>
      <div className="title">
        <h1>Atmospheric</h1>
        <h1>Pressure</h1>
        <h1>Forecast</h1>
      </div>
      <div className="login">ログイン</div>
      <div className="line"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>メールアドレス</label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "メールアドレスを入力してください。",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスの形式で入力してください。",
              },
            })}
            name="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>パスワード</label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください。",
              },
            })}
            className="form-text2"
            type="password"
            name="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="register">
          登録した場所の気圧の予測データを閲覧できます<br></br>
          ユーザ登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export { SignIn };
