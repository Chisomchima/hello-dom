import db from "@/services/db"


function onBeforeUnload(e) {
    e.preventDefault()
    e.returnValue = ''
}

// eslint-disable-next-line require-await
export const storeLocally = async (contentUrls, schoolId, subject, lesson) => {
    // heavy computing goes here
    // console.log('Hello World! from worker thread');

    caches.open('server-content').then(async (cache) => {

        for (let index = 0; index < contentUrls.length; index++) {
            const element = contentUrls[index];
            const response = await cache.match(element);
            // console.log(response);
            if (response === undefined) {
                await cache.add(element);
                // console.log('done caching');
            }
        }
        await db.syncedLessonContent.add({
            school: schoolId,
            subject,
            lesson
        })

        self.removeEventListener('beforeunload', onBeforeUnload, false)
    })


    // window.caches.open('server-content').then((cache) => {
    //     cache
    //         .addAll(contentUrls)
    //         .then(() => {
    //             resolve(true)
    //             // this.$bvModal.hide('download-content')
    //             // console.log('done caching')
    //         })
    //         .catch((err) => {
    //             reject(err)
    //             console.log(err)
    //         })
    // })
}


export const storeLocallyForStudentLiveClass = (contentUrls) => new Promise((resolve) => {

    caches.open('server-content').then(async (cache) => {
        for (let index = 0; index < contentUrls.length; index++) {
            const element = contentUrls[index];
            const response = await cache.match(element);
            // console.log(response);
            if (response === undefined) {
                await cache.add(element);
                // console.log('done caching');
            }
        }
        resolve(true)
    })

})