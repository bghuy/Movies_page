import data from './db/data.js'
import db_utility from './js/db_utility.js';
import Header from './components/Header.js'
import NavBar from './components/NavBar.js'
import Main from './components/Main.js'
import Search from './components/search_component.js'
import { computed } from 'vue';
export default {
    template: `
      <div id="wrapper" :style="changeMode">
          <Header @isNight="toggleDarkMode"/>
          <NavBar :is-night="this.isNight" @searchValue="setSearchValue" @requireSearch="setName"/>
          <Main v-if="this.mainName==='home'"  :is-night="this.isNight" :mainComponentName="mainName" :mSearchValue="mainSearchValue"/>
        <Search v-if="this.mainName==='search'"  :searchValue="this.mainSearchValue"/>
          <footer :style="colorStyle" style="padding:10px">21127615</footer>
      </div>
    `,
    data() {
        return {
            isNight: false,
            mainName: "home",
            mainSearchValue: ""
        };
    },
    methods: {
        toggleDarkMode() {
            this.isNight = !this.isNight;
        },
        setSearchValue(s) {
            this.mainSearchValue = s;
        },
        setName(s) {
            this.mainName = s
            console.log(this.mainName)
        }
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
        Search
    },


};
