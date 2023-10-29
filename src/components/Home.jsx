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

      setPressures((prev) => ({ ...prev, [location.id]: pressure }));
    });
  }, [locations]);

  useEffect(() => {
    if (Object.keys(pressures).length > 0) {
      setPageVisible(true);
    }
  }, [pressures]);

  // tableの行を動的生成
  const rows = locations.map((location) => {
    const pressureNumData = pressures[location.id];
    if (pressureNumData == undefined) {
      return;
    }
    const num = pressureNumData[0];

    return (
      <tr key={location.id}>
        <td key={location.id}>{location.location}</td>
        <td key={location.id + 0}>{pressureNumData[0].pressure}</td>
        <td key={location.id + 1}>{pressureNumData[1].pressure}</td>
        <td key={location.id + 2}>{pressureNumData[2].pressure}</td>
        <td key={location.id + 3}>{pressureNumData[3].pressure}</td>
        <td key={location.id + 4}>{pressureNumData[4].pressure}</td>
        <td key={location.id + 5}>{pressureNumData[5].pressure}</td>
        <td key={location.id + 6}>{pressureNumData[6].pressure}</td>
        <td key={location.id + 7}>{pressureNumData[7].pressure}</td>
      </tr>
    );
  });

  // ユーザーがnullの場合はサインインページへリダイレクト
  if (!user) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <p>ユーザーそれぞれでurl変えないといけない</p>
        <p>登録地点</p>
        {locations.map((location) => (
          <p key={location.id}>{location.location}</p>
        ))}
        <table>
          <thead>
            <tr>
              <th>地点</th>
              {weatherDataTimes().map((date) => (
                <th key={date}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <button onClick={handleRegister}>地点登録</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export { Home };
