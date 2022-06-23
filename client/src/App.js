import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import VideogameCreate from "./components/VideogameCreate/VideogameCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route exact path="/game/:id" component={Detail} />
          <Route exact path="/videogame" component={VideogameCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
