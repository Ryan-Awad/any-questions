import React, { Component } from 'react';
import { Button } from 'react-bootstrap'; 
import isEmailVerified from '../helpers/isEmailVerified';
import resendEmailVerification from '../helpers/resendEmailVerification';

class VerifyEmail extends Component {
  componentDidMount() {
    isEmailVerified(verified => {
      if (verified) {
        window.location.href = '/';
      }
    });
  }

  render() { 
    return (
      <div style={{textAlign: 'center'}}>
        <h2>Please check your E-Mail to verify your account.</h2><br></br>
        <Button onClick={() => resendEmailVerification(() => alert('Verification Resent.'))}>Resend E-Mail Verification</Button>
      </div>
    );
  }
}
 
export default VerifyEmail;