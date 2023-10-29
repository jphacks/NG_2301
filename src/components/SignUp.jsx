import { useState } from "react";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
        <div className="line"></div>
        <div className="text">ユーザー登録</div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="form-text1"
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
          {errors.email && (
            <span className="error1">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            className="form-text2"
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください。",
              },
            })}
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
          {errors.password && (
            <span className="error2">{errors.password.message}</span>
          )}
        </div>
        <div>
          <button className="buttun" type="submit">
            登録
          </button>
        </div>
        <div className="change">
          <p>
            ユーザ登録済の場合は<Link to={"/signin"}>こちら</Link>から
          </p>
        </div>
      </form>
    </div>
  );
};

export { SignUp };
