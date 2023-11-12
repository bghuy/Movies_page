import data from './db/data.js'
import db_utility from './js/db_utility.js';
import Header from './components/Header.js'
import NavBar from './components/NavBar.js'
import Main from './components/Main.js'
import { computed } from 'vue';
export default {
    template: `
      <div id="wrapper" :style="changeMode">
          <Header @isNight="toggleDarkMode"/>
          <NavBar :is-night="this.isNight"/>
          <Main :is-night="this.isNight"/>
          <footer :style="colorStyle" style="padding:10px">21127615</footer>
      </div>
    `,
    data() {
        return {
            isNight: false,
        };
    },
    methods: {
        toggleDarkMode() {
            this.isNight = !this.isNight;
        },
    },
    computed: {
        changeMode() {
            return {
                backgroundColor: this.isNight ? '#1C1E1F' : 'white',
            };
        },
        colorStyle() {
            return {
                color: this.isNight ? 'white' : 'black',
            };
        },

    },
    components: {
        Header,
        NavBar,
        Main,
    },


};
