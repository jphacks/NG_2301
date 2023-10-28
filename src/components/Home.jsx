import { app } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import { getLocations } from "../firebase/database";
import {
  DateTime,
  Pressure,
  Location,
} from "../pressureData/test_pressureData";
import { fetchWeatherData, weatherDataTimes } from "../APIfunction/weatherAPI";

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
    let isSubscribe = false;
    const async = async () => {
      const dbLocations = await getLocations(user.uid);
      const data = [];

      let n = 1;
      dbLocations.forEach(async (location) => {
        data.push({
          id: location.id,
          location: location.location,

        });
        
        fetchWeatherData(location.location).then((pressure) => {
          const temp = [];
          temp.push({
            id: location.id,
            location: location.location,
            pressures: pressure
          });
          setLocations(temp);
        });
      });

      //setLocations(data);
    };

    async().then(() => {
      return () => {
        isSubscribe = true;
      };
    });
  }, []);

  const tableRow = [];
  locations.map((location) => {
    tableRow.push(<td>a</td>);
   
    const a = async () => {
      tableRow.push(<td>b</td>);
      clearTimeout(await setTimeout(1000000));
      tableRow.push(<td>c</td>);
      const pressure = await fetchWeatherData(location.location);
      tableRow.push(<td>d</td>);
    };
    fetchWeatherData(location.location).then(() => {
      tableRow.push(<td>f</td>);
    });
    a();
    tableRow.push(<td>e</td>);
  });

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
          <tbody>
            {locations.map((location) => (
              <tr>
                <td key={location}>{location.location}</td>
                <td key={location}>{location.pressures[0].pressure}</td>
                <td key={location}>{location.pressures[1].pressure}</td>
                <td key={location}>{location.pressures[2].pressure}</td>
                <td key={location}>{location.pressures[3].pressure}</td>
                <td key={location}>{location.pressures[4].pressure}</td>
                <td key={location}>{location.pressures[5].pressure}</td>
                <td key={location}>{location.pressures[6].pressure}</td>
                <td key={location}>{location.pressures[7].pressure}</td>
                <td key={location}>{location.pressures[8].pressure}</td>
                <td key={location}>{location.pressures[9].pressure}</td>
                <td key={location}>{location.pressures[10].pressure}</td>
                <td key={location}>{location.pressures[11].pressure}</td>
                <td key={location}>{location.pressures[12].pressure}</td>
                <td key={location}>{location.pressures[13].pressure}</td>
                <td key={location}>{location.pressures[14].pressure}</td>
                <td key={location}>{location.pressures[15].pressure}</td>
                <td key={location}>{location.pressures[16].pressure}</td>
                <td key={location}>{location.pressures[17].pressure}</td>
                <td key={location}>{location.pressures[18].pressure}</td>
                <td key={location}>{location.pressures[19].pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleRegister}>地点登録</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export { Home };
