import { storiesOf } from '@storybook/vue'
import ImagePicker from '@/components/image-picker'
import { imageUploadingStates } from '@/components/image-picker/enums'

// Wrap stories in app so that they get the correct styles
const AppDecorator = () => {
  return {
    template: `<v-app><v-content><story/></v-content></v-app>`
  }
}

storiesOf('Image Picker', module)
  .addDecorator(AppDecorator)
  .add('Basic', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [],
          activeImageUploads: {}
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
  .add('Max of 3', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [],
          activeImageUploads: {}
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" :max="3" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
  .add('Upload starting', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [{ key: 'aaa' }],
          activeImageUploads: {
            aaa: {
              progress: 0,
              state: imageUploadingStates.NEW
            }
          }
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
  .add('Upload in progress', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [{ key: 'aaa' }],
          activeImageUploads: {
            aaa: {
              progress: 30,
              state: imageUploadingStates.UPLOADING
            }
          }
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
  .add('Upload complete', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [{ key: 'aaa' }],
          activeImageUploads: {
            aaa: {
              progress: 100,
              state: imageUploadingStates.COMPLETE
            }
          }
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
  .add('Upload error', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          images: [{ key: 'aaa' }],
          activeImageUploads: {
            aaa: {
              progress: 10,
              error: 'No internet connection',
              state: imageUploadingStates.ERROR
            }
          }
        }
      },
      template:
        '<ImagePicker uid="fake-uid" name="test" v-model="images" :activeImageUploads="activeImageUploads"/>'
    }
  })
