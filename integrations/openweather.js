const getCurrentWeather = async () => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=43.4254&lon=-80.5112&exclude=minutely,daily,hourly&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  const response = await fetch(url)

  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    console.log(response)
    throw Error(`Openweather error code: ${response.status}`)
  }
}


export { getCurrentWeather };