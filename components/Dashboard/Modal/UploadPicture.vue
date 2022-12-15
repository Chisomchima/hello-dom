<template>
  <div>
    <ModalWrapper size="md" id="uploadpicture" title="Upload profile picture" submitTitle="Upload" @clearForm="clear()"
      @hide="clear()" @ok="ok">
      <ValidationObserver ref="form">
        <form>
          <div class="">
            <div class="col-md-12 mb-2">
              <div class="text-center p-3">
                <b-avatar :src="uploadedFile" size="10rem" />

                <div v-if="false" class="border border-info p-3 height rounded text-14 m-3">
                  <div>
                    <div>Name: {{ fileInfo.name }}</div>
                    <div>Size: {{ fileInfo.size }}</div>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <div v-if="!uploadedFile" class="m-3">
                    <button @click.prevent="$refs.reduce.click()" class="btn btn-primary rounded">Select
                      profile picture</button>
                  </div>

                  <div v-if="uploadedFile" class="m-3">
                    <button @click.prevent="changeImage"  class="btn btn-primary rounded">Change image</button>
                  </div>
                </div>
              </div>
              <div class="input-field">
                <client-only>
                    <image-uploader
                          :preview="true"
                          :className="[
                            'fileinput',
                            { 'fileinput--loaded': hasImage },
                          ]"
                          :capture="false"
                          :debug="1"
                          :quality="0.2"
                          doNotResize="gif"
                          :autoRotate="true"
                          outputFormat="verbose"
                          @input="setImage"
                          accept="image/*"
                        >
                          <label
                            ref="reduce"
                            for="fileInput"
                            slot="upload-label"
                          >
                            <figure>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  class="path1"
                                  d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                                ></path>
                              </svg>
                            </figure>
                            <span class="upload-caption">{{
                              hasImage ? 'Replace' : 'Click to upload'
                            }}</span>
                          </label>
                        </image-uploader>
                </client-only>
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
// import { DateTime } from 'luxon'
export default {
  data() {
    return {
      uploadedFile: null,
      hasImage: false,
      show: false,
      fileInfo: {
        name: '',
        size: null,
      }
    }
  },
  watch: {},
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  mounted() { },

  methods: {
    setImage(file) {
      this.hasImage = true
      console.log(file)
      this.uploadedFile = file.dataUrl
      this.fileInfo.name = file.info.name
      this.fileInfo.size = ''
    },
    importData(e) {
      const formatFileSize = function (byte) {
        const sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(byte) / Math.log(1024));
        return `${(byte / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
      };
      if (!this.uploadedFile) {
        this.fileInfo.size = formatFileSize(e.target.files[0].size)
        this.fileInfo.name = e.target.files[0].name
        this.uploadedFile = e.target.files[0]
      }
    },
    changeImage(){
      this.uploadedFile = null
      this.$refs.reduce.click()
    },

    async ok() {
      if (await this.$refs.form.validate()) {
        this.uploadPicture()
      }
    },
    async uploadPicture() {
      if (this.uploadedFile != null) {
        try {
          const data = await this.$api.patient.profilePicture(
            this.data.id,
            {
              profile_picture: this.uploadedFile
            }
          )
          this.$emit('refresh')
          this.$nuxt.refresh()
          this.$toast({
            type: 'success',
            text: `${data.message}`,
          })
          this.$bvModal.hide('uploadpicture')
        } catch (error) {
          console.log(error)
        }
      }
    },

    clear() {
      this.uploadedFile = null
    },
  },
}
</script>

<style lang="scss" scoped>

</style>