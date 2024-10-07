import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.css';


loadFonts()

createApp(App)
  .use(vuetify)
  .mount('#app')
