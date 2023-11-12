import { computed } from 'vue';
import db_utility from './../../js/db_utility.js';
export default {
  template: `
  <div id="topRating-wp" style="height:500px">
  <div id="carouselExample" class="carousel slide" style="width: 100%;height:100%">
    <div class="carousel-inner">
      <div
        class="carousel-item active d-flex justify-content-center"
        style="padding: 20px"
      >
        <img
          :src="this.mostIncome_img[this.mostIncome_page-1]" style="width:auto;height:auto"
          class="pic"
          alt="..."
          style="width: 26%"
          loading="lazy"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span
        class="carousel-control-prev-icon"
        aria-hidden="true"
        style="backgroundColor: black"
        @click="updateMostIncome(-1)"
      ></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span
        class="carousel-control-next-icon"
        aria-hidden="true"
        style="backgroundColor: black"
        @click="updateMostIncome(1)"
      ></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>




    <div id="mostPopular-wp">
      <h3 style="padding:10px">Most Popular</h3>
      <div id="carouselExample" class="carousel slide" style="width: 100%">
        <div class="carousel-inner">
          <div
            class="carousel-item active d-flex justify-content-center"
            style="padding: 20px"
          >
            <img
              v-for="imgUrl in this.mostPopularImg"
              :src="imgUrl"
              class="pic"
              alt="..."
              style="width: 26%"
              loading="lazy"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
            style="backgroundColor: black"
            @click="updateMostPopular(-1)"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
            style="backgroundColor: black"
            @click="updateMostPopular(1)"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    


    <div id="topRating-wp">
      <h3 style="padding:10px">Top Rating</h3>
      <div id="carouselExample" class="carousel slide" style="width: 100%">
        <div class="carousel-inner">
          <div
            class="carousel-item active d-flex justify-content-center"
            style="padding: 20px"
          >
            <img
              v-for="imgUrl in this.top_50_Img"
              :src="imgUrl"
              class="pic"
              alt="..."
              style="width: 26%"
              loading="lazy"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
            style="backgroundColor: black"
            @click="updateTop50(-1)"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
            style="backgroundColor: black"
            @click="updateTop50(1)"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    `,
  data() {
    return {
      mostPopularRequest: "get/mostpopular/?per_page=3&page=1",
      top50Request: "get/top50/?per_page=3&page=1",
      mostIncomeRequest: "get/topboxoffice/?per_page=1&page=1",
      mostPopular: {},
      page: 1,
      per_page: 1,
      mostPopularImg: [],
      isLoading: false,
      top_50_page: 1,
      top_50_per_page: 1,
      top_50_Img: [],
      top_50: {},
      mostIncome: {},
      mostIncome_img: [],
      mostIncome_page: 1,
      mostIncome_per_page: 1,
    }
  },
  methods: {
    async updateMostPopular(num) {
      this.mostPopular = await db_utility.fetch(this.mostPopularRequest);
      const pre = this.page;
      this.page = this.page + num
      if (this.page < 1 || this.page > this.mostPopular.total_page) {
        this.page = pre;
      }
      this.mostPopularImg = [];
      const startIndex = (this.page - 1) * this.per_page;
      const endIndex = startIndex + this.per_page;
      for (let i = startIndex; i < endIndex; i++) {
        this.mostPopularImg.push(this.mostPopular.items[i].image)
      }
    },

    async requestMostPopularPage() {
      try {
        this.isLoading = true;
        this.mostPopular = await db_utility.fetch(this.mostPopularRequest);
        this.page = this.mostPopular.page;
        this.per_page = this.mostPopular.per_page;
        const startIndex = (this.page - 1) * this.per_page;
        const endIndex = startIndex + this.per_page;
        for (let i = startIndex; i < endIndex; i++) {
          this.mostPopularImg.push(this.mostPopular.items[i].image)
        }
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        this.isLoading = false;
      }

    },
    async updateTop50(num) {
      this.top_50 = await db_utility.fetch(this.top50Request);
      const pre = this.top_50_page;
      this.top_50_page = this.top_50_page + num
      if (this.top_50_page < 1 || this.top_50_page > this.top_50.total_page) {
        this.top_50_page = pre;
      }
      this.top_50_Img = [];
      const startIndex = (this.top_50_page - 1) * this.top_50_per_page;
      const endIndex = startIndex + this.top_50_per_page;
      for (let i = startIndex; i < endIndex; i++) {
        this.top_50_Img.push(this.top_50.items[i].image)
      }
    },
    async requestMostTop50() {
      try {
        this.isLoading = true;
        this.top_50 = await db_utility.fetch(this.top50Request);
        this.top_50_page = this.top_50.page;
        this.top_50_per_page = this.top_50.per_page;
        const startIndex = (this.top_50_page - 1) * this.top_50_per_page;
        const endIndex = startIndex + this.top_50_per_page;
        for (let i = startIndex; i < endIndex; i++) {
          this.top_50_Img.push(this.top_50.items[i].image)
        }
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        this.isLoading = false;
      }
    },
    async updateMostIncome(num) {
      this.mostIncome = await db_utility.fetch(this.mostIncomeRequest);
      const pre = this.mostIncome_page;
      this.mostIncome_page = this.mostIncome_page + num
      if (this.mostIncome_page < 1 || this.mostIncome_page > this.mostIncome.total_page) {
        this.mostIncome_page = pre;
      }
    },

    async requestMostIncome() {
      try {
        this.isLoading = true;
        this.mostIncome = await db_utility.fetch(this.mostIncomeRequest);
        this.mostIncome_page = this.mostIncome.page;
        this.mostIncome_per_page = this.mostIncome.per_page;
        this.mostIncome.items.forEach(element => {
          this.mostIncome_img.push(element.image);
        });
        console.log(this.mostIncome_img)

      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        this.isLoading = false;
      }

    },

  },
  created() {
    // db_utility.fetch(this.mostPopularRequest).then(data => {
    //     this.mostPopular = data;
    //     this.page = this.mostPopular.page;
    //     this.per_page = this.mostPopular.per_page;
    //     const startIndex = (this.page - 1) * this.per_page;
    //     const endIndex = startIndex + this.per_page;
    //     for (let i = startIndex; i < endIndex; i++) {
    //         this.mostPopularImg.push(this.mostPopular.items[i].image)
    //     }
    // })

    this.requestMostPopularPage();
    this.requestMostTop50();
    this.requestMostIncome();



  }
}