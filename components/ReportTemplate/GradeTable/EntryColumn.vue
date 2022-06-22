<template>
  <b-td
    ref="entry"
    class="text-center p-4 pointer"
    :class="{ 'border-primary': toggle }"
    href="#"
    @dblclick="toggle = !toggle"
  >
    <div>
      <template v-if="toggle">
        <input
          v-model.number="localValue"
          style="width: 60px"
          class="form-control text-center mx-auto"
          type="number"
          :max="Number(max)"
          @input="$emit('input', localValue)"
        />
      </template>
      <template v-else>
        {{ localValue }}
      </template>
    </div>
    <b-tooltip
      :target="() => $refs['entry']"
      title="double click to edit field"
    ></b-tooltip>
  </b-td>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
      toggle: false,
    }
  },
  watch: {
    localValue(val) {
      if(this.localValue > Number(this.max)) {
        this.localValue = 0
        this.$toast({
          type: 'info',
          text: "value cannot be greater than scale score " + this.max,
        })
      }else{
        this.$emit('change', val)
      } 
    },
  },
}
</script>

<style scoped>
.custominput {
  width: 40px;
  overflow-x: hidden;
  border: none;
  box-shadow: none;
}

.custominput:focus {
  border-color: transparent;
  outline: none;
  overflow-x: hidden;
  border: none;
  box-shadow: none;
}
</style>
