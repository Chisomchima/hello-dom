<template>
  <div class="conatiner">
    <div class="page-heading mb-4">Clubs</div>

    <div class="card">
      <div class="card-body">
        <div
          class="d-flex align-items-center justify-content-between flex-wrap"
        >
          <div class="filter-wrapper mr-2">
            <div class="search-input student-filter-input mb-2">
              <span
                class="iconify icon"
                data-inline="false"
                data-icon="carbon:search"
              ></span>
              <input
                v-model="searchInput"
                type="text"
                class="form-control rounded-pill w-100"
                placeholder="Search"
                @keyup="searchExercise"
              />
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="font-family_brown fs-14 text-black">Sort by:</div>
            <div class="student-filter-input ml-2">
              <select v-model="sortBy" class="form-control">
                <option value="asc">Newest to Oldest</option>
                <option value="dsc">Oldest to Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div class="dashboard-banner banner-style-2 px-5 py-4 mt-4">
          <div class="title-text line-height-130p text-primary mb-3 py-4">
            Find a Club, <br />Find were you belong.
          </div>
        </div>

        <div class="table-container mt-4">
          <div class="custom-card-tabs mt-1">
            <ul id="pills-tab" class="nav" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  id="pills-Clubs-tab"
                  class="nav-link active"
                  data-toggle="pill"
                  href="#pills-Clubs"
                  role="tab"
                  aria-controls="pills-Clubs"
                  aria-selected="true"
                  >Clubs</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  id="pills-My-clubs-tab"
                  class="nav-link"
                  data-toggle="pill"
                  href="#pills-My-clubs"
                  role="tab"
                  aria-controls="pills-My-clubs"
                  aria-selected="false"
                  >My Clubs</a
                >
              </li>
            </ul>
          </div>

          <div id="pills-tabContent" class="tab-content card-body">
            <div
              id="pills-Clubs"
              class="tab-pane fade show active"
              role="tabpanel"
              aria-labelledby="pills-Clubs-tab"
            >
              <div>
                <div v-if="$fetchState.pending">
                  <p>Loading...</p>
                </div>
                <div v-else-if="$fetchState.error">
                  <p>Sorry an error occured</p>
                </div>
                <div v-else>
                  <UtilsEmptyState
                    v-if="clubsToShow.general_clubs.length < 1"
                    text="No available clubs"
                  />
                  <div v-else class="row">
                    <ClubsClubItem
                      v-for="club in clubsToShow.general_clubs"
                      :key="club.id"
                      :club="club"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              id="pills-My-clubs"
              class="tab-pane fade"
              role="tabpanel"
              aria-labelledby="pills-My-clubs-tab"
            >
              <div>
                <div v-if="$fetchState.pending">
                  <p>Loading...</p>
                </div>
                <div v-else-if="$fetchState.error">
                  <p>Sorry an error occured</p>
                </div>
                <div v-else>
                  <UtilsEmptyState
                    v-if="clubs.my_clubs.length < 1"
                    text="You don't belong to a club yet"
                  />
                  <div v-else class="row">
                    <ClubsClubItem
                      v-for="club in clubsToShow.my_clubs"
                      :key="club.id"
                      :club="club"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'Clubs',
  // layout: 'authWithoutTopbar',
  data() {
    return {
      clubs: [],
      clubsToShow: [],
      sortBy: 'asc',
      searchInput: ''
    }
  },
  async fetch() {
    this.$nuxt.$loading.start()
    const { data } = await this.$axios.$get(
      `lms/v2/school/${this.getSchoolId()}/clubs/?order=${this.sortBy}`
    )
    this.clubs = data
    this.clubsToShow = data
    this.$nuxt.$loading.finish()
    // console.log(this.clubs)
  },
  watch: {
    sortBy() {
      this.$fetch()
    }
  },
  methods: {
    searchExercise: debounce(function () {
      const searchItems = this.clubs.general_clubs.filter((item) => {
        return item.name.toLowerCase().includes(this.searchInput.toLowerCase())
      })
      this.clubsToShow.general_clubs = searchItems
    }, 500),
    getSchoolId() {
      const school = this.$store.state.student.schools.filter(
        (item) => item?.code === this.$route?.params?.schoolId
      )
      return school[0]?.id
    }
  },
  mounted() {
    this.$router.push({
      name: 'student-lms-schoolId-coming-soon',
      params: {
        schoolId: this.$route.params.schoolId
      }
    })
  }
}
</script>
