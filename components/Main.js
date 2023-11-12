
import Home from "./Main_components/home_component.js"
import Search from "./Main_components/search_component.js"
export default {

    template: `
        <Home v-if="mainName === 'home'"/> 
        <Search v-if="mainName === 'search'"/>
    `,
    data() {
        return {
            mainName: "home"
        }
    },
    methods: {

    }
    ,
    mounted() {

    },
    components: {
        Home, Search
    },
}