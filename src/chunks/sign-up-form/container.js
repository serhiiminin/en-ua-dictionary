import React, { Component } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  InputPassword,
  BlockSocial,
  ButtonSearch,
  ButtonFacebook,
  ButtonGoogle,
  Form,
  FormWrapper,
} from '../../components';
import LN from '../../constants/loading-names';
import config from '../../config';
import SC from './styles';

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Required'),
  password: yup
    .string()
    .oneOf([yup.ref('repeatPassword'), null], "Passwords don't match")
    .required('Required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Required'),
});

class SignUpForm extends Component {
  static propTypes = {
    handleBasicSignUp: PropTypes.func.isRequired,
    handleGoogleSignUp: PropTypes.func.isRequired,
    handleFacebookSignUp: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  handleSubmit = formData => {
    const { handleBasicSignUp } = this.props;

    handleBasicSignUp(formData);
  };

  handleGoogle = tokenData => {
    const { accessToken } = tokenData;
    const { handleGoogleSignUp } = this.props;

    return handleGoogleSignUp(accessToken);
  };

  handleFacebook = tokenData => {
    const { accessToken } = tokenData;
    const { handleFacebookSignUp } = this.props;

    return handleFacebookSignUp(accessToken);
  };

  render() {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.signUp);

    return (
      <div>
        <SC.Title>First here? Create an account now!</SC.Title>
        <FormWrapper>
          <Form
            isLoading={isLoading}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            fields={[
              {
                name: 'name',
                label: 'Name',
              },
              {
                name: 'email',
                label: 'Email',
              },
              {
                name: 'password',
                label: 'Password',
                component: InputPassword,
              },
              {
                name: 'repeatPassword',
                label: 'Repeat password',
                component: InputPassword,
              },
            ]}
            renderSubmit={() => (
              <div>
                <ButtonSearch type="submit" color="secondary" variant="contained">
                  Sign up
                </ButtonSearch>
              </div>
            )}
          />
        </FormWrapper>
        <BlockSocial>
          <FacebookLogin
            appId={config.auth.facebook.appId}
            callback={this.handleFacebook}
            render={({ onClick }) => <ButtonFacebook onClick={onClick} />}
          />
          <GoogleLogin
            clientId={config.auth.google.clientId}
            onSuccess={this.handleGoogle}
            render={({ onClick }) => <ButtonGoogle onClick={onClick} />}
          />
        </BlockSocial>
      </div>
    );
  }
}

export default SignUpForm;