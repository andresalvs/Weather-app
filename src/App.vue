<template>
  <v-app class="body">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="weather pa-4 elevation-2">
          
           
            <v-card-title>
              <i class="fa-solid fa-seedling"></i>
              
              
              <h1 class="text-center">Weather App</h1>
              <h6 class="text-center">Stay Ahead with Real-Time Updates!</h6>
            </v-card-title>

            <v-card-text>
              <v-text-field 
                v-model="city" 
                label="Enter city" 
                @keyup.enter="addCity" 
                append-icon="mdi-plus" 
                outlined 
              ></v-text-field>

              <v-btn color="cyan" @click="addCity" class="addcity mt-2">
                Add City
              </v-btn>

              <v-alert v-if="error" type="error">{{ error }}</v-alert>

              <v-row v-if="citiesWeather.length" class="mt-4">
                <v-col 
                  v-for="(weatherData, index) in citiesWeather" 
                  :key="index" 
                  cols="12" 
                  md="6"
                >
                  <v-card  class="ma-2 highlight-border">
                    <v-card-title class="text-h5">{{ weatherData.name }}</v-card-title>
                    <v-card-subtitle class="mb-2">
                      <span class="weather-description">
                        <v-icon>{{ getWeatherIcon(weatherData.weather[0].description) }}</v-icon>
                        {{ weatherData.weather[0].description }}
                      </span>
                    </v-card-subtitle>
                    <v-card-text>
                      <div class="weather-stats">
                        <div class="stat-item">
                          <v-icon class="animated-icon">mdi-thermometer</v-icon>
                          <p><strong>Temperature:</strong> {{ weatherData.main.temp }} °C</p>
                        </div>
                        <div class="stat-item">
                          <v-icon class="animated-icon">mdi-water-percent</v-icon>
                          <p><strong>Humidity:</strong> {{ weatherData.main.humidity }}%</p>
                        </div>
                        <div class="stat-item">
                          <v-icon class="animated-icon">mdi-gauge</v-icon>
                          <p><strong>Pressure:</strong> {{ weatherData.main.pressure }} hPa</p>
                        </div>
                        <div class="stat-item">
                          <v-icon class="animated-icon"><i class="fa-solid fa-wind"></i></v-icon>
                          <p><strong>Wind Speed:</strong> {{ weatherData.wind.speed }} m/s</p>
                        </div>
                        <div class="stat-item">
                          <v-icon class="animated-icon"><i class="fa-regular fa-sun"></i></v-icon>
                          <p><strong>Sunrise:</strong> {{ new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() }}</p>
                        </div>
                        <div class="stat-item">
                          <v-icon class="animated-icon"><i class="fa-solid fa-sun"></i></v-icon>
                          <p><strong>Sunset:</strong> {{ new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() }}</p>
                        </div>
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="red" @click="removeCity(index)">
                        Remove City
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

  <footer style="background-color: indigo; color: white; text-align: center; padding: 20px;">
    Developed by: <a href="https://www.instagram.com/andreeeofficial/" style="color: white; text-decoration: none;"> <b>Andre Salvador</b> </a>
    </footer>

</template>

<script>
export default {
  data() {
    return {
      city: '',
      citiesWeather: [],
      error: ''
    };
  },
  methods: {
    async addCity() {
      if (this.city.trim() === '') {
        this.error = 'Please enter a city name.';
        return;
      }

      try {
        const apiKey = '3c57a5de7c2c718a461e866226872a38'; // Replace with your OpenWeatherMap API key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        if (data.cod === 200) {
          this.citiesWeather.push(data);
          this.city = '';
          this.error = '';
        } else {
          this.error = 'City not found.';
        }
      } catch (error) {
        this.error = 'Unable to fetch weather data.';
      }
    },
    removeCity(index) {
      this.citiesWeather.splice(index, 1);
    },
    getWeatherIcon(description) {
      const icons = {
        'clear sky': 'mdi-sunny',
        'few clouds': 'mdi-weather-partlycloudy',
        'scattered clouds': 'mdi-weather-partlycloudy',
        'broken clouds': 'mdi-weather-cloudy',
        'shower rain': 'mdi-weather-pouring',
        'rain': 'mdi-weather-rainy',
        'thunderstorm': 'mdi-weather-lightning',
        'snow': 'mdi-snowflake',
        'mist': 'mdi-weather-fog',
      };

      return icons[description] || 'mdi-weather-cloudy'; // Default icon if not found
    }
  }
};
</script>

<style>

.highlight-border {
  border: 2px solid #14d6f9; /* Change this color to your desired highlight color */
  border-radius: 8px; /* Optional: Adjust for rounded corners */
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Add a smooth transition */
}

.highlight-border:hover {
  box-shadow: 0 4px 15px rgba(18, 227, 255, 0.6); /* Change this to match your highlight color */
  transform: scale(1.02); /* Slightly scale the card on hover */
}

.body {
  font-family: 'Roboto', sans-serif;
  background-image: url('./assets/background.jpg'); /* Replace with your image URL */
  background-size: cover; /* Ensures the image covers the entire area */
  background-position: center; /* Centers the image */
  padding: 20px;
}



.weather {
  background: linear-gradient(270deg, #ffa9b3, #ffffff);
  background-size: 400% 400%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
 /* animation: gradientAnimation 10s ease infinite;  Add animation */
}

.addcity {
   animation: gradientAnimation 10s ease infinite;  
   background: linear-gradient(270deg, #ffa9b3, #60c6eb);
  background-size: 400% 400%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.text-h5 {
  font-weight: bold;
}

.mt-4 {
  margin-top: 16px;
}

.weather-description {
  display: flex;
  align-items: center;
}

.weather-stats {
 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.stat-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
  flex-basis: 48%;
  background: rgba(0, 0, 0, 0.05);
  padding: 10px;
  border-radius: 4px;
}

.animated-icon {
  margin-right: 8px;
  animation: spin 1s linear infinite; /* Spinning animation */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
