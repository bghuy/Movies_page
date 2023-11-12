
import Home from "./Main_components/home_component.js"
export default {

    template: `
        <Home v-if="this.mainComponentName === 'home'" :is-night="this.isNight"/> 
    `,
    data() {
        return {
            mainName: this.mainComponentName,
            searchValue: this.mSearchValue
        }
    },
    methods: {

    }
    ,
    mounted() {

    },
    components: {
        Home
    },
    props: {
        isNight: Boolean, mainComponentName: String, mSearchValue: String
    },
    created() {

    }
}