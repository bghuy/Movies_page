import { computed } from 'vue';
import db_utility from '../js/db_utility.js';
export default {
    template: `
        <div id="searchWrapper" class="d-flex flex-wrap">
            <div class="card " style="width: 18rem;margin: 0px 5px;border:none" v-for="(element,index) in this.search_items">
                <img class="card-img-top pic" :src="element.image" alt="Card image cap" style="width:100%;margin:0">
                <div class="card-body" style="text-align:center">
                <p class="card-text">{{element.fullTitle}}</p>
                </div>
            </div>
        </div>


    `, props: {
        searchValue: String
    },
    data() {
        return {
            searchRequest: `search/movie/${this.searchValue}?per_page=6&page=1`,
            search: {},
            search_img: [],
            search_page: 1,
            search_per_page: 6,
            isLoading: false,
            search_items: []
        }
    },
    methods: {
        async requestSearchPage() {
            try {
                this.isLoading = true;
                this.search = await db_utility.fetch(this.searchRequest);
                this.search_page = this.search.page;
                this.search_per_page = this.search.per_page;
                const startIndex = (this.search_page - 1) * this.search_per_page;
                const endIndex = startIndex + this.search_per_page;
                this.search_img = this.search.items.image
                this.search_items = this.search.items
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
                this.isLoading = false;
            }
        }

    }
    ,
    created() {
        this.requestSearchPage()
        console.log('search')
    },
}