<template>
  <div>
    <ModalWrapper title="Add Encounter">
      <ValidationObserver ref="form">
        <form>
          <h5>in progress</h5>
          <!-- <div class="form-group">
            <ValidationProviderWrapper
              :name="'Grade Book Entry'"
              :rules="['required']"
            >
              <BaseInput></BaseInput>
            </ValidationProviderWrapper>
          </div>
          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Entry Type'"
              :rules="['required']"
            >
              <BaseInput></BaseInput>
            </ValidationProviderWrapper>
          </div>
          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Obtainable Score'"
              :rules="['required']"
            >
              <BaseInput type="number"></BaseInput>
            </ValidationProviderWrapper>
          </div>

          <div class="form-group">
            <ValidationProviderWrapper
              :name="'Academic Period'"
              :rules="['required']"
            >
              <VSelect
                label="name"
              ></VSelect>
            </ValidationProviderWrapper>
          </div> -->
        </form>
      </ValidationObserver>
    </ModalWrapper>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>