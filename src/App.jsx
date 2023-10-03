import { Box, Container, IconButton, Typography } from "@mui/material";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

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
          <Typography variant="h6" component="h4">
            {weather.conditionText}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default App;
