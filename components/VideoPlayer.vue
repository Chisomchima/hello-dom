<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      player: null,
      options: {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: ''
            // type: 'video/mp4'
          }
        ]
      }
    }
  },
  watch: {
    src: {
      handler() {
        this.options.sources[0].src = this.src
      },
      immediate: true
    }
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log('onPlayerReady', this)
      }
    )
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods: {
    initPlayer() {
      this.player = videojs(
        this.$refs.videoPlayer,
        this.options,
        function onPlayerReady() {
        }
      )
    }
  }
}
</script>
