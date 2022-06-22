<template>
  <main @click="hideSearch">
    <section v-show="!showAddForm">
      <div v-if="isTeacherPage" class="d-flex align-items-center justify-content-between">
        <div class="page-heading mb-2 mr-2">Subject Resource</div>
        <div class="d-flex align-items-center mb-2">
          <div class="mr-2">
            <b-button variant="primary" class="py-2 px-3" @click="showAddModal">
              <b-icon icon="calendar-plus"></b-icon> Add Resource to Subject
            </b-button>
          </div>
        </div>
      </div>

      <UtilsFilterComponent
        disablePagination
        disableSearch
        visual="grid"
        @search-input="filter"
      >
        <template #besideFilterButton>
          <div class="ml-3">
            <LmsSubjectSearch
              :visibleProp="visibleSearch"
              class="mt-3"
              @search="handleSearch"
              @visible="handleVisible"
            />
          </div>
        </template>
        <template #default="{ visualization }">
          <Table
            v-if="visualization === 'list'"
            :items="filteredData.map((e) => ({ moreActions: '', ...e }))"
            :fields="fields"
            :pages="pages"
            :per-page="page_size"
            @page-changed="refresh"
            @row-clicked="onRowClicked"
          >
            <template #subjects="{ data }">
              <span>
                {{
                  data.item.subjects
                    ? data.item.subjects
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}</span
              >
            </template>
            <template #grades="{ data }">
              <span>
                {{
                  data.item.grades
                    ? data.item.grades
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}</span
              >
            </template>
            <template #author="{ data }">
              <span>
                {{
                  data.item.author
                    ? data.item.author
                        .replaceAll("'", "")
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                    : ""
                }}</span
              >
            </template>
            <template v-if="isTeacherPage" #moreActions="{ data }">
              <b-button class="bg-danger" @click="DeleteItem(data)">
                <span class="iconify" data-icon="ri:delete-bin-5-fill"></span>
              </b-button>
            </template>
          </Table>
          <div v-else>
            <section v-if="filteredData.length">
              <div class="row">
                <div
                  v-for="(book, index) in filteredData"
                  :key="index"
                  class="col-xl-3 col-lg-6 col-md-4 col-sm-6 mb-4"
                >
                  <div
                    class="pt-2 pl-2 new-libray-container-mine d-flex align-items-start flex-column rounded text-white"
                    :style="{
                      position: 'relative',

                      'background-image': `url('${book.thumbnail}')`,

                      'background-repeat': 'no-repeat, repeat',
                      'background-size': '10rem 15rem',
                      'background-position': '50% 10%',
                    }"
                    @click="onRowClicked(book)"
                  >
                    <div class="ml-auto">
                      <VTooltip
                        placement="right"
                        theme="info-custom"
                        :triggers="['hover']"
                        :skidding="-32"
                        :arrow-padding="8"
                      >
                        <button class="info-icon border-0 bg-transparent text-dark">
                          <span
                            class="iconify"
                            data-inline="false"
                            data-icon="foundation:info"
                          ></span>
                        </button>

                        <template #popper>
                          <div class="">
                            <h5>{{ book.name }}</h5>
                            <div
                              class="mt-auto d-flex justify-content-start"
                              :style="{
                                'font-weight': 'normal',
                                'font-size': '0.8rem',
                                'line-height': '150%',
                                color: 'rgba(255, 255, 255, 0.8) ',
                              }"
                            >
                              by
                              {{
                                book.author
                                  .toString()
                                  .replaceAll("'", "")
                                  .replaceAll("[", "")
                                  .replaceAll("]", "")
                              }}
                            </div>
                            <p class="mb-0">Description: {{ book.description }}</p>
                            <p class="mb-0">Format: {{ book.format }}</p>
                            <!-- <p class="mb-0">
                              Subject:
                              {{
                                book.subjects
                                  .replaceAll("'", "")
                                  .replaceAll("[", "")
                                  .replaceAll("]", "")
                              }}
                            </p>
                            <p class="mb-0">
                              Grades(s):
                              {{
                                book.grades
                                  .replaceAll("'", "")
                                  .replaceAll("[", "")
                                  .replaceAll("]", "")
                              }}
                            </p> -->
                          </div>
                        </template>
                      </VTooltip>
                    </div>
                    <div
                      v-if="!book.thumbnail"
                      class="d-flex justify-content-start"
                      :style="{}"
                    >
                      <span class="text-dark"> Name: </span>
                      <br />
                      <span class="text-truncater-custom ml-2">
                        {{ book.name }}
                      </span>
                    </div>
                    <div
                      v-if="!book.thumbnail"
                      class="mt-auto mb-4 d-flex justify-content-start"
                      :style="{}"
                    >
                      <span class="text-dark"> By: </span>
                      <span class="text-truncater-custom ml-2">
                        {{
                          book.author
                            ? book.author
                                .replaceAll("'", "")
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                            : "__"
                        }}
                      </span>
                    </div>

                    <div
                      class="px-2 ml-auto text-uppercase"
                      :style="{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        'background-color': 'rgb(229, 135, 77)',
                      }"
                    >
                      {{ book.format.slice(1) }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="page_size"
                  aria-controls="my-table"
                  @change="refresh"
                ></b-pagination>
              </div>
            </section>
            <section v-else>
              <UtilsEmptyState text="No Resource found " style="height: 55rem" />
            </section>
          </div>
        </template>
      </UtilsFilterComponent>
    </section>
    <section v-if="showAddForm">
      <LmsSubjectResourceDetails @back="showAddForm = false" :data="selectedBook" />
      <!-- <pre>{{ selectedBook }}</pre> -->
    </section>

    <!-- *********** modals **************** -->
    <section>
      <ModalWrapper
        id="delete-item-modal"
        title="Remove Subject Resource"
        buttonColor="bg-danger"
        submit-title="Remove"
        @ok="removeItemFromClass"
      >
        <div class="">
          Are you sure you want to remove this resource from this Subject?
        </div>
      </ModalWrapper>
      <ModalWrapper
        id="AddSchoolItems"
        title="Add Resource to Subject"
        submit-title="Add"
        size="lg"
        @ok="addItemToClass"
        @hide="clearForm"
        :noFooter="noFooter"
      >
        <!-- buttons with options  -->
        <section v-if="modalPage === 'showOptions'">
          <div class="row px-5">
            <div class="col-7 upload_container px-5">
              <div class="">
                <img
                  src="~/assets/img/resource_add.svg"
                  class="img-fluid"
                  alt=""
                  @click="modalPage = 'newResource'"
                />
                <b-button
                  variant="primary"
                  class="ml-4 upload_button"
                  @click="modalPage = 'newResource'"
                  >Create new Resource</b-button
                >
              </div>
            </div>
            <div class="col-5 upload_container">
              <div>
                <img
                  src="~/assets/img/resource_upload.svg"
                  class="img-fluid"
                  alt=""
                  @click="modalPage = 'libraryTable'"
                />
                <b-button
                  variant="primary"
                  class="upload_button"
                  @click="modalPage = 'libraryTable'"
                  >Upload from School Library</b-button
                >
              </div>
            </div>
          </div>
        </section>
        <!-- page that looks like add library item  -->
        <section v-if="modalPage === 'newResource'">
          <LmsSubjectAddResource
            :gradeLevels="gradeLevels"
            :allSubjects="allSubjects"
            :publishers="publishers"
            @toDropDown="modalPage = 'librarydropdown'"
            @submit="handleUnshift"
          />
        </section>

        <section v-else-if="modalPage === 'libraryTable'" class="">
          <LmsSubjectAddResourceTable @refresh="handleRefresh" />
        </section>
        <!-- dropdown here  v-else-if="modalPage === 'librarydropdown'"-->
        <section v-else-if="modalPage === 'librarydropdown'" class="">
          <!-- <pre>{{ newItem }}</pre> -->
          <!-- <pre>lols{{ newItem.libraryItemId }}</pre> -->
          <form class="form-group form">
            <label for="item"> Library Item</label>
            <MultiSelect
              v-model="newItem.libraryItemId"
              :filter="true"
              :options="AllSchoolItems"
              :multiple="true"
              placeholder="Library Item"
              option-label="name"
              display="chip"
            >
            </MultiSelect>

            <!-- <v-select
              v-model="newItem.libraryItemId"
              class="style-chooser1"
              placeholder="Library Item"
              multiple
              label="name"
              :options="AllSchoolItems"
            ></v-select> -->
          </form>
        </section>
      </ModalWrapper>
    </section>
  </main>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import subjectResource from "~/mixins/subjectresources";
export default {
  components: {
    MultiSelect,
  },
  mixins: [subjectResource],
  props: {
    content: {
      type: Object,
      default: () => {},
    },
    isTeacherPage: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.form {
  min-height: 7rem;
}
.tooltip.popover .popover-inner {
  background: yellow;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}
label {
  margin-bottom: 0px;
}
.blue-dashed {
  max-width: 10rem;
  height: 6rem;
  background-color: #ecf7ff;
  border-style: dotted;
  cursor: pointer;

  border-color: #80b4d9;
}
.p-multiselect >>> .p-multiselect-label {
  font-weight: 400;
  color: #8f9aa3;
}
.p-multiselect {
  width: 100%;
}
.new-libray-container-mine {
  cursor: pointer;
  width: 9.4rem;
  min-height: 15rem;
  max-height: 20rem;
  box-shadow: 0px 15px 50px rgb(82 20 24 / 5%);
  /*  border: 3px solid #8ebfe4; */
  background: center no-repeat #6b9abf;
}
.style-chooser1 >>> .vs__search::placeholder,
.style-chooser1 >>> .vs__dropdown-toggle,
.style-chooser1 >>> .vs__dropdown-menu {
  background: #fbfdfe;
  color: #abb4bc;
}

.style-chooser1 >>> .vs__clear,
.style-chooser1 >>> .vs__open-indicator {
  fill: #abb4bc;
}

.upload_container img {
  cursor: pointer;

  height: 13rem;
}
.upload_container .upload_button {
  margin-top: 2rem;
}
</style>
