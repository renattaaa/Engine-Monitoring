import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#356859',
        secondary: '#EFEFEF',
        accent: '#82B1FF',
        error: '#ffffff',
        info: '#c0c0c0',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
