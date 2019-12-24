import { Platform } from 'react-native';

export default {
  normal: Platform.OS === 'ios' ? 'Droid Arabic Kufi' : 'Cairo-SemiBold',
  bold: Platform.OS === 'ios' ? 'Droid Arabic Kufi' : 'Cairo-Bold',
  boldIsStyle: true,
};
