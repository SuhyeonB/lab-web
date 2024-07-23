import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SigninBox from './SigninBox';

const Signin = () => {
  return (
    <GoogleOAuthProvider clientId="602215736719-dmmfmv56mtdl79csoc0btvjpjt9io1qa.apps.googleusercontent.com">
      <SigninBox />
    </GoogleOAuthProvider>
  );
};

export default Signin;