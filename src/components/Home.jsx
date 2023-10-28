import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const auth = getAuth(app);

  const handleLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <p>ユーザーそれぞれでurl変えないといけない</p>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export { Home };
