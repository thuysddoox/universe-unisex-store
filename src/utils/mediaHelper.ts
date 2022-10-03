import { startsWith, trim } from 'lodash';

export const MEDIA_TYPE = {
  PHOTO: 1,
  VIDEO: 2,
  AUDIO: 3,
  ALBUM: 4,
  DOCUMENT: 5,
};

export const UPLOAD_STATUS = {
  success: 'success',
  uploading: 'uploading',
  exception: 'exception',
  error: 'error',
};

export const ACCEPT_TYPE = {
  image: '.png, .jpg, .gif, .jpeg, .jfif',
  video: '.mp4, .mov, .m4v',
  audio: '.mp3, .wav, .m4a, .wma',
};

export const getMediaType = (file: File) => {
  if (startsWith(file.type, 'video')) return MEDIA_TYPE['VIDEO'];
  if (startsWith(file.type, 'audio')) return MEDIA_TYPE['AUDIO'];
  if (startsWith(file.type, 'image') || file.name.includes('.heic'))
    return MEDIA_TYPE['PHOTO'];
  return MEDIA_TYPE['DOCUMENT'];
};

export const getMediaUploadDir = (file: File) => {
  if (startsWith(file.type, 'video')) return 'video';
  if (startsWith(file.type, 'audio')) return 'audio';
  if (startsWith(file.type, 'image') || file.name.includes('.heic'))
    return 'image';
  return 'document';
};

export const concatAccumulator = (acc, val) => {
  return acc.length > 0 ? acc.concat(', ', val) : acc.concat(val);
};

export const getExtensionsUpload = (accept = '', isGif: boolean = true) => {
  let imageExtensions = isGif ? ACCEPT_TYPE.image : '.png, .jpg, .jpeg, .jfif';
  let videoExtensions = ACCEPT_TYPE.video;
  let audioExtensions = ACCEPT_TYPE.audio;

  if (accept.length) {
    let listAcceptType = accept
      .split(',')
      .map((val) => val.split('/'))
      // @ts-ignore
      .flat(1)
      .filter((val) => val !== '*');

    let result = listAcceptType.reduce((extensions, currentValue) => {
      return trim(currentValue) === 'image'
        ? concatAccumulator(extensions, imageExtensions)
        : trim(currentValue) === 'video'
        ? concatAccumulator(extensions, videoExtensions)
        : concatAccumulator(extensions, audioExtensions);
    }, '');
    return result;
  }
  return '';
};

export const getImageUrl = (media, size) => {
  switch (size) {
    case 'small':
      return (
        media?.cdnSmall ??
        media?.cdnMedium ??
        media?.cdnLarge ??
        media?.cdnOrigin ??
        media?.url ??
        media?.fileUrl ??
        ''
      );
    case 'medium':
      return (
        media?.cdnMedium ??
        media?.cdnLarge ??
        media?.cdnOrigin ??
        media?.cdnSmall ??
        media?.url ??
        media?.fileUrl ??
        ''
      );
    case 'large':
      return (
        media?.cdnLarge ??
        media?.cdnMedium ??
        media?.cdnSmall ??
        media?.cdnOrigin ??
        media?.url ??
        media?.fileUrl ??
        ''
      );
    default:
      return (
        media?.cdnOrigin ??
        media?.cdnMedium ??
        media?.cdnLarge ??
        media?.url ??
        media?.fileUrl ??
        ''
      );
  }
};
