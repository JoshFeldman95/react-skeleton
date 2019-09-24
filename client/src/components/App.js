import React from "react";
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch"
import Root from "./Root"
import SignIn from "./Auth"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    secondary: {
        main: '#60aaff'
      }
    }
  },
)




class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => (
            <MuiThemeProvider theme={theme}>
              <Root/>
            </MuiThemeProvider>
          )} />
          <Route exact path="/login" render={() => (
              <Root />
          )} />
        </Switch>
      </div>
    )
    ;
  }
}

export default App;
