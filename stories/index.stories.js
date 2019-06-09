import { storiesOf } from '@storybook/vue'
import ImagePicker from '@/components/image-picker'
import placeholderImage from '@/assets/placeholder-img.jpg'
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
          placeholderImage,
          images: [],
          activeImageUploads: {}
        }
      },
      template:
        `<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
          <v-flex xs4 md3>
            <img :src="placeholderImage" width="100%" height="100%">
          </v-flex>
        </ImagePicker>
        `
    }
  })
  .add('Max of 3', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          placeholderImage,
          images: [],
          activeImageUploads: {}
        }
      },
      template:
        `<ImagePicker :max="3" v-model="images" :activeImageUploads="activeImageUploads">
          <v-flex xs4 md3>
            <img :src="placeholderImage" width="100%" height="100%">
          </v-flex>
        </ImagePicker>  
        `
    }
  })
  .add('Upload starting', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          placeholderImage,
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
      `<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
        <v-flex xs4 md3>
          <img :src="placeholderImage" width="100%" height="100%">
        </v-flex>
      </ImagePicker>  
        `
    }
  })
  .add('Upload in progress', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          placeholderImage,
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
      `<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
        <v-flex xs4 md3>
          <img :src="placeholderImage" width="100%" height="100%">
        </v-flex>
      </ImagePicker>  
        `
    }
  })
  .add('Upload complete', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          placeholderImage,
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
      `<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
        <v-flex xs4 md3>
          <img :src="placeholderImage" width="100%" height="100%">
        </v-flex>
      </ImagePicker>  
        `
    }
  })
  .add('Upload error', () => {
    return {
      components: { ImagePicker },
      data () {
        return {
          placeholderImage,
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
      `<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
        <v-flex xs4 md3>
          <img :src="placeholderImage" width="100%" height="100%">
        </v-flex>
      </ImagePicker>  
        `
    }
  })
