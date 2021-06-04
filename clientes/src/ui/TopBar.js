import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logotipo from '../img/customer3.png'
import MainMenu from './MainMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    padding: '5px',
    borderRadius: '15px',
    width: "170px",
    height: "80px",
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <img src={logotipo} alt="clientes" className={classes.logo} />
          <MainMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}