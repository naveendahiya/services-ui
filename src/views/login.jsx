import React, {useEffect} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LogInForm from '../components/forms/loginform';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/login.scss";

export default function LogIn() {
   const isAuth = useSelector(state => state.userReducer.isAuth)
   let history = useHistory();

  useEffect(() => {
     if(isAuth == true){
      history.push({
        pathname: `/app/`,
      });
     }
  }, [isAuth])


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className='login-box'>
        <Typography
          component="div"z
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
                   This site is protected bt reCAPTCHA and the <br></br> Google <span>Privacy Policy</span> and <span>Terms of Service</span>
                </div>
            </div>
            <div className="login-extra">
            <Link to={{
                pathname: `/signup/`,
              }}>
              <div className="signup-button">Dont't Have an Account? SIGN UP</div>
              </Link>
              <div className='forget-password'>FORGET PASSWORD</div>
            </div>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}