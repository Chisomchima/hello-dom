<template>
  <ModalWrapper id="showDetails" size="xl" title="Show Lab Order">
    <div class="row">
      <div class="col-md-12">
        <Accordion>
          <pre> {{ labOrder }}</pre>
          <!-- <AccordionTab header="Header I"> Content </AccordionTab>
          <AccordionTab header="Header II"> Content </AccordionTab>
          <AccordionTab header="Header III"> Content </AccordionTab> -->
        </Accordion>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
export default {
  components: {
    Accordion,
    AccordionTab,
  },
  props: {
    labOrder: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>