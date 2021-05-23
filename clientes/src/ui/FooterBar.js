import { Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '42px',
    //Posicionamento do footer na parte inferior da página
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  text: {
    width: '100%'
  },
  link: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

}));

export default function FooterBar() {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <Typography className={classes.text} variant="caption" display="block" align="center" color="textSecondary">
        &copy; 2021 Produzido com <LocalCafeIcon fontSize="small" /> por <a className={classes.link} href="https://www.linkedin.com/in/otavio-ferraz/"> Otávio Cleyderman</a>
      </Typography>
    </Toolbar>
  )
}