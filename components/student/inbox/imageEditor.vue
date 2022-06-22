<!-- <template>
  <div>
    <tui-image-editor ... @addText="onAddText" @objectMoved="onObjectMoved">
    </tui-image-editor>
  </div>
</template>

<script>
import 'tui-color-picker/dist/tui-color-picker.css'
import 'tui-image-editor/dist/tui-image-editor.css'
import { ImageEditor } from '@toast-ui/vue-image-editor'

export default {
  components: {
    'tui-image-editor': ImageEditor,
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        // for tui-image-editor component's "options" prop
        cssMaxWidth: 700,
        cssMaxHeight: 500,
      },
    }
  },
  methods: {
    onAddText(pos) {
      alert(pos)
    },
    onObjectMoved(props) {
      alert(props)
    },
  },
}
</script>

<style lang="scss" scoped></style> -->
