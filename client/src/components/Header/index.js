import { Button } from "antd";
import { Header as HeaderComponent } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isAuth, setIsAuth }) => (
  <HeaderComponent className="header">
    <div className="header_navigation-block">
      {isAuth ? (
        <>
          <Link to="/">
            <div className="navigation-block_link">Main</div>
          </Link>
          <Link to="/userPage">
            <div className="navigation-block_link">Users</div>
          </Link>
        </>
      ) : null}
    </div>
    {isAuth ? (
      <Button type="primary" onClick={()=>{setIsAuth(false); localStorage.clear()}} danger>
        Log out
      </Button>
    ) : (
      <Link to="/loginPage">
        <Button type="primary">Log in</Button>
      </Link>
    )}
  </HeaderComponent>
);

export default Header;
