import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = (values) => {
    return yup.object().shape({
         name: yup.string()
            .required(`${I18n.t('Name')} ${I18n.t('required')}`),
         email: yup.string()
            .required(`${I18n.t('Email')} ${I18n.t('required')}`)
            .email('Please enter a valid email'),
         message : yup.string()
                       .required(`${I18n.t('Message content')} ${I18n.t('required')}`) ,
                       city : yup.string()
                       .required(`${I18n.t('City')} ${I18n.t('required')}`)
         
         
         
    })
};
