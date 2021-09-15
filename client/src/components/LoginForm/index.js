import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { Link, useHistory } from "react-router-dom";
import { logInFacebook, logInGoogle } from "../../api";
import "./index.css";

const LoginForm = ({ setIsAuth }) => {
  const history = useHistory();
  return (
    <div className="login-form_wrapper">
      <Link to="/">
        <div className="login-form_block"></div>
      </Link>
      <div className="login-form">
        <h2>Log in with</h2>
        <div className="login-with_wrapper">
          <GoogleLogin
            clientId="843221137506-b6enm25qirnkuounph5gm0iegrultefg.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(response) => responseGoogle(response, setIsAuth, history)}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="280607466935535"
            autoLoad={false}
            fields="name,email,picture"
            callback={(response) => responseFacebook(response, setIsAuth, history)}
          />
        </div>
      </div>
    </div>
  );
};

const responseGoogle = (response, setIsAuth, history) => {
  logInGoogle(
    response.googleId,
    response?.profileObj.name,
    response.tokenId
  ).then((data) => {
    console.log(data)
    if (data.loggedIn) {
      setIsAuth(true);
      localStorage.setItem("token", response.tokenId);
      localStorage.setItem("social_network", "google");
      localStorage.setItem("social_id", response.googleId);
      history.push('/')
    }
   else alert("Account blocked")
  });
};

const responseFacebook = (response, setIsAuth, history) => {
  logInFacebook(response.userID, response.name, response.accessToken).then(
    (data) => {
      console.log(data)
      if (data.loggedIn) {
        setIsAuth(true);
        localStorage.setItem("token", response.accessToken);
        localStorage.setItem("social_network", "facebook");
        localStorage.setItem("social_id", response.userID);
        history.push('/')
      }
      else alert("Account blocked")
    }
  );
};

export default LoginForm;
