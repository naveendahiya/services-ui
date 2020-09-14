import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Card, Icon, Image } from "semantic-ui-react";
import LogInForm from './loginform';
import "../../styles/login.scss";

export default function LogIn() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "white", height: "100vh" }}
        >
          <div className="login-container">
            <div className="login-heading">
              rightasker
            </div>
            <div className="login-form">
               <div className="form-component">
                 <LogInForm />
               </div>
               <div className="form-info">
                   This site is protected bt reCAPTCHA and the <br></br> Google <span>Privacy Policy</span> and <span>Terms of Service</span> apply.
                </div>
            </div>
            <div className="login-extra">
              <div className="signup-button">Have an Account? LOG IN</div>
              <div className='forget-password'>FORGET PASSWORD</div>
            </div>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
