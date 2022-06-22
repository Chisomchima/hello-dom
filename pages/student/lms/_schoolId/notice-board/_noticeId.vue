<template>
    <div class="conatiner">
        <div class="page-back-navigation mb-3">
            <a href="#">
                <span class="pr-1">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.8337 10H4.16699"
                            stroke="#1070B7"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M10.0003 15.8334L4.16699 10L10.0003 4.16671"
                            stroke="#1070B7"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </span>
                <span
                    @click="
                        $router.push(
                            `/student/lms/${$route.params.schoolId}/notice-board`
                        )
                    "
                    >Noticeboard</span
                >
            </a>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <img
                            class="w-100 rounded object-fit-cover"
                            height="170"
                            :src="details.image"
                        />
                    </div>
                    <div class="col-md-8">
                        <div
                            class="
                                d-flex
                                flex-column
                                justify-content-between
                                h-100
                            "
                        >
                            <div
                                class="
                                    fs-24
                                    font-family_brown
                                    font-weight-bold
                                    text-dark
                                    mb-3
                                "
                            >
                                {{ details.title }}
                            </div>
                            <div>
                                <div class="fs-12 text-light">Posted on</div>
                                <div class="fs-14 text-dark">
                                    {{ formatDate(details.publish_at) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div
                    class="post-details-content"
                    v-html="details.content"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns/esm'
export default {
    name: 'NoticeBoardDetails',
    // layout: 'authWithoutTopbar',
    data() {
        return {
            details: {},
        }
    },
    async fetch() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        const school = this.$store.getters['student/getSchoolByCode'](
            this.$route.params.schoolId
        )
        const { data } = await this.$axios.$get(
            `schools/v3/${school.id}/noticeboard/${this.$route.params.noticeId}`
        )
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
            this.details = data
        })
        
    },
    methods: {
        formatDate(date) {
            return format(new Date(date), 'dd/MM/yyyy')
        },
    },
}
</script>
