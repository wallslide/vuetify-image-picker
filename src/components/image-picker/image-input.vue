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
      $event.target.name, $event.target.files)">
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
    uploadFieldName: 'file',
    maxSize: 8192 * 1024 // 8192 KB
  }),
  methods: {
    launchFilePicker () {
      this.$refs.file.click()
    },
    onFileChange (fieldName, fileList) {
      const fileArray = []
      const numNewFiles = fileList.length
      const totalFiles = numNewFiles + this.value.length

      // Convert from fileList to array
      for (let i = 0; i < fileList.length; i++) {
        fileArray.push(fileList[i])
      }

      const result = fileArray.reduce(
        (memo, imageFile, index) => {
          const isSizeOk = imageFile.size <= this.maxSize

          if (this.max && totalFiles > this.max) {
            // check whether max number of images will be exceeded
            memo.errorMessage = `イメージの制限数は${this.max}個です。`
            return memo
          } else if (!imageFile.type.match('image/(png|jpg|jpeg)')) {
            // check whether the upload is an image
            memo.errorMessage = '対応のファイルはPNG、JPG、JPEGのみです'
            return memo
          } else if (!isSizeOk) {
            // check whether the size is greater than the size limit
            memo.errorMessage = 'ファイルの容量制限は8MBです。'
            return memo
          } else {
            // Append file into FormData & turn file into image URL
            let imageURL = URL.createObjectURL(imageFile)
            memo.images = memo.images.concat([
              {
                imageFile,
                imageURL,
                name: imageFile.name,
                key: `${this.uid}-${new Date().getTime()}-${index}`
              }
            ])

            return memo
          }
        },
        { errorMessage: null, images: [] }
      )

      this.$emit('input', this.value.concat(result.images))

      if (result.errorMessage !== null) {
        this.$emit('errorMessage', result.errorMessage)
      }
    }
  }
}
</script>
