<template>
  <div>
    <div class="">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitForm)">
          <div v-for="(form, index) in books" :key="index">
            <div class="d-flex justify-content-end mb-3">
              <div class="text-danger" @click="books.splice(index, 1)">
                <Icon
                  class=""
                  icon="fluent:delete-28-regular"
                  :style="{ fontSize: '1.5rem' }"
                />
              </div>
            </div>
            <div>
              <div class="bg-white p-3">
                <div class="row">
                  <div
                    class="
                      col-4 col-lg-3 col-xl-2
                      d-flex
                      flex-column
                      justify-content-between
                    "
                  >
                    <div>
                      <span class="text-secondary"> Resource Upload</span>
                      <div
                        class="
                          blue-dashed
                          rounded
                          text-center
                          p-1
                          d-flex
                          align-items-center
                          justify-content-center
                        "
                        @click="uploadFile(index)"
                      >
                        <div
                          v-if="form.spinner"
                          class="spinner-grow text-primary"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                        <div v-else class="d-flex mt-2 flex-column">
                          <div class="">
                            <Icon
                              class="text-primary"
                              icon="ant-design:file-filled"
                              :style="{ fontSize: '1.5rem' }"
                            />
                          </div>
                          <div
                            class="
                              text-primary text-truncater text-truncater-lines-3
                            "
                            style="word-wrap: break-word"
                          >
                            {{ form.fileName ? form.fileName : msg }}
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="form.fileName"
                        class="text-center"
                        style="max-width: 9rem"
                      >
                        <div
                          class="mr-2 text-danger"
                          @click="form.fileName = ''"
                        >
                          <span
                            class="iconify"
                            data-icon="fluent:delete-24-filled"
                          ></span>
                        </div>
                      </div>
                      <div class="mt-2">
                        <VTooltip
                          placement="right"
                          :triggers="['hover']"
                          :skidding="-32"
                          :arrow-padding="8"
                        >
                          <div
                            class="
                              info-icon
                              d-flex
                              align-items-center
                              border-0
                              bg-transparent
                              text-dark
                            "
                          >
                            <span class="mr-1" style="font-size: 0.85rem">
                              Formats
                            </span>
                            <span
                              class="iconify"
                              data-inline="false"
                              data-icon="foundation:info"
                            ></span>
                          </div>

                          <template #popper>
                            <div class="" style="max-width: 10rem">
                              <span class="">
                                <small class="text-white text-right">
                                  Audio, Wave, MP3, MP4, Excel, Epub, Docx, Txt,
                                  PPT, DOC, EPUB, Video
                                </small>
                              </span>
                            </div>
                          </template>
                        </VTooltip>
                      </div>
                    </div>
                    <div class="mb-4">
                      <div
                        class="p-1 text-primary rounded"
                        :style="{
                          height: '12rem',
                          maxWidth: '9rem',
                          transition: 'transform 0.3s ease-out',
                          'border-style': 'dotted',
                          'border-color': '#80B4D9',

                          'background-image': `url('${form.thumbnail}')`,

                          'background-repeat': 'no-repeat, repeat',
                          'background-size': '10rem 12rem',
                          'background-position': '50% 10%',
                        }"
                        @click="uploadThumbail(index)"
                      >
                        <div
                          class="
                            mt-5
                            d-flex
                            flex-column
                            align-items-center
                            justify-content-center
                          "
                        >
                          <template v-if="!form.thumbnail">
                            <div class="">
                              <Icon
                                icon="akar-icons:image"
                                :style="{ fontSize: '1.5rem' }"
                              />
                            </div>

                            <br />
                            <div
                              v-if="form.thumbnailSpinner"
                              class="spinner-grow text-primary"
                              role="status"
                            >
                              <span class="sr-only">Loading...</span>
                            </div>
                            <div
                              v-else
                              class="m-0 text-center"
                              style="word-wrap: break-word"
                            >
                              Upload Thumbnail
                            </div>
                          </template>
                        </div>
                      </div>
                      <div
                        v-if="form.thumbnail"
                        class="text-center"
                        style="max-width: 9rem"
                      >
                        <span
                          class="mr-2 text-danger"
                          @click="form.thumbnail = ''"
                        >
                          <span
                            class="iconify"
                            data-icon="fluent:delete-24-filled"
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-8 col-lg-9 col-xl-10">
                    <div class="form-group">
                      <ValidationProviderWrapper :rules="['required']">
                        <label class="" for="title">Resource Title</label>
                        <br />
                        <input
                          id="title"
                          v-model="form.name"
                          class="w-100 form-control"
                          type="text"
                          placeholder="Enter Title"
                        />
                      </ValidationProviderWrapper>
                    </div>
                    <div class="mt-2 form-group">
                      <label for="title">Authors</label> <br />
                      <input
                        v-model="form.author"
                        placeholder="Example Adamu Muhammad, Ada JohnSon"
                        type="text
                      
                      
                      "
                        class="form-control"
                      />
                      <!-- <v-select
                        ref="multiple"
                        class="style-chooser1"
                        taggable
                        multiple
                        push-tags
                        placeholder="Adamu Muhammad, Ada JohnSon"
                        :select-on-key-codes="[188, 13]"
                      /> -->
                    </div>
                    <!-- <div class="row mt-2">
                      <div class="col-md-6 my-2">
                        <label class="">Grade Level</label>
                        <br />
                        <MultiSelect
                          v-model="form.grades"
                          :filter="true"
                          :options="gradeLevels"
                          :option-value="(option) => option.name"
                          :multiple="true"
                          placeholder="Select Grade Level"
                          option-label="name"
                        >
                        </MultiSelect>
                      </div>
                      <div class="col-md-6 my-2">
                        <Label class="">Subject</Label>
                        <br />
                        <MultiSelect
                          v-model="form.subjects"
                          :filter="true"
                          :options="allSubjects"
                          :multiple="true"
                          placeholder="Select Subject "
                        >
                        </MultiSelect>
                      </div>
                    </div> -->
                    <div class="mt-2 form-group">
                      <label for="description">Description</label>
                      <br />
                      <textarea
                        id="description"
                        v-model="form.description"
                        rows="4"
                        cols="50"
                        class="w-100 form-control"
                        type="text"
                        placeholder="Enter Description"
                      />
                    </div>
                    <div class="row mt-2">
                      <div class="col form-group">
                        <label class="" for="publishers">Publishers</label>
                        <br />
                        <v-select
                          ref="multiple"
                          v-model="form.publishers"
                          taggable
                          multiple
                          :options="publishers"
                          class="style-chooser1"
                          push-tags
                          placeholder="Type in Publishers"
                          :select-on-key-codes="[188, 13]"
                        />
                      </div>
                      <div class="col form-group">
                        <label class="" for="date">Publishing Date</label>
                        <br />

                        <v-date-picker
                          v-model="form.publishing_date"
                          :model-config="modelConfig"
                          mode="date"
                        >
                          <template #default="{ togglePopover }">
                            <span @click="togglePopover()">
                              <input
                                class="form-control"
                                :value="form.publishing_date"
                                placeholder="2022-08-12"
                              />
                            </span>
                          </template>
                        </v-date-picker>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-3">
            <div class="text-primary" @click="addItem">
              <Icon
                class=""
                icon="akar-icons:plus"
                :style="{ fontSize: '1.5rem' }"
              />
              <span> Add another Material </span>
            </div>
            <BaseButton>Submit</BaseButton>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <input
      id="fileInput"
      ref="fileInput"
      type="file"
      class="invisible"
      accept=".epub,.pdf,.doc,.ppt,.pptx,.docx,.xlsx,.xls,.mp4,.mp3,.avi,.flv,.mov,.wmv,.m4v"
      @change="onChange"
    />
    <input
      id="fileInput2"
      ref="fileInput2"
      type="file"
      class="invisible"
      accept="image/x-png,image/gif,image/jpeg"
      @change="onChange2"
    />
  </div>
</template>

<script>
import MultiSelect from 'primevue/multiselect'

import subjectResource from '~/mixins/subjectresources'

export default {
  components: {
    MultiSelect,
  },
  mixins: [subjectResource],
  props: {
    gradeLevels: {
      type: Array,
      default: () => [],
    },
    allSubjects: {
      type: Array,
      default: () => [],
    },
    publishers: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
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
</style>
