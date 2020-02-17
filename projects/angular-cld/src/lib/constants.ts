export const predominantColorTransformPxl = [
  {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
  {crop: 'crop', width: 1, height: 1, gravity: 'north_east'},
  {fetch_format: 'auto', quality: 'auto'}];

export const predominantColorTransform  = [
  {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
  {crop: 'crop', width: 10, height: 10, gravity: 'north_east'},
  {width: 'iw', height: 'ih', crop: 'fill'},
  {fetch_format: 'auto', quality: 'auto'}];

export const placeholderImageOptions = {
  'vectorize': {effect: 'vectorize', quality: 1},
  'pixelate': {effect: 'pixelate', quality: 1, fetch_format: 'auto'},
  'blur': {effect: 'blur:2000', quality: 1, fetch_format: 'auto'},
  'predominant-color': predominantColorTransform
};
