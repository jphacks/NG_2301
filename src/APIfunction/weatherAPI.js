/*
WeatherAPIをたたいてログ出力する関数
*/
async function fetchWeatherData() {
  // 天気予報データの定義
  const location = "Nagoya";
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
  console.log(weatherData);
}

export { fetchWeatherData };
