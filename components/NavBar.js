export default {
    template: `
        <nav  class="d-flex justify-content-space-between align-items-center" style="width:100%;height:fit-content;padding:10px">
        <i class="fa-solid fa-house" style="font-size:30px;cursor:pointer" :style="navbarStyle" @click="goHome"></i>

        <form >
            <input type="text" placeholder="Search" style="margin-right:5px" v-model="searchValue" @keydown.enter.prevent="handleEnterKey($event)" />
            <button @click.prevent="handleEnterKey($event)">Search</button>
        </form>
        </nav>

    `,
    data() {
        return {
            searchValue: '',
        }
    },
    methods: {
        handleEnterKey(e) {
            if (this.searchValue !== "") {
                this.$emit('searchValue', this.searchValue)
                this.$emit('requireSearch', 'search')
                console.log(this.searchValue)
            }
            else {
                this.$emit('requireSearch', 'home')
            }
        },
        goHome() {
            this.$emit('requireSearch', 'home')
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