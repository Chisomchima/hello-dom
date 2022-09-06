<template>
  <footer class="site-footer">
    <div class="container">
      <!-- <div class="footer-top">
        <div class="row">
          <div class="col-lg-2 mb-5 text-left text-sm-center text-lg-left">
            <img src="~/assets/img/logo-white.png" class="logo mx-auto" />
          </div>
          <div class="col-lg-2 col-md-3 col-6 mb-4 offset-lg-1">
            <div class="footer-title mb-4">About</div>
            <div>
              <div class="mb-2">
                <a href="#" class="footer-link">Our mission</a>
              </div>
              <div class="mb-2">
                <a href="#" class="footer-link">Our story</a>
              </div>
              <div class="mb-2">
                <a href="#" class="footer-link">Team Members</a>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-6 mb-4">
            <div class="footer-title mb-4">Learn</div>
            <div>
              <div class="mb-2">
                <a href="#" class="footer-link">Tutorials</a>
              </div>
              <div class="mb-2">
                <a href="#" class="footer-link">How it works</a>
              </div>
              <div class="mb-2"><a href="#" class="footer-link">F.A.Q</a></div>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-6 mb-4">
            <div class="footer-title mb-4">Stories</div>
            <div>
              <div class="mb-2"><a href="#" class="footer-link">Blog </a></div>
              <div class="mb-2">
                <a href="#" class="footer-link">Tech stories</a>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-6 mb-4">
            <div class="footer-title mb-4">Hire</div>
            <div>
              <div class="mb-2"><a href="#" class="footer-link">Career</a></div>
              <div class="mb-2">
                <a href="#" class="footer-link">Freelancers</a>
              </div>
              <div class="mb-2">
                <a href="#" class="footer-link">Trainee</a>
              </div>
              <div class="mb-2">
                <nuxt-link to="/contact-us" class="footer-link">Contact us</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="footer-bottom">
        <div class="d-flex align-items-center flex-wrap justify-content-between">
          <div class="mr-2 footer-link fs-14 mb-2 text-primary">
            © {{ new Date().getFullYear() }} All Rights Reserved
          </div>
          <div class="d-flex align-items-center flex-wrap mb-2">
            <div class="mr-4">
              <nuxt-link class="footer-link fs-14" to="/contact-us">Contact us</nuxt-link>
            </div>
            <div class="mr-4">
              <nuxt-link class="footer-link fs-14" to="/privacy-policy"
                >Privacy Policy</nuxt-link
              >
            </div>
            <div class="">
              <nuxt-link class="footer-link fs-14" to="/terms"
                >Terms and Conditions</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
