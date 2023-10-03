const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;
const fetchApi = async (city) => {
  try {
    if (!city.trim()) throw { message: "No city provided" };
    const res = await fetch(`${API_WEATHER}${city}`);
    const data = await res.json();
    if (data.error) throw { message: data.error.message };
    return data;
  } catch (error) {
    throw { message: error.message };
  }
};

export default fetchApi;
