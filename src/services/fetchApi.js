const fetchApi = async (city) => {
  try {
    if (!city.trim()) throw { message: "No city provided" };
    const res = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${city}&days=3&aqi=no&alerts=no`
    );
    const data = await res.json();
    if (data.error) throw { message: data.error.message };
    return data;
  } catch (error) {
    throw { message: error.message };
  }
};

export default fetchApi;
