import { useState, useEffect } from "react"
import Image from 'next/image'

function WeatherWidget() {
  const [current, setCurrent] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchCurrentWeather()
  }, [])

  const fetchCurrentWeather = () => {
    setLoading(true)
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => {
        setCurrent(data.current)
        setLoading(false)
      })
  }

  if (isLoading || !current) {
    return (
      <div id="weather-widget">
        <div className="border-black border-3 rounded-xl bg-white p-12 text-left">
          <Image src="/loading.svg" width={40} height={40} alt="loading" />
        </div>
      </div>
    )
  }

  console.log(current)
  const description = current.weather[0]
  const icon = description.icon
  const imageSrc = `http://openweathermap.org/img/wn/${icon}@4x.png`
  const temp = Math.round(current.temp)
  const feelsLike = Math.round(current.feels_like)

  return (
    <div id="weather-widget">
      <div className="flex items-end relative">
        <Image src="/clock-tower.png" height="280" width="140" alt="" className="translate-x-16 translate-y-10 -rotate-6" />
        <Image src={imageSrc} height="180" width="180" alt={description.description} className="absolute top-0 left-20 -translate-y-10 rotate-3" />
        <div className="border-black border-3 rounded-xl bg-white p-6 pl-12 text-left max-w-xs">
          <p className="text-xl font-medium">Going out?</p>
          <p>{`Current weather: ${description.description}`}</p>
          <p>{`It's ${temp}°С, feels like ${feelsLike}°С`}</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget