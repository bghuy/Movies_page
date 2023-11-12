export default {
    template: `
        <header class="d-flex justify-content-space-between align-items-center" style="width:100%;height:fit-content;padding:10px">
            <span>21127615</span>
            <h2>Movies info</h2>
            <div id="changeMode" class="d-flex justify-content-space-between align-items-center">
                <label class="switch d-flex justify-content-space-between align-items-center" style="margin-right:5px"  >
                    <input type="checkbox" :value="dayOrNight" @input="changeMode" >
                    <span class="slider round"></span>
                </label>
                <i v-if="dayOrNight" class="fa-regular fa-sun" style="font-size:20px"></i>
                <i v-if="!dayOrNight" class="fa-solid fa-moon" style="font-size:20px"></i>
            </div>
        </header>
    `,
    data() {
        return {
            dayOrNight: true,
        }
    },
    methods: {
        changeMode() {
            this.dayOrNight = !this.dayOrNight;
            console.log(this.dayOrNight);
        }
    },

}