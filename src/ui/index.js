import './Base/polyfill';

export { default as View } from './View';
export { default as ScrollView } from './ScrollView';
export { default as Text } from './Text';
export { default as Icon } from './Icon';
export { default as Indicator } from './Indicator';
export { default as Button } from './Button';
export { default as Image } from './Image';
export { default as List } from './List';
export { default as Tabs } from './Tabs';
export { default as Swiper } from './MySwiper';
export { default as SwiperProduct } from './SwiperProduct';
export { default as Form } from './Form';
export { default as Input } from './Input';
export { default as TextArea } from './TextArea';
export { default as Picker } from './Picker';
export { default as DatePicker } from './DatePicker';
export { default as RadioGroup } from './RadioGroup';
export { default as RadioButton } from './RadioButton';
// export { default as CheckBoxGroup } from './CheckBoxGroup';
// export { default as CheckBox } from './CheckBox';
export { default as ToggleButton } from './ToggleButton';
export { default as DropDown } from './DropDown';
export { default as Navigation } from './Navigation';
export { default as createStackNavigation } from './StackNavigation';

export { registerCustomIconType } from './utils/icon';
export { getColors, getTheme, getFonts } from './Theme';
export { showInfo, showSuccess, showError } from './utils/localNotifications';
export {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  moderateScale,
} from './utils/responsiveDimensions';

export { default as LocaleEn } from './defaults/en.json';
export { default as LocaleAr } from './defaults/ar.json';
