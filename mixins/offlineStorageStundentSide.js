import { compact } from 'lodash'
import { storeLocally } from '@/utils/storage.worker'


function onBeforeUnload(e) {
    e.preventDefault()
    e.returnValue = ''
}


export default {
    data() {
        return {
            offlineRecords: [],
        }
    },
    methods: {
        storeInCache(contentUrls) {
            return new Promise((resolve, reject) => {
                window.caches.open('server-content').then((cache) => {
                    cache
                        .addAll(contentUrls)
                        .then(() => {
                            resolve(true)
                            // this.$bvModal.hide('download-content')
                            // console.log('done caching')
                        })
                        .catch((err) => {
                            reject(err)
                            console.log(err)
                        })
                })
            })
        },
        addToCache(e) {
            this.$toast({
                type: 'info',
                text: "Downloading Content"
            })
            // this.$bvModal.show('download-content')
            const school = this.$store.getters['student/getSchoolByCode'](
                this.$route.params.schoolId
            )
            this.$axios.$get(
                `lms/v2/school/${school.id}/${this.$store.state.student.currentAcademicYear}/lesson/${e.id}`
            ).then((data) => {
                // debugger
                const notIncluded = ['free_text', 'youtube_embed']
                // console.log(data.data.content);
                const contentUrls = compact(
                    data.data.content.map((item) =>
                        notIncluded.includes(item.type) ? '' : item.url
                    )
                )
                window.addEventListener('beforeunload', onBeforeUnload, false)

                storeLocally(contentUrls, this.$route.params.schoolId, this.$route.params.subject, e.id)
            })

            // get the content URL


            // alert(JSON.stringify(e))
        },
        searchRecord(e) {
            const data = this.offlineRecords.find(item => item.lesson === e);
            if (data) {
                return true
            }
            return false
        },
    },
    // async created() {
    //     this.offlineRecords = await this.$dexie.syncedLessonContent.filter((item) => item.school === this.$route.params.schoolId).toArray()

    // },
}