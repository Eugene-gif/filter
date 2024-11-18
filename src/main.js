import '@/assets/main.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '@/App.vue';

// PrimeVue
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import Button from "primevue/button";
import KeyFilter from 'primevue/keyfilter';
import Card from "primevue/card";

const configPrimeVue = {
  theme: {
    preset: Lara,
    options: {
      prefix: 'l',
      darkModeSelector: '.dark-theme',
      cssLayer: false
    }
  }
}

createApp(App)
  .use(createPinia())
  .use(PrimeVue, configPrimeVue)
  .component('Button', Button)
  .component('Card', Card)
  .directive('keyfilter', KeyFilter)
  .mount('#app');
