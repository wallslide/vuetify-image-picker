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

The `vue-image-picker`'s model is an array of Objects which represents an array of images selected by the user. 

Each object contains the following properties
### imageFile
A native `File` object created by the browser when the user selects a file

### imageURL
A data url which can be assigned to an `<img>`'s `src` to show the selected file

### key 
A key representing a unique image name

### name
The name of the image file selected by the user

## Active Image Uploads

An Object containing the active upload state of images selected by the user. For each image that the system wishes to indicate the upload state of, there should be a key-value pair added to the Object:

### key
The `key` should equal the key of the image entry in the `images[]` array that the system wishes to indicate an upload state for.

### value
The `value` is an Object with two properties:

```javascript
{
  progress,
  state
}
```

The `progress`'s value should be a Number between 0 and 100 to indicate the percentage progress of the image upload.

The `state`'s value should be one of the `imageUploadingStates` enums: `NEW`, `UPLOADING`, `ERROR`, or `COMPLETE`.


