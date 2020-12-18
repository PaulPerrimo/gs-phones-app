import * as React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import PhonesList from "./components/list/phones-list";

const PhoneFormComponent = React.lazy(() => import("./components/phone/detailed-phone"));
const DetailedPhoneComponent = React.lazy(() => import("./components/phone/phone-form"));

const App: React.FC = () => (
  <React.Suspense fallback={"Loading..."}>
    <Switch>
      <Route path="/phone/:id?" component={DetailedPhoneComponent} />
      <Route path="/phone-form" component={PhoneFormComponent} />
      <Route path="/" exact component={PhonesList} />
      <Redirect to="/" />
    </Switch>
  </React.Suspense>
);

export default App;
