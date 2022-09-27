<template>
  <div>
    <!-- <div style="background: #f5f6f7" class="pt-2 pb-4">
      <div class="text-14 theme-color-text text-center">
        Powered by Slate.ng &copy;
      </div>
    </div> -->
    <div class="auth-footer mx-auto px-md-5 text-14 px-3 bottom w-75">
          <div class="d-flex justify-content-between flex-wrap w-100">
            <div class="d-flex flex-wrap">
              <!-- <span class="click mr-2">
                <nuxt-link to="/support" class="summ auth-footer">
                  Support
                </nuxt-link> </span
              > -->

              <span class="click mx-2">
                <nuxt-link to="" class="auth-footer">
                  Privacy Policy
                </nuxt-link> </span
              ><span class="click ml-2">
                <nuxt-link to="" class="auth-footer">
                  Terms and Conditions
                </nuxt-link>
              </span>
            </div>
            <div class="auth-footer">
              © {{ new Date().getFullYear() }}, Powered by V3C Technologies, All
              Rights Reserved
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>