const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin requests
 app.use(cors(
    {
    origin: ["http://localhost:3000", "https://servix-app.netlify.app"], // Replace with your frontend's URL
    methods: ['GET'], // Allowed HTTP methods
  }
 ));

// Define routes to call the 4 APIs with countryCode parameter
app.get('/detectCountry', async (req, res) => {
  try {
    // const { countryCode } = req.params;
    const response = await axios.get("http://ip-api.com/json");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API 1' });
  }
});

app.get('/country/:countryName', async (req, res) => {
      const { countryName }  = req.params;
  try {
    const response = await axios.get(`http://api.geonames.org/searchJSON?q=${countryName}&maxRows=1&username=simiremichael`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API 2' });
  }
});

app.get('/state/:countryGeonameId', async (req, res) => {
      const { countryGeonameId } = req.params;

  try {
    const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${Number(countryGeonameId)}&username=simiremichael`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API 3' });
  }
});

app.get('/region/:selectedStateId', async (req, res) => {
      const { selectedStateId } = req.params;
  try {
    const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${Number(selectedStateId)}&username=simiremichael`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API 4' });
  }
});

app.get('/area/:selectedRegionCode', async (req, res) => {
        const { selectedRegionCode } = req.params;
  try {
    const response = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${Number(selectedRegionCode)}&username=simiremichael`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API 4' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});