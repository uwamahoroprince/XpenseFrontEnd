import NavBar from "./components/navBar/navBar";
import SideBar from "./components/sideBar/sideBar";
import Header from "./components/header/header";
import Analytics from "./components/analytics/analytics";
import Preference from "./pages/preferences/preferencses";
import "./App.css";
import TransactionTable from "./components/transactiontable/transactionTable";
import { trasactionStatusContext } from "./helper/context";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [statusValue, setStatusValue] = useState(false);
  const [idValue, setIdValue] = useState();
  const [amount, setAmount] = useState();

  return (
    <>
      <trasactionStatusContext.Provider
        value={{
          statusValue,
          setStatusValue,
          idValue,
          setIdValue,
          amount,
          setAmount,
        }}
      >
        <Router>
          <NavBar />
          <div className="bodyContainer">
            <Switch>
              <Route path="/">
                <SideBar />
                <div>
                  <Header />
                  <Analytics />
                </div>
                <div className="tableContainer1">
                  <TransactionTable />
                </div>
              </Route>
            </Switch>

            <Switch>
              <Route path="/preferences">
                <Preference />
              </Route>
            </Switch>
          </div>
        </Router>
      </trasactionStatusContext.Provider>
    </>
  );
}

export default App;
