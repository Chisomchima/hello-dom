

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
// const routeName = ['sms-id-lms-subjects-subject-lesson-add']

export default {
    // async beforeRouteLeave(_to, _from, next) {
    //     // console.log(this.$dexie)
    //     if (!(this.$route.query.local_draft_id && this.$route.query.local_draft_id.length > 0)) {
    //         await this.$dexie.formData.add({
    //             id: uuidv4(),
    //             data: this.$data,
    //             page: this.$route.name,
    //             params: this.$route.params
    //         })
    //         next();
    //     } else {
    //         next();
    //     }
    // },
    methods: {
        async storeDataInIndex() {
            if (!(this.$route.query.local_draft_id && this.$route.query.local_draft_id.length > 0)) {
                return await this.$dexie.formData.add({
                    id: uuidv4(),
                    data: this.$data,
                    page: this.$route.name,
                    params: this.$route.params
                })
            }
        },
        async deleteDataFromDb(id) {
            if (!(this.$route.query.local_draft_id && this.$route.query.local_draft_id.length > 0)) {
                await this.$dexie.formData.delete(id)
            } else {
                await this.$dexie.formData.delete(this.$route.query.local_draft_id)
            }
        }
    }
}

    // created() {
    //     setTimeout(async () => {
    //         try {
    //             if (this.$route.query.local_draft_id && this.$route.query.local_draft_id.length > 0) {
    //                 const data = await this.$dexie.formData.get({ id: this.$route.query.local_draft_id });
    //                 if (data) {
    //                     console.table(data)
    //                     Object.assign(this.$data, JSON.parse(data.data))

    //                     this.$forceUpdate();
    //                     // this.$data = JSON.parse(data.data)
    //                     // this.$dexie.formData.delete(data.id)
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }, 2000)

    // }
// }