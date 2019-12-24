import { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import I18n from 'react-native-i18n';

//import { showError } from './utils/localNotifications';

class Form extends PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
    schema: PropTypes.objectOf(PropTypes.any).isRequired,
    // submitValues: PropTypes.func,
    onSubmit: PropTypes.func,
    validationSchema: PropTypes.func,
  };

  static defaultProps = {
    schema: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      isValidating: false,
      errors: {},
    };

    this.values = this.processSchema();
  }

  setFieldValue = (name, value, reset) => {
    this.values[name] = value;

    if (reset) return;

    const error = this.validateField(name);
    if (error[name]) {
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: error[name],
        },
      });
    } else if (this.state.errors[name]) {
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: null,
        },
      });
    }
  };

  getErrorsFromValidationError = (validationError, name) =>
    validationError.inner.reverse().reduce(
      (errors, error) => ({
        ...errors,
        [name || error.path]: error.message,
      }),
      {},
    );

  setSubmitting = value => {
    this.setState({
      isSubmitting: value,
    });
  };

  validateField = name => {

    if (!this.props.validationSchema(this.values)) return {};

    const validationSchema = this.props.validationSchema(this.values);
    if (!validationSchema.fields[name]) return {};

    try {
      validationSchema.fields[name].validateSync(this.values[name], {
        abortEarly: false,
      });
      return {};
    } catch (error) {
      return this.getErrorsFromValidationError(error, name);
    }
  };

  validate = () => {
    if (!this.props.validationSchema(this.values)) return {};

    const validationSchema = this.props.validationSchema(this.values);

    try {
      validationSchema.validateSync(this.values, { abortEarly: false });
      return {};
    } catch (error) {
      //showError(I18n.t('ui-form-error'));
      return this.getErrorsFromValidationError(error);
    }
  };

  processSchema = () => {
    const values = {};

    Object.keys(this.props.schema).forEach(key => {
      const item = this.props.schema[key];
      const value =
        typeof item === 'object' && item.options ? item.value : item;
      values[key] = value;
    });

    return JSON.parse(JSON.stringify(values));
  };

  processSubmitValues = (submit = true) => {
    const values = {};
    Object.keys(this.props.schema).forEach(key => {
      const item = this.props.schema[key];

      if (typeof item === 'object' && item.options) {
        if (item.options.includesInSubmit || !submit) {
          values[key] = this.values[key];
        }

        if (item.options.group) {
          values[item.options.group] = values[item.options.group] || [];
          if (this.values[key]) {
            values[item.options.group].push(this.values[key]);
          }
        }
      } else {
        values[key] = this.values[key];
      }
    });

    if (submit) {
      this.submitValues = JSON.parse(JSON.stringify(values));
    }

    return values;
  };

  processRequest = () => {
    const { submitRequest } = this.props;

    if (submitRequest && submitRequest.type === 'multipart/form-data') {
      const formData = new FormData();
      Object.keys(this.submitValues).forEach(key => {
        if (
          typeof this.submitValues[key] === 'object' &&
          this.submitValues[key].forEach
        ) {
          this.submitValues[key].forEach(i => {
            formData.append(key, i);
          });
        } else if (
          this.submitValues[key] &&
          typeof this.props.schema[key] === 'object' &&
          this.props.schema[key].options &&
          this.props.schema[key].options.type === 'image'
        ) {
          formData.append(key, {
            uri: this.submitValues[key],
            type: 'image/*',
            name: 'profile-image',
          });
        } else {
          formData.append(key, this.submitValues[key]);
        }
      });
      this.submitValues = formData;
    }
  };

  handleSubmit = () => {
    this.setState({ isValidating: true, isSubmitting: true });
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      this.setState({
        isValidating: false,
        isSubmitting: false,
        errors,
      });
      return;
    }

    this.submitValues = {};
    this.processSubmitValues();
    this.setState({ isValidating: false, errors: {} });
    this.processRequest();

    if (this.props.onSubmit) {
      this.props.onSubmit(this.processSubmitValues(false), {
        setSubmitting: this.setSubmitting,
        submitValues: this.submitValues,
        setFieldValue: this.setFieldValue,
      });
    }
  };

  injectFormProps = (name, changeValueCallbackName = 'onChangeText') => ({
    name,
    initialValue: this.values[name],
    [changeValueCallbackName]: this.setFieldValue,
    onBlur: this.setFieldValue,
    error: this.state.errors[name],
  });

  render() {
    return this.props.render({
      injectFormProps: this.injectFormProps,
      isSubmitting: this.state.isSubmitting,
      isValidating: this.state.isValidating,
      handleSubmit: this.handleSubmit,
      setFieldValue: this.setFieldValue,
      initialValues: this.values,
      errors: this.state.errors,
    });
  }
}

export default Form;
