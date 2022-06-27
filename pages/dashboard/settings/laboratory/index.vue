<template>
    <div>
        <h4 class="text-20 page-heading">Settings</h4>
        <div class="row">
        <div v-for="(menu, index) in menuOptions" :key="index" @click="goToSettings(index)" class="
              pointer
              d-flex
              flex-column
              col-md-5 col-sm-5 col-lg-3
              text-center
              bg-info
              text-white
              p-3
              card
              mx-3
              my-2
            ">
                <div style="min-width: 18px" class="text-center mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="60" height="60"
                            preserveAspectRatio="xMidYMid meet" :viewBox="menu.viewBox">
                            <path v-for="(path, index) in menu.icon" :key="index" fill="currentColor" :d="path" />
                        </svg>
                    </div>

                    {{ menu.name }}
                </div>
            </div>
        </div>
</template>

<script>
export default {
    layout: "dashboard",
    data() {
        return {
            menuOptions: [
                {
                    name: "Service Centers",
                    icon: [
                        "m11 21l-4-2.2v-4.5l4-2.2l4 2.2v4.5L11 21zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1v2.2zM6 30l-4-2.2v-4.5L6 21l4 2.2v4.5L6 30zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1v2.2zM16 30l-4-2.2v-4.5l4-2.2l4 2.2v4.5L16 30zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1v2.2zM26 30l-4-2.2v-4.5l4-2.2l4 2.2v4.5L26 30zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1v2.2zm.6-15L22 14.2V9.4l3-1.7V3.2L21 1l-4 2.2v4.5l3 1.7v4.7l-2.6-2.6L16 13l5 5l5-5l-1.4-1.4zM19 4.4l2-1.1l2 1.1v2.2l-2 1.1l-2-1.1V4.4z",
                    ],
                    viewBox: "0 0 32 32",
                },
                {
                    name: "Service Configurations",
                    icon: [
                        "m14.17 13.71l1.4-2.42c.09-.15.05-.34-.08-.45l-1.48-1.16c.03-.22.05-.45.05-.68s-.02-.46-.05-.69l1.48-1.16c.13-.11.17-.3.08-.45l-1.4-2.42c-.09-.15-.27-.21-.43-.15l-1.74.7c-.36-.28-.75-.51-1.18-.69l-.26-1.85a.364.364 0 0 0-.35-.29h-2.8c-.17 0-.32.13-.35.3L6.8 4.15c-.42.18-.82.41-1.18.69l-1.74-.7c-.16-.06-.34 0-.43.15l-1.4 2.42c-.09.15-.05.34.08.45l1.48 1.16c-.03.22-.05.45-.05.68s.02.46.05.69l-1.48 1.16c-.13.11-.17.3-.08.45l1.4 2.42c.09.15.27.21.43.15l1.74-.7c.36.28.75.51 1.18.69l.26 1.85c.03.16.18.29.35.29h2.8c.17 0 .32-.13.35-.3l.26-1.85c.42-.18.82-.41 1.18-.69l1.74.7c.16.06.34 0 .43-.15zM8.81 11c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2zm13.11 7.67l-.96-.74c.02-.14.04-.29.04-.44c0-.15-.01-.3-.04-.44l.95-.74c.08-.07.11-.19.05-.29l-.9-1.55c-.05-.1-.17-.13-.28-.1l-1.11.45c-.23-.18-.48-.33-.76-.44l-.17-1.18a.216.216 0 0 0-.21-.2h-1.79c-.11 0-.21.08-.22.19l-.17 1.18c-.27.12-.53.26-.76.44l-1.11-.45a.23.23 0 0 0-.28.1l-.9 1.55c-.05.1-.04.22.05.29l.95.74a3.145 3.145 0 0 0 0 .88l-.95.74c-.08.07-.11.19-.05.29l.9 1.55c.05.1.17.13.28.1l1.11-.45c.23.18.48.33.76.44l.17 1.18c.02.11.11.19.22.19h1.79c.11 0 .21-.08.22-.19l.17-1.18c.27-.12.53-.26.75-.44l1.12.45c.1.04.22 0 .28-.1l.9-1.55c.06-.09.03-.21-.05-.28zm-4.29.16a1.35 1.35 0 1 1 .001-2.701a1.35 1.35 0 0 1-.001 2.701z",
                    ],
                    viewBox: "0 0 24 24",
                },
            ],
        }
    },

    methods: {
        goToSettings(i) {
            // this.$router.push('laboratory/service-center')
        }
    }
} 
</script>

<style scoped>
.margin-fix {
    margin: 2rem 0 1rem;
    background: #fff;
    min-height: 70vh;
}
</style>