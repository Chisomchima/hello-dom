<template>
  <div class="mt-4">
    <NoRecordPlaceholder
      v-if="content_material.length <= 0"
      text="No Content Material added"
    >
      <b-dropdown
        text="Add Content Material"
        variant="outline-primary"
        class="m-2"
        dropup
      >
        <b-dropdown-item
          v-for="(item, index) in dropdown"
          :key="index"
          @click="
            addContent({
              type: item.type,
              component: item.component,
              accepts: item.accepts,
              quiz_type: item.quiz_type,
              name: item.name,
            })
          "
        >
          <Icon :icon="item.icon" class="mr-1" />{{
            item.name
          }}</b-dropdown-item
        >
      </b-dropdown>
    </NoRecordPlaceholder>
    <Accordion v-else :active-index="activeTab" multiple>
      <AccordionTab
        v-for="(item, index) in content_material"
        :key="index"
        draggable="true"
        @drop.native="onDrop($event, index)"
        @dragstart.native="startDrag($event, index)"
        @dragover.native.prevent
        @dragenter.native.prevent
      >
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <div class="d-flex">
              <div class="title-text mr-2 font-moseo">
                {{ item.dataField.title || 'Lesson Material' }}
              </div>
              <div class="line-height-0 pt-1">
                <span
                  class="iconify text-primary pointer fs-18"
                  data-icon="eva:edit-2-outline"
                ></span>
              </div>
            </div>

            <div class="d-flex font-moseo align-items-center">
              <div class="mr-3 line-height-0">
                <b-spinner
                  v-if="item.uploading"
                  small
                  variant="primary"
                ></b-spinner>

                <b-icon
                  icon="cloud-upload"
                  :variant="
                    item.dataField.url
                      ? item.dataField.url.length > 0
                        ? 'success'
                        : ''
                      : ''
                  "
                ></b-icon>
              </div>

              <!-- <div class="material-type mr-3">{{ item.type }}</div> -->
              <Icon
                class="text-danger pointer fs-18 ml-3"
                :icon="fancy_icons[item.type]"
              ></Icon>

              <div
                class="line-height-0 mr-3"
                @click.prevent.stop="removeContent(index)"
              >
                <!-- <b-icon class="text-danger pointer ml-3" icon="trash"></b-icon> -->

                <Icon
                  class="text-danger pointer fs-18 ml-3"
                  icon="uil:trash-alt"
                ></Icon>
              </div>

              <div class="line-height-0 mr-3">
                <b-icon class="text-gray pointer" icon="grip-vertical"></b-icon>
              </div>
            </div>
          </div>
        </template>
        <LmsLessonContentFileUpload
          v-if="uploadType.includes(item.type)"
          ref="uploadComponent"
          :accepts="item.accepts"
          :type="item.type"
          :edit-field="editFields[index]"
          @uploading="item.uploading = $event"
          @data:fields="item.dataField = { ...item.dataField, ...$event }"
          @file-input="
            item.dataField = { ...item.dataField, ...$event, type: item.type }
          "
        >
        </LmsLessonContentFileUpload>
        <LmsLessonContentFileUrl
          v-if="urlType.includes(item.type)"
          :edit-field="editFields[index]"
          @data:fields="item.dataField = { ...item.dataField, ...$event }"
        ></LmsLessonContentFileUrl>
        <LmsLessonContentFreeText
          v-if="freeTextType.includes(item.type)"
          :edit-field="editFields[index]"
          @data:fields="item.dataField = { ...item.dataField, ...$event }"
        ></LmsLessonContentFreeText>
        <template v-if="item.type === 'quiz'">
          <LmsLessonContentQuizObjective
            v-if="item.quiz_type === 'objective'"
            :edit-field="editFields[index]"
            @data:fields="item.dataField = { ...item.dataField, ...$event }"
          >
          </LmsLessonContentQuizObjective>

          <LmsLessonContentQuizWordCloud
            v-if="item.quiz_type === 'word_cloud'"
            :edit-field="editFields[index]"
            @data:fields="item.dataField = { ...item.dataField, ...$event }"
          >
          </LmsLessonContentQuizWordCloud>
        </template>
      </AccordionTab>
    </Accordion>
    <div class="mb-4">
      <hr class="my-3" />
      <div class="d-flex align-content-center justify-content-end">
        <div class="text-primary pointer d-flex align-content-center">
          <b-dropdown
            text="Add Content Material"
            variant="outline-primary"
            class="m-2"
            dropup
          >
            <b-dropdown-item
              v-for="(item, index) in dropdown"
              :key="index"
              @click="
                addContent({
                  type: item.type,
                  component: item.component,
                  accepts: item.accepts,
                  quiz_type: item.quiz_type,
                  name: item.name,
                })
              "
            >
              <Icon :icon="item.icon" class="mr-1" />{{
                item.name
              }}</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  props: {
    contentDetail: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fancy_icons: {
        word_document: 'vscode-icons:file-type-word',
        pdf: 'ant-design:file-pdf-filled',
        spreadsheet: 'vscode-icons:file-type-excel2',
        video: 'vscode-icons:file-type-video',
        image: 'vscode-icons:file-type-image',
        powerpoint: 'vscode-icons:file-type-powerpoint2',
        youtube_embed: 'openmoji:youtube',
        free_text: 'ant-design:file-text-outlined',
        quiz: 'akar-icons:chat-question',
      },
      uploadType: [
        'word_document',
        'pdf',
        'spreadsheet',
        'video',
        'image',
        'powerpoint',
      ],
      urlType: ['youtube_embed'],
      freeTextType: ['free_text'],
      editFields: {},
      typesAccept: {
        free_text: [],
        articles: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
        video: ['video/mp4', 'video/x-m4v', 'video/*'],
        slide_show: ['.ppt', '.pptx'],
        spreadsheet: ['.xls', '.xlsx'],
        pdf: ['.pdf'],
        image: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
        powerpoint: ['.ppt', '.pptx'],
        youtube: [],
        youtube_embed: [],
        word_document: [
          '.doc',
          '.docx',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
      },

      activeTab: [0],
      dropdown: [
        {
          name: 'PDF',
          icon: 'ant-design:file-pdf-outlined',
          component: 'LmsLessonContentFileUpload',
          type: 'pdf',
          accepts: ['.pdf'],
        },
        {
          name: 'Documents',
          icon: 'et:documents',
          component: 'LmsLessonContentFileUpload',
          type: 'word_document',
          accepts: ['.doc', '.docx'],
        },
        {
          name: 'SpreadSheet',
          icon: 'bi:file-earmark-spreadsheet',
          component: 'LmsLessonContentFileUpload',
          type: 'spreadsheet',
          accepts: ['.xls', '.xlsx'],
        },
        {
          name: 'Video',
          icon: 'ant-design:video-camera-add-outlined',
          type: 'video',
          accepts: ['video/mp4', 'video/x-m4v', 'video/*'],
          component: 'LmsLessonContentFileUpload',
        },
        {
          name: 'Image',
          icon: 'ant-design:file-image-outlined',
          type: 'image',
          component: 'LmsLessonContentFileUpload',
          accepts: ['.jpg', '.jpeg', '.png'],
        },
        {
          name: 'Youtube',
          type: 'youtube_embed',
          component: 'LmsLessonContentFileUrl',
          icon: 'ant-design:youtube-outlined',
          accepts: [],
        },
        {
          name: 'Power Point',
          icon: 'bx:bx-slideshow',
          type: 'powerpoint',
          component: 'LmsLessonContentFileUpload',
          accepts: ['.ppt', '.pptx'],
        },
        {
          name: 'Free Text',
          type: 'free_text',
          component: 'LmsLessonContentFreeText',
          icon: 'ant-design:file-text-outlined',
          accepts: [],
        },

        {
          name: 'Quiz - Objective',
          type: 'quiz',
          quiz_type: 'objective',
          component: 'LmsLessonContentQuizObjective',
          icon: 'akar-icons:chat-question',
          accepts: [],
        },
        {
          name: 'Quiz - Word Cloud',
          type: 'quiz',
          quiz_type: 'word_cloud',
          component: 'LmsLessonContentQuizWordCloud',
          icon: 'akar-icons:chat-question',
          accepts: [],
        },
      ],
      content_material: [
        // {
        //   title: 'Title',
        //   description: 'Description',
        //   type: 'Document / PDF',
        //   component: 'LmsLessonContentFileUpload',
        //   // material_url: 'https://www.google.com/'
        //   dataField: {
        //     title: '',
        //     description: ''
        //   },
        //   file: ''
        // }
      ],
    }
  },
  watch: {
    content_material: {
      handler(newValue) {
        this.$emit('content:details', newValue)
      },
      deep: true,
    },
    contentDetail: {
      handler(newVal) {
        if (Object.values(newVal).length > 0) {
          const includeUrl = ['youtube', 'youtube_embed']
          const includeFreeText = ['free_text']

          this.content_material = newVal.map((item) => {
            if (includeFreeText.includes(item.type)) {
              const dataField = this.$route.query.local_draft_id
                ? { ...item.dataField }
                : { ...item }

              return {
                title: item.title || item.dataField.title,
                description: item.description || item.dataField.description,
                component: 'LmsLessonContentFreeText',
                type: item.type || item.dataField.type,
                dataField,
                accepts: this.typesAccept[item.type || item.dataField.type],
              }
            } else if (includeUrl.includes(item.type)) {
              const dataField = this.$route.query.local_draft_id
                ? { ...item.dataField }
                : { ...item }

              return {
                title: item.title || item.dataField.title,
                description: item.description || item.dataField.description,
                component: 'LmsLessonContentFileUrl',
                type: item.type || item.dataField.type,
                dataField,
                accepts: this.typesAccept[item.type || item.dataField.type],
              }
            } else {
              const dataField = this.$route.query.local_draft_id
                ? { ...item.dataField }
                : { ...item }

              return {
                title: item.title || item.dataField.title,
                description: item.description || item.dataField.description,
                component: 'LmsLessonContentFileUpload',
                type: item.type || item.dataField.type,
                dataField,
                accepts: this.typesAccept[item.type || item.dataField.type],
                quiz_type: item.quiz_type
                  ? item.quiz_type || item.dataField.quiz_type
                  : null,
              }
            }
          })
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    if (this.contentDetail.length > 0) {
      this.editFields = this.content_material.map((item) => item.dataField)
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    addContent({ type, component, accepts, quiz_type, name }) {
      this.content_material.push({
        type,
        component,
        accepts,
        uploading: false,
        quiz_type,
        dataField: {
          title: type === 'quiz' ? name : '',
          description: 'This is a lesson quiz',
          type,
          quiz_type,
          url: '',
        },
        file: '',
      })

      this.activeTab = []
      setTimeout(() => {
        this.activeTab = [this.content_material.length - 1]
      }, 700)
    },
    removeContent(index) {
      this.content_material.splice(index, 1)
    },
    startDrag(evt, id) {
      this.activeTab = []
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', id)
    },
    onDrop(e, newIndex) {
      const ItemID = e.dataTransfer.getData('itemID')
      const newItem = this.content_material[newIndex]
      this.content_material[newIndex] = this.content_material[ItemID]
      this.content_material[ItemID] = newItem
    },
  },
}
</script>

<style scoped>
.title-text {
  border: none !important;
  font-size: 14px;
  font-weight: normal;
  line-height: 150%;
  color: #1070b7;
  max-width: 397px;
}

.material-type {
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  color: #484848;
}
</style>
