<template>
    <div>
        <!-- <h1>school dashboard {{ $route.params.schoolId }}</h1> -->
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="page-heading mb-2 mr-2">{{ currentRouteName }}</div>

            <div class="d-flex align-items-center mb-2">
                <div class="mr-2">
                    <button
                        class="
                            btn btn-borderless-primary
                            line-height-0
                            d-flex
                            align-items-center
                            fs14
                            py-2
                            px-3
                        "
                    >
                        Filter
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                            class="iconify ml-1"
                            data-inline="false"
                            data-icon="bi:filter"
                            style="transform: rotate(360deg)"
                        >
                            <g fill="currentColor">
                                <path
                                    d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                                ></path>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="custom-card-tabs mt-1">
                <ul id="pills-tab" class="nav" role="tablist">
                    <li
                        class="nav-item"
                        role="presentation"
                        @click="changeProgress('not_started')"
                    >
                        <a
                            id="pills-Not-Started-tab"
                            class="nav-link active"
                            data-toggle="pill"
                            href="#pills-Not-Started"
                            role="tab"
                            aria-controls="pills-Not-Started"
                            aria-selected="false"
                            >Not Started</a
                        >
                    </li>
                    <li
                        class="nav-item"
                        role="presentation"
                        @click="changeProgress('in_progress')"
                    >
                        <a
                            id="pills-Submitted-tab"
                            class="nav-link"
                            data-toggle="pill"
                            href="#pills-Submitted"
                            role="tab"
                            aria-controls="pills-Submitted"
                            aria-selected="false"
                            >In Progress</a
                        >
                    </li>
                    <li
                        class="nav-item"
                        role="presentation"
                        @click="changeProgress('completed')"
                    >
                        <a
                            id="pills-Graded-tab"
                            class="nav-link"
                            data-toggle="pill"
                            href="#pills-Graded"
                            role="tab"
                            aria-controls="pills-Graded"
                            aria-selected="false"
                            >Completed</a
                        >
                    </li>
                    <li
                        class="nav-item"
                        role="presentation"
                        @click="changeProgress('all')"
                    >
                        <a
                            id="pills-All-tab"
                            class="nav-link"
                            data-toggle="pill"
                            href="#pills-All"
                            role="tab"
                            aria-controls="pills-All"
                            aria-selected="true"
                            >All</a
                        >
                    </li>
                </ul>
            </div>
            <div id="pills-tabContent" class="tab-content card-body">
                <div
                    id="pills-All"
                    class="tab-pane fade active show"
                    role="tabpanel"
                    aria-labelledby="pills-All-tab"
                >
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-between
                            mb-4
                        "
                    >
                        <div class="filter-wrapper mr-2">
                            <div class="search-input student-filter-input">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    focusable="false"
                                    width="1em"
                                    height="1em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 32 32"
                                    class="iconify icon"
                                    data-inline="false"
                                    data-icon="carbon:search"
                                    style="transform: rotate(360deg)"
                                >
                                    <path
                                        d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <input
                                    v-model="searchInput"
                                    type="text"
                                    class="form-control rounded-pill w-100"
                                    placeholder="Search"
                                    @keyup="searchExercise"
                                />
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="font-family_brown fs14 text-black">
                                Sort by:
                            </div>
                            <div class="student-filter-input ml-2">
                                <select class="form-control" v-model="sortBy">
                                    <option value="asc">
                                        Newest to Oldest
                                    </option>
                                    <option value="dsc">
                                        Oldest to Newest
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="lessonsToDisplay.length < 1">
                        <UtilsEmptyState text="Lessons Unavailable" />
                    </div>
                    <div v-else class="row">
                        <student-lesson-card
                            v-for="(lesson, i) in lessonsToDisplay"
                            :key="i"
                            :image="lesson.class_subject.icon_data.icon"
                            :color="
                                lesson.class_subject.icon_data.icon_bg_color
                            "
                            :lesson="lesson"
                        />
                    </div>
                </div>
                <div
                    id="pills-Not-Started"
                    class="tab-pane fade"
                    role="tabpanel"
                    aria-labelledby="pills-Not-Started-tab"
                >
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-between
                            mb-4
                        "
                    >
                        <div class="filter-wrapper mr-2">
                            <div class="search-input student-filter-input">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    focusable="false"
                                    width="1em"
                                    height="1em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 32 32"
                                    class="iconify icon"
                                    data-inline="false"
                                    data-icon="carbon:search"
                                    style="transform: rotate(360deg)"
                                >
                                    <path
                                        d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <input
                                    v-model="searchInput"
                                    type="text"
                                    class="form-control rounded-pill w-100"
                                    placeholder="Search"
                                    @keyup="searchExercise"
                                />
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="font-family_brown fs14 text-black">
                                Sort by:
                            </div>
                            <div class="student-filter-input ml-2">
                                <select class="form-control" v-model="sortBy">
                                    <option value="asc">
                                        Newest to Oldest
                                    </option>
                                    <option value="dsc">
                                        Oldest to Newest
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="lessonsToDisplay.length < 1">
                        <UtilsEmptyState text="Lessons Unavailable" />
                    </div>
                    <div v-else class="row">
                        <student-lesson-card
                            v-for="(lesson, i) in lessonsToDisplay"
                            :key="i"
                            :image="lesson.class_subject.icon_data.icon"
                            :color="
                                lesson.class_subject.icon_data.icon_bg_color
                            "
                            :lesson="lesson"
                        />
                    </div>
                </div>
                <div
                    id="pills-Submitted"
                    class="tab-pane fade"
                    role="tabpanel"
                    aria-labelledby="pills-Submitted-tab"
                >
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-between
                            mb-4
                        "
                    >
                        <div class="filter-wrapper mr-2">
                            <div class="search-input student-filter-input">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    focusable="false"
                                    width="1em"
                                    height="1em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 32 32"
                                    class="iconify icon"
                                    data-inline="false"
                                    data-icon="carbon:search"
                                    style="transform: rotate(360deg)"
                                >
                                    <path
                                        d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <input
                                    v-model="searchInput"
                                    type="text"
                                    class="form-control rounded-pill w-100"
                                    placeholder="Search"
                                    @keyup="searchExercise"
                                />
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="font-family_brown fs14 text-black">
                                Sort by:
                            </div>
                            <div class="student-filter-input ml-2">
                                <select class="form-control" v-model="sortBy">
                                    <option value="asc">
                                        Newest to Oldest
                                    </option>
                                    <option value="dsc">
                                        Oldest to Newest
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="lessonsToDisplay.length < 1">
                        <UtilsEmptyState text="Lessons Unavailable" />
                    </div>
                    <div v-else class="row">
                        <student-lesson-card
                            v-for="(lesson, i) in lessonsToDisplay"
                            :key="i"
                            :image="lesson.class_subject.icon_data.icon"
                            :color="
                                lesson.class_subject.icon_data.icon_bg_color
                            "
                            :lesson="lesson"
                        />
                    </div>
                </div>
                <div
                    id="pills-Graded"
                    class="tab-pane fade"
                    role="tabpanel"
                    aria-labelledby="pills-Graded-tab"
                >
                    <div
                        class="
                            d-flex
                            align-items-center
                            justify-content-between
                            mb-4
                        "
                    >
                        <div class="filter-wrapper mr-2">
                            <div class="search-input student-filter-input">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    aria-hidden="true"
                                    focusable="false"
                                    width="1em"
                                    height="1em"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 32 32"
                                    class="iconify icon"
                                    data-inline="false"
                                    data-icon="carbon:search"
                                    style="transform: rotate(360deg)"
                                >
                                    <path
                                        d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <input
                                    v-model="searchInput"
                                    type="text"
                                    class="form-control rounded-pill w-100"
                                    placeholder="Search"
                                    @keyup="searchExercise"
                                />
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="font-family_brown fs14 text-black">
                                Sort by:
                            </div>
                            <div class="student-filter-input ml-2">
                                <select class="form-control" v-model="sortBy">
                                    <option value="asc">
                                        Newest to Oldest
                                    </option>
                                    <option value="dsc">
                                        Oldest to Newest
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div v-if="lessonsToDisplay.length < 1">
                        <UtilsEmptyState text="Lessons Unavailable" />
                    </div>
                    <div v-else class="row">
                        <student-lesson-card
                            v-for="(lesson, i) in lessonsToDisplay"
                            :key="i"
                            :image="lesson.class_subject.icon_data.icon"
                            :color="
                                lesson.class_subject.icon_data.icon_bg_color
                            "
                            :lesson="lesson"
                        />
                    </div>
                </div>
            </div>
        </div>

        <b-pagination
            v-model="currentPage"
            :total-rows="totalPages"
            hide-goto-end-buttons
            :per-page="perPage"
            align="center"
            class="mt-3"
            size="sm"
            @change="changePage"
        ></b-pagination>
    </div>
