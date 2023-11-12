export default {
    template: `
        <nav  class="d-flex justify-content-space-between align-items-center" style="width:100%;height:fit-content;padding:10px">
        <i class="fa-solid fa-house" style="font-size:30px;cursor:pointer" :style="navbarStyle"></i>

        <form >
            <input type="text" placeholder="Search" style="margin-right:5px" v-model="searchValue" @keydown.enter="handleEnterKey" />
            <button @click="handleSearch">Search</button>
        </form>
        </nav>

    `,
    data() {
        return {
            searchValue: ''
        }
    },
    methods: {
        handleEnterKey() {

        }
    },
    props: {
        isNight: Boolean,
    },
    computed: {
        navbarStyle() {
            return {
                color: this.isNight ? 'white' : 'black',
            };
        },
    },
}