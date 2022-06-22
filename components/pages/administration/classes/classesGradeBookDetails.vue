<template>
  <div>
    <div class="d-flex justify-content-start">
      <span class="text-primary" @click="$emit('back')">
        <span class="iconify" data-icon="akar-icons:arrow-left"></span>
        Subject List
      </span>
      <span class="ml-2 text-dark">
        > {{ subject.subject ? subject.subject : 'no subject' }}</span
      >
    </div>
    <div class="mt-3">
      <div
      v-if="!entries"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <div
          style="width: 60%; height: 60%; overflow: hidden"
        >
          <img
            src="~/assets/img/no-entries.png"
            
            style="height: 100%; width: 100%"
          />
        </div>
        <div _ngcontent-mxo-c276="" class="body-text-btn">
          No entries created.
        </div>
        <!---->
      </div>
      <div v-else class="table-responsive">
        <table class="table gradebook-table border-bottom-0">
          <thead>
            <tr>
              <th
                scope="col"
                colspan="2"
                class="filter-wrapper pb-0 border-bottom-0"
              >
                <div class="search-input">
                  <span
                    class="iconify icon"
                    data-inline="false"
                    data-icon="carbon:search"
                  ></span>
                  <input
                    type="text"
                    class="form-control w-100"
                    placeholder="Search for student"
                  />
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Class work</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">30</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Project</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">30</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Class work</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">10</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Test 1</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">10</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Test 2</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">5</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
              <th scope="col" rowspan="2" class="grade-col-head">
                <div class="px-1 py-1">
                  <svg
                    class="pointer"
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect x="4.5" width="3" height="3" rx="1" fill="#B7CCDC" />
                    <rect
                      x="4.5"
                      y="5"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                    <rect
                      x="4.5"
                      y="10"
                      width="3"
                      height="3"
                      rx="1"
                      fill="#B7CCDC"
                    />
                  </svg>
                </div>
                <div class="px-3 pb-3">
                  <div class="title-text mb-2">Exam</div>
                  <div class="score-text mb-2">
                    Score: <span class="score-highlight">60</span>
                  </div>
                  <div class="period-text mb-1">1st Term</div>
                  <div class="period-text">12/02/21</div>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col" class="sortable">
                <span class="sort-arrows">Last Name</span>
              </th>
              <th scope="col" class="sortable">
                <span class="sort-arrows">First Name</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td class="grade-col-data">16</td>
              <td class="grade-col-data">24</td>
              <td class="grade-col-data">7</td>
              <td class="grade-col-data">10</td>
              <td class="grade-col-data">4</td>
              <td class="grade-col-data">55</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
    data(){
        return {
            entries: null,
        }
    },

  async fetch() {
    
    const {
      data: { data },
    } = await this.$axios.get(
      `/schools/v2/class/subject/${this.subject.id}/gradebook/?academic_period=`
    )
    
    this.entries = data.entries
    
  },
}
</script>

<style lang="scss" scoped></style>
