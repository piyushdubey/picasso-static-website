import CreateImage from "./CreateImage";
import UploadImage from "./UploadImage";
import Mint from "./Mint";
import {Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App () {
    return (
<Router history={history}>
    <Switch>
        <Route path={"/"} exact component={CreateImage} />
        <Route path="/upload" component={UploadImage} />        
        <Route path="/mint" component={Mint} />
    </Switch>

</Router>
    );
}
export default App;