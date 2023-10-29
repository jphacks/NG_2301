// Firebaseの読み込み
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

// React Routerの読み込み
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// ContextとHooksの読み込み
import { useAuthContext } from "../Context/AuthContext";
import { useState, useEffect } from "react";

// Firebaseデータベースの関数の読み込み
import { getLocations } from "../firebase/database";

// APIから気圧データを取得する関数の読み込み
import { fetchWeatherData, weatherDataTimes } from "../APIfunction/weatherAPI";

const Home = () => {
  // ナビゲーション関数
  const navigate = useNavigate();

  // Contextからuser情報を取得
  const { user } = useAuthContext();

  // Firebaseの認証情報を取得
  const auth = getAuth(app);

  // 状態変数
  const [locations, setLocations] = useState([]);
  const [pressures, setPressures] = useState({});
  const [pageVisible, setPageVisible] = useState(false);

  // ログアウト時のナビゲーション
  const handleLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  // 登録ページへのナビゲーション
  const handleRegister = () => {
    navigate("/register_location");
  };

  // locationsを取得してstateにセット
  useEffect(() => {
    const fetchData = async () => {
      const dbLocations = await getLocations(user.uid);
      setLocations(dbLocations);
    };
    fetchData();
  }, []);

  // locationsが更新されたタイミングでpressureを取得
  useEffect(() => {
    locations.forEach(async (location) => {
      const pressure = await fetchWeatherData(location.location);
      console.log(pressure);
      setPressures((prev) => ({ ...prev, [location.id]: pressure }));
    });
  }, [locations]);

  useEffect(() => {
    if (Object.keys(pressures).length > 0) {
      setPageVisible(true);

      console.log(pressures);
    }
  }, [pressures]);

  // tableの行を動的生成
  const rows = locations.map((location) => {
    console.log(pressures[location.id]?.pressure);
    return (
      <tr key={location.id}>
        <td>{location.location}</td>
        <td>{pressures[location.id]?.pressure}</td>
      </tr>
    );
  });

  // ユーザーがnullの場合はサインインページへリダイレクト
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      {pageVisible ? (
        <>
          <h1>ホームページ</h1>

          <p>登録地点</p>
          {locations.map((location) => (
            <p key={location.id}>{location.location}</p>
          ))}

          <table>
            <thead>
              <tr>
                <th>地点</th>
                {weatherDataTimes().map((time) => (
                  <th key={time}>{time}</th>
                ))}
              </tr>
            </thead>

            <tbody>{rows}</tbody>
          </table>

          <button onClick={handleRegister}>地点登録</button>
          <button onClick={handleLogout}>ログアウト</button>
        </>
      ) : (
        <p>データをロード中...</p>
      )}
    </div>
  );
};

export { Home };
