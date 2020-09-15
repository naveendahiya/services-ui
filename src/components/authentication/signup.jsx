import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Card, Icon, Image } from "semantic-ui-react";
import SignUpForm from './signupform';
import "../../styles/signup.scss";

export default function SignUp() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className='signup-box' >
        <Typography
          component="div"
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <div className="signup-container">
            <div className="signup-heading">
              rightasker
            </div>
            <div className="signup-form">
               <div className="form-component">
                 <SignUpForm />
               </div>
               <div className="form-info">
                 By signing up you indicate that you have read<br></br>and agree to the<br></br><span>Terms of Service</span><br></br>and<br></br><span>Privacy policy</span>
               </div>
            </div>
            <div className="signup-extra">
              <div className="login-button">Have an Account? LOG IN</div>
              <div className='forget-password'>FORGET PASSWORD</div>
            </div>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
