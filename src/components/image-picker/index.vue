<template>
  <v-container grid-list-xl>
    <v-snackbar v-model="snackbar" :timeout="5000" :top="true" :color="snackColor">
      {{ snackMessage }}
      <v-btn dark flat icon @click="snackbar = false">
        <v-icon left>clear</v-icon>
      </v-btn>
    </v-snackbar>
    <image-input :value="value" @input="checkNewImageArray">
      <div slot="activator">
        <v-layout v-if="value.length === 0">
          <v-flex xs4 md3>
            <img src="@/assets/placeholder-img.jpg" width="100%" height="100%">
          </v-flex>
        </v-layout>
        <v-layout v-else wrap>
          <v-flex v-for="avatar in value" :key="avatar.key" xs4 md3>
            <v-card>
              <v-img :contain="true" :src="avatar.imageURL" aspect-ratio="1"/>
              <v-progress-linear v-if="avatar.uploaded" :value="100" color="success"/>
              <template v-else-if="!!activeImageUploads[avatar.key]">
                <v-progress-linear
                  v-if="activeImageUploads[avatar.key].state === imageUploadingStates.NEW"
                  :indeterminate="true"
                />
                <v-progress-linear
                  v-else-if="activeImageUploads[avatar.key].state === imageUploadingStates.UPLOADING"
                  :value="activeImageUploads[avatar.key].progress"
                />
                <v-progress-linear
                  v-else-if="activeImageUploads[avatar.key].state === imageUploadingStates.ERROR"
                  :value="activeImageUploads[avatar.key].progress"
                  color="error"
                />
                <v-progress-linear
                  v-else-if="activeImageUploads[avatar.key].state === imageUploadingStates.COMPLETE"
                  :value="activeImageUploads[avatar.key].progress"
                  color="success"
                />
              </template>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-if="max !== null">
          <v-flex
            class="pt-0 pb-0 font-weight-light font-italic grey--text"
          >{{ numSelected }}/{{ max }}&nbsp;{{maxImagesUnit}}</v-flex>
        </v-layout>
        <v-layout justify-start wrap>
          <v-flex xs12 sm6>
            <v-btn :disabled="disableAddButton" block color="success">
              <v-icon left>add_photo_alternate</v-icon>
              {{addImagesLabel}}
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6>
            <v-btn block color="red" outline @click.stop="clearImages">
              <v-icon left>clear</v-icon>
              {{clearImagesLabel}}
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </image-input>
  </v-container>
</template>

<script>
import ImageInput from './image-input'
import { imageUploadingStates } from './enums'
export default {
  components: {
    ImageInput
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    maxSize: {
      type: Number,
      default: 8192 * 1024 // 8192 KB
    },
    activeImageUploads: {
      type: Object,
      default: () => ({})
    },
    exceedMaxImagesError: {
      type: String,
      default: 'The maximum number of images was exceeded by your selection.'
    },
    invalidFileTypeError: {
      type: String,
      default: "Invalid file type. Please upload 'png' or 'jpg' files."
    },
    fileSizeError: {
      type: String,
      default: 'One or more of the files you attempted to upload is larger than the single-file size limit.'
    },
    maxImagesUnit: {
      type: String,
      default: 'images'
    },
    clearedImagesMessage: {
      type: String,
      default: 'Cleared images'
    },
    clearImagesLabel: {
      type: String,
      default: 'clear'
    },
    addImagesLabel: {
      type: String,
      default: 'add images'
    },
    validImageTypes: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg']
    }
  },
  data () {
    return {
      snackbar: false,
      snackMessage: '',
      snackColor: 'info',
      imageUploadingStates,
      errors: []
    }
  },
  computed: {
    disableAddButton () {
      return !!this.max && !!this.value && this.value.length >= this.max
    },
    numSelected () {
      return this.value ? this.value.length : 0
    },
    currentError () {
      return this.errors.length > 0 ? this.errors[0] : null
    }
  },
  watch: {
    currentError (currentError) {
      if (currentError) {
        this.onErrorMessage(currentError)
      }
    }
  },
  methods: {
    clearImages () {
      this.$emit('input', [])
      // this.$emit('clearImageUploads')
      // Also clear error messages
      this.snackMessage = this.clearedImagesMessage
      this.snackColor = 'info'
      this.snackbar = true
    },
    // Pass through to parent
    onErrorMessage (errorMessage) {
      this.snackMessage = errorMessage
      this.snackColor = 'error'
      this.snackbar = true
    },
    checkNewImageArray (images) {
      this.errors = this.checkForErrors(images)
      if (this.errors.length === 0) {
        this.$emit('input', images)
      }
    },
    checkForErrors (images) {
      const totalFiles = images.length
      const matchString = `image/${this.validImageTypes.join('|')}`
      const errors = images.reduce(
        (errors, { imageFile }, index) => {
          if (this.max && totalFiles > this.max) {
            // check whether max number of images will be exceeded
            errors.add(this.exceedMaxImagesError)
          }
          if (!imageFile.type.match(matchString)) {
            // check whether the upload is an image
            errors.add(this.invalidFileTypeError)
          }
          if (imageFile.size > this.maxSize) {
            // check whether the size is greater than the size limit
            errors.add(this.fileSizeError)
          }

          return errors
        },
        new Set()
      )

      return Array.from(errors)
    }
  }
}
</script>
