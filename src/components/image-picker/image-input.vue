<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator"/>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      ref="file"
      :name="uploadFieldName"
      multiple
      type="file"
      style="display:none"
      @change="onFileChange(
      $event.target.name, $event.target.files)"
    >
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  props: {
    // Use "value" here to enable compatibility with v-model
    value: {
      type: Array,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    // id of user, appended to images to prevent collisions
    uid: {
      type: String,
      required: true
    }
  },
  data: () => ({
    uploadFieldName: 'file'
  }),
  methods: {
    launchFilePicker () {
      this.$refs.file.click()
    },
    onFileChange (fieldName, fileList) {
      const fileArray = []

      // Convert from fileList to array
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i])
      }

      const newImages = fileArray.map((imageFile, index) => ({
        imageFile,
        imageURL: URL.createObjectURL(imageFile),
        name: imageFile.name,
        key: `${this.uid}-${new Date().getTime()}-${index}`
      }))

      this.$emit('input', this.value.concat(newImages))
    }
  }
}
</script>
