<template>
  <div class="heightmain">
    <!-- <DiscoveryBackgroundDetails /> -->
    <!-- <background-details /> -->
    <div class="relativecontainer">
      <div class="absolutepng"></div>
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <!-- <div class="carousel-item"> -->
          <!-- <div class="relativecontainer">
              <img
                class="img-fluid carouselimages"
                src="~assets/img/discoverySlides/newslide-1.png"
                alt="First slide"
              />

              <div class="carouseltext d-flex justify-content-between p-md-3 p-2">
                <h2 class="quoteleft text-center mb-0">"I am still learning"</h2>

                <h2 class="quoteright text-center mb-0">-Michel Angelo</h2>
              </div>
            </div>
          </div> -->

          <div class="carousel-item active">
            <div class="relativecontainer">
              <img
                class="img-fluid carouselimages"
                src="~assets/img/discoverySlides/newslide-5.png"
                alt="First slide"
              />

              <div
                class="carouseltext soulcrafting d-flex justify-content-between p-md-3 p-2"
              >
                <h2 class="quoteleft text-center mb-0">"Education is soul crafting."</h2>

                <h2 class="quoteright text-center mb-0">-Cornel West</h2>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="relativecontainer">
              <img
                class="img-fluid carouselimages"
                src="~assets/img/discoverySlides/newslide-3.png"
                alt="First slide"
              />
              <div class="carouseltext d-flex justify-content-between p-md-3 p-2">
                <h2 class="quoteleft text-center mb-0">
                  "Learning without thought is labor lost."
                </h2>

                <h2 class="quoteright text-center mb-0 ml-3">-Confucius</h2>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="relativecontainer">
              <img
                class="img-fluid carouselimages"
                src="~assets/img/discoverySlides/newslide-4.png"
                alt="First slide"
              />
              <div class="carouseltext d-flex justify-content-between p-md-3 p-2">
                <h2 class="quoteleft text-center mb-0">
                  "What we learn with pleasure we never forget."
                </h2>

                <h2 class="quoteright text-center mb-0 ml-3">-Alfred Mercier</h2>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only text-dark">Next</span>
          </a>
        </div>
      </div>

      <div class="positioned">
        <div class="">
          <div v-if="$fetchState.pending"><LoadingBar /></div>
          <p v-else-if="$fetchState.error">Error while fetching mountains</p>

          <DiscoveryProfileContent v-else :user-profiles="userProfiles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  layout: "profile",
  data() {
    return {
      userProfiles: [],
      student: [],
      parent: [],
      staff: [],
    };
  },
  async fetch() {
    try {
      const {
        data: { data },
      } = await this.$axios(`/util/v2/discovery/check/`);
      console.log("response is", data);
      data.type.forEach(async (element) => {
        if (element === "parent") {
          const {
            data: { data },
          } = await this.$axios.get(`/util/v2/discovery/parent/`);
          this.userProfiles.push(data);

          console.log("parent discovery is ", data);
        }
        if (element === "student") {
          const {
            data: { data },
          } = await this.$axios.get(`/util/v2/discovery/student/`);
          console.log("student discovery is ", data);
          // this.$router.push(
          //   `/student/lms/${data[0].school_details.code}/dashboard`
          // )
          this.userProfiles.unshift(data);
          return;
        }
        if (element === "staff") {
          const {
            data: { data },
          } = await this.$axios.get(`/util/v2/discovery/staff/`);
          this.userProfiles.push(data);

          console.log("staff discovery is ", data);

          // this.$router.push(
          //   `/sms/${data[0].school_details.code}/administration/student`
          // )
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    console.log(this.user);
  },
  methods: {
    store(school) {
      this.$store.dispatch("administration/putSchool", school);
    },
    changeComponent(component) {
      this.currentTabComponent = component;
    },
  },
};
</script>

<style scoped>
body,
html {
  overflow-x: hidden;
}
.container-xlx {
  /* max-width: 1140px; */
}

.carouselimages {
  height: 100vh;
  width: 100vw;

  overflow-y: hidden;
}

.margindiscovery {
  margin-left: 100px;
  margin-right: 100px;
}

.heightmain {
  height: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fbfbfb;
}

.carouseltext {
  position: absolute;
  top: 120px;
  left: 140px;
  background: rgba(37, 61, 110, 0.3);
}

.carouseltext.soulcrafting {
  position: absolute;
  top: 60px;
  left: 880px;
  right: 130px;
  background: rgba(37, 61, 110, 0.3);
}

/* .carouseltext .quoteleft {
  left: 120px;
}
.carouseltext .quoteright {
  right: 150px;
} */

.carouseltext h2 {
  color: #fff;
  font-size: 20px;
}

::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}

.discover_container {
  /* 6880df */
  background: rgb(61, 118, 202);
  background: linear-gradient(
    90deg,
    rgba(65, 125, 214, 1) 0%,
    rgba(85, 127, 218, 1) 50%,
    rgba(110, 129, 224, 1) 100%
  );
}

.positioned {
  position: absolute;
  top: 300px;
  width: 100%;
}
.carousel-control-next,
.carousel-control-prev {
  bottom: 480px !important;
  z-index: 1;
}

/* .badgerel {
  background: #fff;
  opacity: 0.3;
} */

.relativecontainer {
  position: relative;
}

.relativetext {
  position: abs;
  top: 180px;
  color: #fff;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 768px) {
  .carouselimages {
    height: auto;
  }

  .positioned {
    position: relative;
    top: -180px;
  }

  .carouseltext {
    top: 30px;
  }
  .carouseltext.soulcrafting {
    top: -40px;
  }

  .carousel-control-next,
  .carousel-control-prev {
    bottom: 180px !important;
    z-index: 1;
  }

  .carouseltext h2 {
    font-size: 14px;
  }

  .heightmain {
    height: 100vh;
  }

  .carousel-inner {
    height: 50vh;
  }
}
@media (max-width: 992px) {
  .negativebody {
    margin-top: -50px;
  }
}
@media (max-width: 694px) {
  .margindiscovery {
    margin-left: 10px;
    margin-right: 10px;
  }

  .carouseltext {
    left: 100px;
  }
}
@media (max-width: 700px) {
  .carousel-inner {
    height: 45vh;
  }
}
@media (max-width: 500px) {
  .carousel-inner {
    height: 40vh;
  }
}
@media (max-width: 472px) {
  .carousel-inner {
    height: 35vh;
  }
}
@media (max-width: 462px) {
  .carousel-inner {
    height: 30vh;
  }

  .carousel-control-next,
  .carousel-control-prev {
    bottom: 140px !important;
  }
}
@media (max-width: 391px) {
  .carousel-inner {
    height: 25vh;
  }
}

@media screen and (max-width: 470px) {
  .positioned {
    top: -120px;
  }
}
@media screen and (max-width: 390px) {
  .positioned {
    top: -90px;
  }
}

/* .carouselimages {
  height: 100vh;
} */

.carousel-item {
  height: 100vh;
}

.caru {
  font-family: "Museo Sans", Arial, Helvetica, sans-serif;
  font-size: 50px;
  color: white;
}
.changeComponent {
  background-color: #eaeff2;
}
.btn:hover {
  color: black;
  background-color: white;
  outline: none;
}

.width50 {
  width: 65%;
}

@media screen and (max-width: 991px) {
  .width50 {
    width: 100%;
  }

  .caru {
    font-size: 30px;
  }

  .usernamedetails {
    font-size: 25px;
  }
}
@media screen and (max-width: 768px) {
  .caru {
    font-size: 20px;
  }

  .usernamedetails {
    font-size: 15px;
  }

  .smallfont {
    font-size: 12px;
  }
}
</style>
