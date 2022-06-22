<template>
  <div class="py-3 px-3">
    <main v-if="!['asne-details', 'asne-confirmation'].includes($route.name)">
      <section class="d-flex px-3 mb-3 justify-content-between">
        <div class="">
          <img :src="require('~/assets/img/logo.png')" alt="" />
        </div>
        <div class="images">
          <img :src="require('~/assets/img/asne_logo.webp')" />
        </div>
      </section>
      <div class="card mb-4">
        <Steps :model="items" :readonly="true"> </Steps>
      </div>
    </main>

    <NuxtChild keep-alive />
    <!-- <div>
      <b-button @click="$router.push('/asne/personal')"> personal</b-button>
      <b-button @click="$router.push('/asne/school')"> school</b-button>
      <b-button @click="$router.push('/asne/code')"> code</b-button>
      <b-button @click="$router.push('/asne/confirmation')"> School</b-button>
      <b-button @click="$router.push('/asne/error')"> error</b-button>
      <b-button class="m-3" @click="removeNumber"> remove</b-button>
    </div> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
import Steps from 'primevue/steps'
export default {
  components: {
    Steps,
  },
  data() {
    return {
      items: [
        {
          label: 'Personal',
          to: '/asne/personal',
        },
        {
          label: 'School',
          to: '/asne/school',
        },
        {
          label: 'Raffle code',
          to: '/asne/code',
        },
      ],
      formObject: {},
    }
  },
  methods: {
    removeNumber() {
      alert()
      const steps = document.querySelectorAll('.p-steps-number')
      steps.forEach((step) => {
        console.log(step)
        step.style.display = 'none'
      })
    },
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field]
      }

      this.$router.push(this.items[event.pageIndex + 1].to)
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to)
    },
    complete() {
      this.$toast.add({
        severity: 'success',
        summary: 'Order submitted',
        detail:
          'Dear, ' +
          this.formObject.firstname +
          ' ' +
          this.formObject.lastname +
          ' your order completed.',
      })
    },
  },
}
</script>

<style scoped>
.p-steps-number {
  color: red;
}
.p-steps-item {
  color: red;
}
img {
  height: 3rem;
}
</style>
