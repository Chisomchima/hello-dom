<template>
  <div>
    <hr class="my-4" />
    <div>
      <pre>{{ contentList }}</pre>
      <div class="card card-bordered bg-grayish-variant-2">
        <div class="card-body py-3">
          <div class="d-flex align-items-center">
            <div class="mr-3 line-height-0 pointer">
              <svg
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
                <rect x="4.5" y="5" width="3" height="3" rx="1" fill="#B7CCDC" />
                <rect x="4.5" y="10" width="3" height="3" rx="1" fill="#B7CCDC" />
              </svg>
            </div>
            <div
              class="fs-14 line-height-100p font-weight-bold mr-3"
              style="min-width: 68px"
            >
              <slot name="selectedname"></slot>
            </div>
          </div>
          <div class="mt-3">
            <slot name="editorInput"> </slot>
          </div>
          <div class="d-flex align-items-center flex-wrap justify-content-between mt-3">
            <button
              class="btn btn-light text-danger bg-white my-1"
              @click="deleteContent()"
            >
              <span class="iconify fs-16" data-icon="uil:trash-alt"></span>
            </button>
            <div class="d-flex align-items-center">
              <div v-for="(file, i) in files" :key="i" class="mx-3">
                <div class="btn btn-light text-light bg-white py-2 my-1">
                  <span class="iconify" data-icon="feather:file"></span>
                  <span class="fs-14">{{ file.name }}</span>
                  <span class="text-dark fs-12 font-weight-bold mx-1"
                    >{{ Math.round(file.size / 1024) }}kb</span
                  >
                  <span
                    class="iconify fs-16 pointer text-danger"
                    data-icon="ci:off-outline-close"
                    @click="deletefile"
                  ></span>
                </div>
              </div>

              <div class="button-wrapper">
                <span class="label"
                  ><span class="iconify" data-icon="feather:file"></span> Attach
                  File</span
                >

                <input
                  type="file"
                  name="upload"
                  multiple
                  id="upload"
                  class="upload-box"
                  placeholder="Upload File"
                  @change="handlefileupload($event, content)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    planData: {
      type: Array,
      required: true,
    },
    selectedContent: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      planList: this.planData,
      contentList: this.selectedContent,
      files: [],
    };
  },

  methods: {
    handlefileupload(event, content) {
      
      const temp = [];
      const temp2 = [];
      temp.push(event.target.files);

      for (const f of temp) {
        temp2.push(...f);
      }

      temp2.forEach((e) => {
        
        this.files.push({
          name: e.name,
          size: e.size,
          type: e.type,
          ...e,
        });
      });

      
    },
    deleteContent(index) {
      this.contentList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.button-wrapper {
  position: relative;
  width: 150px;
  text-align: center;
}

.button-wrapper span.label {
  position: relative;
  z-index: 0;
  display: inline-block;
  width: 100%;
  background: #fff;
  border: 1px solid #e7e8eb;
  border-radius: 4px;
  cursor: pointer;
  color: #1070b7;
  padding: 10px 0;
  font-size: 14px;
}

#upload {
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
