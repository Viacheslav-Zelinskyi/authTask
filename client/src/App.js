import { Route, Switch, Redirect } from "react-router-dom";
import { MainPage, UsersPage } from "./pages";
import { Layout } from "antd";
import { Header } from "./components";
import { useState } from "react";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("social_network"))
  );

  return (
    <div className="App">
      <Layout>
        <Header isAuth={isAuth} setIsAuth={setIsAuth}></Header>
        <Switch>
          <Route path="/userPage">{isAuth ? <UsersPage /> : <Redirect />}</Route>
          <Route path={["/", "/loginPage"]}>
            <MainPage setIsAuth={setIsAuth} />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
