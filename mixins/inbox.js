export default {
  computed: {
    schoolId() {
      return this.$store.state.administration.school.id
    },
  },
  watch: {
    showAttachmentOptions: {
      handler() {
        if (!this.showAttachmentOptions) {
          this.showImageEditor = this.showAttachmentOptions
        }
      },
    },
  },
  methods: {
    scrollToBottomOfChat() {
      const objDiv = document.getElementById('chatView')

      setTimeout(() => {
        objDiv.scrollTop = objDiv.scrollHeight
      }, 100)
    },
    handleFileAttachment(e) {
      console.log(e)
    },
    toggleCamera() {
      this.showAttachmentOptions = false
      this.demo = !this.demo
    },
    attachFile(e) {
      switch (e) {
        case 'uploadImage':
          this.fileAttachmentAccept = 'image/*'
          this.showImageEditor = true

          break
        case 'takeImage':
          this.showInboxCamera = true
          break
        case 'uploadDocument':
          this.fileAttachmentAccept =
            '.txt, text/plain, .doc, .docx, application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf'
          this.showImageEditor = true
          break
        default:
      }
    },
    showattachFile() {
      this.showAttachmentOptions = !this.showAttachmentOptions
    },
    async onChange2(event) {
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )
      if (event.target.files.length) {
        this.messageFileSpinner = true
        const file = event.target.files[0]
        const broadcastForm = new FormData()
        broadcastForm.append('name', file.name)
        broadcastForm.append('file', file)
        broadcastForm.append('type', file.type)
        try {
          const {
            data: { data },
          } = await this.$axios.post(
            `/chats/v2/school/${school.id}/file/upload/`,
            broadcastForm
          )
          this.messageFiles.push(data)
        } catch (error) {
          console.error(error)
        } finally {
          this.$refs.fileInput2.value = null
          this.messageFileSpinner = false
        }
      }
    },
    async sendaudioInbox() {
      const school = this.$store.getters['student/getSchoolByCode'](
        this.$route.params.schoolId
      )
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
          `/chats/v2/school/${school.id}/file/upload/`,
          broadcastForm
        )
        // this.broadcastSpinner = false;
        console.log('theresponse ', data)
        this.audioMessage = data
      } catch (error) {
        console.log(error)
      }
      try {
        const {
          data: { data },
        } = await this.$axios.post(
          `/chats/v2/school/${school.id}/student/${this.studentAdmissionId}/chat/${this.chatId}/post/`,
          {
            message: '',
            topic: '',
            files: [this.audioMessage],
            reply_post_id: this.reply.id ? this.reply.id : '',
          }
        )
        console.log('res', data.results)
        this.currentChat = data.results.reverse()
        this.scrollToBottomOfChat()

        this.input = ''
        this.reply = {}
        this.audioMessage = ''

        this.messageFiles = []
        this.getonGoingConversations()
      } catch (error) {}
    },
  },
}
