import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Route } from "react-router";
import { LoginForm } from "../../components";
import {getUserNumber} from '../../api'

import "./Main.css";

const MainPage = ({ setIsAuth }) => {
  const [userNumber, setUserNumber] = useState({google: 0, facebook: 0});

  useEffect(()=>{
    getUserNumber().then(data=>setUserNumber(data))
  }, [])

  return (
    <div className="mainpage_wrapper">
      <h1>Wellcome !</h1>
      <PieChart
        className="mainpage_diagram"
        data={[
          { title: "Google", value: +userNumber.google, color: "#0F9D58" },
          { title: "Facebook", value: +userNumber.facebook, color: "#4C75A3" },
        ]}
        label={({ dataEntry }) => dataEntry.value}
        labelPosition={40}
      />
      <div>
        <ul className="chart_labels">
          <li className="label_facebook">Facebook</li>
          <li className="label_google">Google</li>
        </ul>
      </div>
      <Route path="/loginPage">
        <LoginForm setIsAuth={setIsAuth} />
      </Route>
    </div>
  );
};

export default MainPage;
