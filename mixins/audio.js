export default {
  data() {
    return {
      mediaRecorder: () => {},
      media: null,
      audioMessage: '',
    }
  },

  methods: {
    closeAudio() {
      this.showAudio = false
      this.showaudioComponent = false
      this.audiofile = false
    },

    async sendaudio() {
      this.showaudioComponent = false
      const file = new File([this.audiofile], 'names.mp3', {
        type: 'mp3',
      })
      console.log('thefile', file)
      const broadcastForm = new FormData()
      broadcastForm.append('name', file.name)
      broadcastForm.append('file', file)
      broadcastForm.append('type', file.type)
      try {
        // this.broadcastSpinner = true;
        const {
          data: { data },
        } = await this.$axios.post(
          `/communications/v3/school/${this.schoolId}/file/upload/`,
          broadcastForm
        )
        // this.broadcastSpinner = false;
        console.log('theresponse ', data)
        this.audioMessage = data
      } catch (error) {
        console.log(error)
      }
      try {
        await this.$axios.post(
          `/communications/v3/class/student/${this.class_student_id}/teacher/chat/post/`,
          {
            message: '',
            topic: '',
            files: [this.audioMessage],
            reply_post_id: this.reply.id ? this.reply.id : '',
          }
        )
        this.input = ''
        this.reply = {}
        this.messageFiles = []
        this.audioMessage = ''

        this.$fetch()
        this.getSingleConversation(this.singleConversation)
      } catch (error) {}
      // const newFile = this.dataURLtoFile(this.audiofile, "newAudio");
      // console.log("with local", newFile);
    },
    startRecord() {
      this.mediaRecorder.start()
      console.log(this.mediaRecorder.state)
    },

    stopRecord() {
      this.mediaRecorder.stop()
      console.log(this.mediaRecorder.state)
    },

    async startAudio() {
      this.showAudio = true
      if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.')

        const constraints = { audio: true }
        let chunks = []

        try {
          await navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
              this.media = stream
              this.mediaRecorder = new MediaRecorder(stream)
              this.mediaRecorder.ondataavailable = function (e) {
                chunks.push(e.data)
              }
              this.mediaRecorder.onstop = async function (e) {
                console.log(
                  'data available after MediaRecorder.stop() called.',
                  e
                )
                const blob = new Blob(chunks, {
                  type: 'audio/ogg; codecs=opus',
                })
                chunks = []
                const audioURL = window.URL.createObjectURL(blob)
                this.audiofile = audioURL
                await this.recordingStopped(this.audiofile)

                console.log('audiofile', this.audiofile)
              }.bind(this)
            })
          this.startRecord()
        } catch (error) {
          console.log('The following error occured: ' + error)
        }
      } else {
        console.log('getUserMedia not supported on your browser!')
      }
    },
    stopAudio() {
      this.showaudioComponent = true

      this.media.getTracks().forEach((track) => track.stop())
      this.showAudio = false
      this.stopRecord()
      console.log('stopped')
    },
    async recordingStopped(blob) {
      console.log('blobv is', blob)
      const readBlobAsBase64 = (blob) => {
        const reader = new FileReader()
        return new Promise((resolve) => {
          reader.addEventListener('load', function () {
            resolve(reader.result)
          })
          reader.readAsDataURL(blob)
        })
      }

      try {
        audioURL = await readBlobAsBase64(blob)
        console.log('audioURL base64', audioURL)
      } catch (e) {
        console.warn(e.message)
      }

      console.log('here', this.audioURL) // Audio blob as base 64 string
    },
  },
}
