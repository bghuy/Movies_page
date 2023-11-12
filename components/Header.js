export default {
    template: `
        <header class="d-flex justify-content-space-between align-items-center" style="width:100%;height:fit-content;padding:10px">
            <span :style="colorStyle">21127615</span>
            <h2 :style="colorStyle">Movies info</h2>
            <div id="changeMode" class="d-flex justify-content-space-between align-items-center">
                <label class="switch d-flex justify-content-space-between align-items-center" style="margin-right:5px"  >
                    <input type="checkbox" :value="isNight" v-on:change="changeMode">
                    <span class="slider round"></span>
                </label>
                <i v-if="!isNight" class="fa-regular fa-sun" style="font-size:20px"></i>
                <i v-if="isNight" class="fa-solid fa-moon" style="font-size:20px" :style="colorStyle"></i>
            </div>
        </header>
    `,
    data() {
        return {
            isNight: false,
        }
    },
    methods: {
        changeMode() {
            this.isNight = !this.isNight;
            this.$emit('isNight', this.isNight)
        }
    },
    computed: {
        colorStyle() {
            return {
                color: this.isNight ? 'white' : 'black',
            };
        },
    },


}