import { useState } from "react";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/Signup.scss";

const SignUp = () => {
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

  const onSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
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
    onSignUp();
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
        <div className="login">新規登録</div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
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
            name="password"
            type="password"
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
          <button className="submit" type="submit">
            登録
          </button>
        </div>
      </form>
      <div className="register">
        <p>
          ユーザ登録済の場合は<Link to={"/signin"}>こちら</Link>から
        </p>
      </div>
    </div>
  );
};

export { SignUp };
