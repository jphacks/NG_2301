import { useState } from "react";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin.scss";
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
        <p>Atmospheric</p>
        <p>Pressure</p>
        <p>Forecast</p>
      </div>
      <div className="login-title">
        <div className="line"></div>
        <div className="login">ログイン画面</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-form">
        <div>
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
            placeholder="メールアドレス"
            onChange={(event) => handleChangeEmail(event)}
          />
          {errors.email && (
            <span>
              <br />
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください。",
              },
            })}
            type="password"
            name="password"
            placeholder="パスワード"
            onChange={(event) => handleChangePassword(event)}
          />
          {errors.password && (
            <span>
              <br />
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div className="register">
        <p>登録した場所の気圧の予測データを閲覧できます</p>
        <p>
          ユーザ登録は<Link to={"/signup"}>こちら</Link>から
        </p>
      </div>
    </div>
  );
};

export { SignIn };
