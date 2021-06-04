/* import logo from './logo.svg';
import './App.css';
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
   */

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow'
import purple from '@material-ui/core/colors/purple'
import TopBar from './ui/TopBar.js'
import FooterBar from './ui/FooterBar.js'
import Box from '@material-ui/core/Box'
import ClientesList from './routed/ClientesList'
import ClientesForm from './routed/ClientesForm'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh', // 100% da altura da área de visualização
    paddingBottom: '42px', //Evitar que o footer cubra o conteúdo
  },
  routed: {
    padding: '0 25px',
    textAlign: 'center',
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  }
}))

function Main() {
  const classes = useStyles()
  return (
    <Box className={classes.main}>
      <BrowserRouter>
        <TopBar />
        <Box id="routed" className={classes.routed}>
          <Switch>

            <Route path="/list">
              <ClientesList />
            </Route>

            <Route path="/new">
              <ClientesForm />
            </Route>

            {/* :id é um parâmetro (espécie de variável de rota) */}
            <Route path="/edit/:id">
              <ClientesForm />
            </Route>

          </Switch>
        </Box>
        <FooterBar />
      </BrowserRouter>
    </Box>
  )
}

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}

export default App;
