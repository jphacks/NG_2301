import { useState } from "react";
import { app } from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/test.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <div>
      <div className="title">
        Atmospheric<br></br>     
        Pressure<br></br>
        Forecast<br></br>
      </div>

      <div className="login">ログイン</div>
      <div className="line"></div>
      
      
      <form onSubmit={handleSubmit}>
        <div>
          <input className="form-text1"
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
        </div>
        <div>
          <input className="form-text2"
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
        </div>
        <div>
          <button className="buttun">ログイン</button>
        </div>
        {error && <p style={{color: "red" }}>{error}</p>}
        <div className="register">
        登録した場所の気圧の予測データを閲覧できます<br></br>
        ユーザ登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export { SignIn };