</template>

<script>
import { debounce } from 'lodash'
import studentLessonCard from '~/components/student/studentLessonCard'
export default {
    name: 'Lessons',
    components: {
        studentLessonCard,
    },
    // layout: 'authWithoutTopbar',
    data() {
        return {
            currentPage: 1,
            totalPages: 0,
            perPage: 18,
            lessons: [],
            lessonsToDisplay: [],
            progress: 'not_started',
            sortBy: 'dsc',
            searchInput: '',
        }
    },
    async fetch() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start()
        })
        // this.$nuxt.$loading.start()
        const school = this.$store.getters['student/getSchoolByCode'](
            this.$route.params.schoolId
        )
        const lessons = await this.$axios.$get(
            `lms/v2/school/${school.id}/${this.$store.state.student.currentAcademicYear}/lessons/?status=all&page=${this.currentPage}&progress=${this.progress}&order=${this.sortBy}`
        )
        this.lessons = lessons.data.results
        this.lessonsToDisplay = lessons.data.results
        this.currentPage = lessons.data.page === 0 ? 1 : lessons.data.page
        this.totalPages = lessons.data.total_pages * this.perPage
        this.$nextTick(() => {
            this.$nuxt.$loading.finish()
            // this.$nuxt.$loading.start()
        })
    },
    computed: {
        currentRouteName() {
            const nameArray = this.$route.name.split('-')
            return (
                this.$route.name
                    .split('-')
                    [nameArray.length - 1].charAt(0)
                    .toUpperCase() +
                this.$route.name.split('-')[nameArray.length - 1].slice(1)
            )
        },
    },
    watch: {
        sortBy() {
            this.$fetch()
        },
        currentPage() {
            this.$fetch()
        },
    },
    methods: {
        changePage(e) {
            this.currentPage = e
        },
        searchExercise: debounce(async function () {
            const school = this.$store.getters['student/getSchoolByCode'](
                this.$route.params.schoolId
            )
            const lessons = await this.$axios.$get(
                `lms/v2/school/${school.id}/${this.$store.state.student.currentAcademicYear}/lessons/?progress=${this.progress}&name=${this.searchInput}`
            )
            this.lessons = lessons.data.results
            this.lessonsToDisplay = lessons.data.results
            this.currentPage = lessons.data.page === 0 ? 1 : lessons.data.page
            this.totalPages = lessons.data.total_pages * this.perPage
            // const searchItems = this.lessons.filter((item) => {
            //     return item.name
            //         .toLowerCase()
            //         .includes(this.searchInput.toLowerCase())
            // })
            // this.lessonsToDisplay = searchItems
        }, 500),
        changeProgress(type) {
            this.currentPage = 1
            this.progress = type
            this.$fetch()
        },
        filterLessons(status) {
            if (status !== 'all')
                return this.lessons.filter((lesson) => lesson.status === status)

            return this.lessons
        },
        slugify(text) {
            return text
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '') // eslint-disable-line
                .replace(/\-\-+/g, '-') // eslint-disable-line
                .replace(/^-+/, '')
                .replace(/-+$/, '')
        },
    },
}
</script>

<style scoped>
.fs14 {
    font-size: 14px;
}

@media screen and (max-width: 991px) {
    .fs14 {
        font-size: 12px;
    }
}
</style>
