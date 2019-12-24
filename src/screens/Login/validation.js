import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = (values) => {
    return yup.object().shape({
        // phone: yup.string()
        //     .required(`${I18n.t('phone')} ${I18n.t('required')}`),
        // password: yup.string()
        //     .required(`${I18n.t('password')} ${I18n.t('required')}`)
        //     .min(6, `${I18n.t('password')} ${I18n.t('password_length')} 6 ${I18n.t('chars_and_numbers')}`),
    })
};
