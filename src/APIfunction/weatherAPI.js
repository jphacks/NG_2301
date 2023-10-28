/*
WeatherAPIをたたいてログ出力する関数
*/

const API_KEY = import.meta.env.API_KEY;


async function fetchWeatherData() {

    // 天気予報データの定義
    const location = 'Nagoya';
    //const API_KEY = PropertiesService.getScriptProperties().getProperty("API_KEY");

    // 天気予報データのURL
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;

    // URLを使ってAPIからデータを取得
    const response = await fetch(url);
    console.log(response); 
    const jsondata = response.getContentText();
    
    // JSONデータをパース
    const data = JSON.parse(jsondata);

    Logger.log(jsondata);

    // タイムスタンプを変換
    for (let i = 0; i < data.list.length; i++) {
        const jst = new Date(data.list[i].dt * 1000).toLocaleString("ja-JP", {timeZone: "Asia/Tokyo"});
        const pressure = data.list[i].main.pressure;
        console.log(jst,pressure);
    }
}

export {fetchWeatherData}