export const accessibilityEffect = {
  'darkmode': {effect: 'tint:75:black'},
  'brightmode': {effect: 'tint:50:white'},
  'monochrome': {effect: 'grayscale'},
  'colorblind': {effect: 'assist_colorblind'}
}

export const predominantColorTransformPxl = [
  {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
  {crop: 'crop', width: 1, height: 1, gravity: 'north_east'},
  {fetch_format: 'auto', quality: 'auto'}];

export const predominantColorTransform  = [
  {variables: [['$currWidth', 'w'], ['$currHeight', 'h']]},
  {width: 'iw_div_2', aspect_ratio: 1, crop: 'pad', background: 'auto'},
  {crop: 'crop', width: 10, height: 10, gravity: 'north_east'},
  {width: '$currWidth', height: '$currHeight', crop: 'fill'},
  {fetch_format: 'auto', quality: 'auto'}];

export const placeholderImageOptions = {
  'vectorize': {effect: 'vectorize', quality: 1},
  'pixelate': {effect: 'pixelate', quality: 1, fetch_format: 'auto'},
  'blur': {effect: 'blur:2000', quality: 1, fetch_format: 'auto'},
  'predominant-color': predominantColorTransform
};
