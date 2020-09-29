import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WebIcon from '@material-ui/icons/Web';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Header from "./header";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { logOut } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import '../../styles/drawer.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Drawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  let history = useHistory();
  const isAuth = useSelector(state => state.userReducer.isAuth);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const logout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user_id');
     Cookies.remove('token', { path: '/'});
     dispatch(
       logOut()
     )
      console.log('elllo')
      history.push({
        pathname: `/`,
      });
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className='drawer-box'>
        <ListItem button className='profile-section'>
          <div className="image-circle">
          <AccountCircleIcon className='image-icon' />
          </div>
          <div className="user-name">gautam_admin</div>
          <div className="user-phone">7727021196</div>
        </ListItem>
        <Divider />
        <div className="drawer-options">
        <Link to='/app/tasks/'>
        <ListItem button>
          <ListItemIcon>
            <WebIcon className='list-item' />
          </ListItemIcon>
          <ListItemText><span className='list-item' >BROWSE TASKS</span></ListItemText>
        </ListItem>
        </Link>
        <Link to='/app/post-task/'>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedInIcon className='list-item' />
          </ListItemIcon>
          <ListItemText><span className='list-item' >POST A TASK</span></ListItemText>
        </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedInIcon className='list-item' />
          </ListItemIcon>
          <ListItemText><span className='list-item' >MY TASKS</span></ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon className='list-item' />
          </ListItemIcon>
          <ListItemText><span className='list-item' >NOTIFICATIONS</span></ListItemText>
        </ListItem>
          <ListItem button onClick={() => logout()} >
            <ListItemIcon><PowerSettingsNewIcon className='list-item' /></ListItemIcon>
            <ListItemText><span className='list-item' >LOG OUT</span></ListItemText>
          </ListItem>       
        </div>
          <ListItem className='brand-name'>
            <span className='brand-name-text'>RIGHTASKER</span>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Header open={toggleDrawer(anchor, true)} />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
