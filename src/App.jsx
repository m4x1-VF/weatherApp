import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import fetchApi from "./services/fetchApi";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: 0,
    condition: "",
    conditionText: "",
    icon: "",
  });
  const [forecast, setForecast] = useState([
    {
      date: "",
      maxTemperature: 0,
      minTemperature: 0,
      conditionText: "",
      conditionIcon: "",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchApi(city);
    setCity("");
    setWeather({
      city: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.code,
      conditionText: data.current.condition.text,
      icon: data.current.condition.icon,
    });
    setForecast([
      {
        date: data.forecast.forecastday[0].date,
        maxTemperature: data.forecast.forecastday[0].day.maxtemp_c,
        minTemperature: data.forecast.forecastday[0].day.mintemp_c,
        conditionText: data.forecast.forecastday[0].day.condition.text,
        conditionIcon: data.forecast.forecastday[0].day.condition.icon,
      },
      {
        date: data.forecast.forecastday[1].date,
        maxTemperature: data.forecast.forecastday[1].day.maxtemp_c,
        minTemperature: data.forecast.forecastday[1].day.mintemp_c,
        conditionText: data.forecast.forecastday[1].day.condition.text,
        conditionIcon: data.forecast.forecastday[1].day.condition.icon,
      },
      {
        date: data.forecast.forecastday[2].date,
        maxTemperature: data.forecast.forecastday[2].day.maxtemp_c,
        minTemperature: data.forecast.forecastday[2].day.mintemp_c,
        conditionText: data.forecast.forecastday[2].day.condition.text,
        conditionIcon: data.forecast.forecastday[2].day.condition.icon,
      },
    ]);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        WeatherApp
      </Typography>
      <form onSubmit={handleSubmit}>
        <Input
          sx={{ m: 1 }}
          id="city"
          variant="outlined"
          placeholder="London"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          endDecorator={
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          }
        />
      </form>
      <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
        Powered by: {""}
        <a href="https://www.weatherapi.com" title="Weather API">
          WeatherAPI.com
        </a>
      </Typography>
      {weather.city && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h2">
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            src={weather.icon}
            alt="weather.conditionText"
            sx={{ margin: "0 auto" }}
          />
          <Typography variant="h5" component="h3">
            {weather.temperature}°C
          </Typography>
          <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
            {weather.conditionText}
          </Typography>
          <Divider />
        </Box>
      )}

      {forecast.length > 1 &&
        forecast?.map((forecast) => (
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: 2,
              textAlign: "center",
            }}
            key={forecast.date}
          >
            <Typography variant="h5" component="h3">
              {forecast.date &&
                format(new Date(forecast.date), "EEEE, dd MMMM", {
                  locale: es,
                })}
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Brightness5Icon color="warning" /> MAX {forecast.maxTemperature}
              °C
              <CircleIcon color="primary" /> MIN {forecast.minTemperature}°C
            </Typography>
            <Box
              component="img"
              src={forecast.conditionIcon}
              alt="forecast.conditionText"
              sx={{ margin: "0 auto" }}
            />

            <Typography variant="h6" component="h4">
              {forecast.conditionText}
            </Typography>
            <Divider />
          </Box>
        ))}
    </Container>
  );
};

export default App;
