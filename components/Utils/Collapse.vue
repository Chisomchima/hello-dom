<template>
    <div>
        <Accordion :activeIndex="0">
            <AccordionTab>
                <template #header>
                    <p class="mb-0 text-14">{{ title }}</p>
                </template>
                <div v-if="Object.keys(comments).length > 0">
                    <div v-if="comments.log.specimen_taken_at" class="shadow-sm rounded p-2 my-2">
                        <p style="white-space: pre-line;" class="mb-2 text-14"><span class="text-grey">Collected specimen: </span>{{ comments.specimen_taken_comments }}</p>
                        <div class="d-flex justify-content-between">
                            <small>{{ comments.log.specimen_taken_comments }}</small>
                            <small>{{ dateConv(comments.log.specimen_taken_at) }}</small>
                        </div>
                    </div>
                    <div v-if="comments.log.specimen_recieved_at" class="shadow-sm rounded p-2 my-2">
                        <p class="mb-2 text-14"><span class="text-grey">Recieved specimen: </span>{{ comments.specimen_recieved_comments }}</p>
                        <div class="d-flex justify-content-between">
                            <small>{{ comments.log.specimen_recieved_comments }}</small>
                            <small>{{ dateConv(comments.log.specimen_recieved_at) }}</small>
                        </div>
                    </div>
                    <div v-if="comments.log.result_submitted_at" class="shadow-sm rounded p-2 my-2">
                        <p class="mb-2 text-14"><span class="text-grey">Result submitted: </span>{{ comments.log.result_submitted_comments }}</p>
                        <div class="d-flex justify-content-between">
                            <small>{{ comments.log.result_submitted_by }}</small>
                            <small>{{ dateConv(comments.log.result_submitted_at) }}</small>
                        </div>
                    </div>
                </div>
                <div class="shadow-sm rounded p-2 my-3" v-else>
                    <p class="mb-0 text-16 text-center">No comments recorded.</p>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { DateTime } from 'luxon';
export default {
    components: {
        Accordion,
        AccordionTab
    },
    methods: {
        dateConv(x){
            if(typeof(x) == 'string'){
                return DateTime.fromISO(x).toFormat('yyyy-LL-dd T')
            }
        }
    },
    props: {
        title: {
            required: true,
            type: String,
            default: () => ('Comments')
        },
        comments: {
            type: Object,
            required: true,
            default: () => ({})
        }
    }
}

</script>

<style>
/* {
  "specimen_taken_by": "Dimeji James",
  "specimen_taken_at": "2022-10-04T16:11:04Z",
  "specimen_taken_comments": "fhgjhkl",
  "specimen_recieved_by": "Dimeji James",
  "specimen_recieved_at": "2022-10-05T13:09:58Z",
  "specimen_recieved_comments": "",
  "result_submitted_by": "Dimeji James",
  "result_submitted_at": "2022-11-01T14:13:31Z",
  "result_submitted_comments": ""
} */
</style>