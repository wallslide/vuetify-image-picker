# @nagoos/vue-image-picker

A VueJS component which allows users to upload their images. Users can select one or more images for upload. The component shows the progress of the uploads and indicates when they are complete.

See [working demo](https://codesandbox.io/s/nagoosvue-image-picker-njuf1)

## Features
* Select the maximum number of images allowed to be uploaded
* Pass the image types allowed to be uploaded (default is `png` and `jpg`)
* Pass a maximum image size

## Installation

`yarn add @nagoos/vue-image-picker`

## Usage

When using ES imports, import the `ImagePicker` component and `imageUploadingStates` enum and use them in your component 

```javascript
import { ImagePicker, imageUploadingStates } from "@nagoos/vue-image-picker"
```

The v-model is an [image array](#images-model) that holds the images the user has selected. The [activeImageUploads](#active-image-uploads) property allows the `ImagePicker` component to communicate the upload status of the images the user has selected.

```html
<ImagePicker v-model="images" :activeImageUploads="activeImageUploads">
  <v-flex xs4 md3>
    <img :src="placeholderImage" width="100%" height="100%">
  </v-flex>
</ImagePicker>  
        
```

## Component API

The following props are available to customize `vue-image-picker`:

| Prop | type | description | default |
|------|------|-------------|---------|
|`max`|Int|Limit the number of images that can be uploaded.  `null` for unlimited|`null`|
|`maxSize`|Int|Limit the maximum size of any one image in bytes.|`8192 * 1024` (8192 KB)|
|`validImageTypes`|[String]|The image mime types which the user is allowed to upload|`['png', 'jpg', 'jpeg']`|
|`v-model`|[Object]|The images selected by the user. See [Images model section](#images-model) for details|`[]`|
|`activeImageUploads`|Object|Communcates the upload progress and state of images managed by the component. See [Active Image Uploads section](#active-image-uploads)|`{}`|
|`exceedMaxImagesError`|String| A message to show the user when they try to upload more images than allowed by the `max` prop|'`The maximum number of images was exceeded by your selection.`'|
|`invalidFileTypeError`|String| A message to show the user when they attempt to upload an image with an invalid file type|'`Invalid file type. Please upload 'png' or 'jpg' files.`'|
|`fileSizeError`|String|A message to show the user when one of their images is larger than the `maxSize` prop|'`One or more of the files you attempted to upload is larger than the single-file size limit.`'|
|`maxImagesUnit`|String|Allows for localization of the word 'images'|'`images`'
|`clearedImagesMessage`|String|The message that is shown to the user when the clear the images in the component|'`Cleared images`'|
|`clearImagesLabel`|String|The label for the `clear` button. Forced uppercase|'`clear`'|
|`addImagesLabel`|String|The label for the `add images` button. Forced uppercase|'`add images`'|

## Images model

## Active Image Uploads
