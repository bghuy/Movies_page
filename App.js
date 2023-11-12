import data from './db/data.js'
import db_utility from './js/db_utility.js';
import Header from './components/Header.js'
import NavBar from './components/NavBar.js'
import Main from './components/Main.js'
import { computed } from 'vue';
export default {
    template: `
    <div id="wrapper">
        <Header/>
        <NavBar/>
        <Main/>
        <footer>21127615</footer>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    }
    ,
    components: {
        Header, NavBar, Main
    },




}