/**
 * WeatherAPIをたたいてログ出力する関数
 * @param location
 */

async function fetchWeatherData(location) {
  // 天気予報データの定義
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  // 天気予報データのURL
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;

  let weatherData = [];

  // URLを使ってAPIからデータを取得
  await fetch(url, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        if (i % 2 === 0) {
          const jst = new Date(data.list[i].dt * 1000).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          });
          const pressure = data.list[i].main.pressure;
          weatherData.push({ jst, pressure });
        }
      }
    });
  return weatherData;
}

const TIME_INTERVAL = 6;

function weatherDataTimes() {
  const setTimeHours = [0, 6, 12, 18];
  let nowHour = new Date().getHours();
  const quo = Math.floor(nowHour / TIME_INTERVAL);
  const times = [];
  let hour;
  {
    quo === 3 ? (hour = setTimeHours[0]) : (hour = setTimeHours[quo + 1]);
  }

  for (let i = 0; i < 8; i++) {
    const time = new Date();
    time.setHours(hour + i * TIME_INTERVAL);
    time.setMinutes(0);
    time.setSeconds(0);

    times.push(time.getDate() + "日" + time.getHours() + "時");
  }
  return times;
}

export { fetchWeatherData, weatherDataTimes };
