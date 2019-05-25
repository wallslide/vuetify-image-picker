<template>
  <v-container grid-list-xl>
    <v-snackbar v-model="snackbar" :timeout="5000" :top="true" :color="snackColor">
      {{ snackMessage }}
      <v-btn color="white" flat @click="snackbar = false">消す</v-btn>
    </v-snackbar>
    <image-input
      :value="value"
      :uid="uid"
      :max="max"
      @input="$emit('input', $event)"
      @errorMessage="onErrorMessage"
    >
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
          >{{ numSelected }}/{{ max }}枚</v-flex>
        </v-layout>
        <v-layout justify-start wrap>
          <v-flex xs12 sm6>
            <v-btn :disabled="disableAddButton" block color="success">
              <v-icon left>add_photo_alternate</v-icon>イメージ追加
            </v-btn>
          </v-flex>
          <v-flex xs12 sm6>
            <v-btn block color="red" outline @click.stop="clearImages">
              <v-icon left>clear</v-icon>クリア
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
  $_veeValidate: {
    name () {
      return this.name
    }
  },
  components: {
    ImageInput
  },
  props: {
    value: {
      type: Array,
      default: null
    },
    // for validation purposes, name of the input
    name: {
      type: String,
      required: true
    },
    // id of user, appended to images to prevent collisions
    uid: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      default: null
    },
    activeImageUploads: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      snackbar: false,
      snackMessage: '',
      snackColor: 'info',
      imageUploadingStates
    }
  },
  computed: {
    disableAddButton () {
      return !!this.max && !!this.value && this.value.length >= this.max
    },
    numSelected () {
      return this.value ? this.value.length : 0
    }
  },
  methods: {
    clearImages () {
      this.$emit('input', [])
      // this.$emit('clearImageUploads')
      // Also clear error messages
      this.snackMessage = 'イメージをクリアしました'
      this.snackColor = 'info'
      this.snackbar = true
    },
    // Pass through to parent
    onErrorMessage (errorMessage) {
      this.snackMessage = errorMessage
      this.snackColor = 'error'
      this.snackbar = true
    }
  }
}
</script>
