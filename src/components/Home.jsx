import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { getLocations } from "../firebase/database";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const auth = getAuth(app);

  const handleLogout = () => {
    auth.signOut();
    navigate("/signin");
  };
  const handleRegister = () => {
    navigate("/register_location");
  };

  useEffect(() => {
    const async = async () => {
      const dbLocations = await getLocations(user.uid);
      setLocations(dbLocations);
      console.log(dbLocations);
    };

    async();
  }, []);

  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <p>ユーザーそれぞれでurl変えないといけない</p>
        <p>登録視点</p>
        {locations.map((location) => (
          <p key={location.id}>{location.location}</p>
        ))}
        <button onClick={handleRegister}>地点登録</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export { Home };
