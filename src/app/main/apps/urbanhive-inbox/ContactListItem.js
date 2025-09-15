import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import format from 'date-fns/format';
import StatusIcon from './StatusIcon';
import { unMatchConnect, updateConnection } from 'src/redux/actions/user.action';
import { saveFilteredContacts, saveFilteredUsers } from 'redux/reducers/user.slice';
import { FaEnvelope } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  contactListItem: {
    '&.active': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  unreadBadge: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },

}));



function ContactListItem(props) {
  const classes = useStyles(props);
  // const selectedContactId = 'tDsFHoucxvMTreIJMBDnftrbrtG2';
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.login);
  const { allUsers,filteredUsers, connects, isLoading } = useSelector((state) => state.user);
  const selectedContactId = props.user.uid;

 console.log("WHAT IS USER?--->",props.user)


 const resortFilteredUsersAndPush = (userId)=>{
    
 const replica = [...filteredUsers]

  const index = replica.findIndex(user => user.uid === userId);

  if (index > -1) {
    const [matchedUser] = replica.splice(index, 1);
    replica.unshift(matchedUser);
  }

  
 dispatch(saveFilteredContacts(replica))

setTimeout(()=>{
  history.push('/candidates')
   },300)

 }

  const accRejInvite = (users, status) => {

    const user1 = users.uid;
    const user2 = user.uid;
  
    console.log('Accepted User: ', user);
    dispatch(updateConnection(user1, user2, status, history));
  }
  
  const unMatch = (users) => {
     const user1 = users.uid;
     const user2 = user.uid;

     console.log('User 1:- ', user1);
     console.log('User 2:- ', user2);
     dispatch(unMatchConnect(user1, user2, history));
  }

  

  return (
    <ListItem
    button
    className={clsx(classes.contactListItem, 'px-16 py-12 min-h-92', {
      // active: props.selectedContactId === props.contact.id,
      active: selectedContactId === props.user.uid,
    })}
    onClick={() => { setTimeout(()=>{props.onContactClick(props.user.uid)},0 );
                      props.onClick(props.user.uid);
                      
                        }}
  >
    <div className="relative">
      <div className="absolute right-0 bottom-0 -m-4 z-10">
        {/* <StatusIcon status={props.contact.status} /> */}
        <StatusIcon status={'online'} />
      </div>

       <div onClick={()=>{resortFilteredUsersAndPush(props.user.uid)}}>
      <Avatar src={props.user.photoUrl} alt={props.user.name}>
        {!props.user.photoUrl || props.user.photoUrl === '' ? props.user.name[0] : ''}
      </Avatar>
      </div>

    </div>

    <ListItemText
      classes={{
        root: 'min-w-px px-16',
        primary: 'font-medium text-14',
        secondary: 'truncate',
      }}
      primary={props.user.name}
      secondary={props.user.name === "Emily White"? "Happy Fourth of July!🎉":`${props.user.name==="Bob Johnson"?"Happy Birthday Bob!🎂":props.user.messageQueue && props.user.messageQueue[props.user.messageQueue.length-1 && props.user.messageQueue.length-1] && props.user.messageQueue[props.user.messageQueue.length-1].subject ? props.user.messageQueue[props.user.messageQueue.length-1].subject:""}${props.user.name==="Alice Chen"? " 📅": (props.user.name==="John Smith"||props.user.name==="Carol Garcia")  ?"✉️":" "}`  }
      // secondary={props.contact.mood}
    />

    {/* {props.contact.chatId && ( */}
      <div className="flex flex-col justify-center items-end">
      {/* {props.contact.lastMessageTime && ( */}
        <Typography
          className="whitespace-nowrap mb-8 font-medium text-12"
          color="textSecondary"
        >
          {/* {format(new Date(props.contact.lastMessageTime), 'PP')} */}
          {/*format(new Date('2022-8-20'), 'PP')*/}
          {props.user.sendDate?props.user.sendDate + " Days":"7 Days" /*props.user.daysTo?props.user.daysTo:"7 Days"*/ }
        </Typography>
      {/* )} */}
 
      {/* Show Badge if message is unread */}
      {/* {props.contact.unread && (
        <div
          className={clsx(
            classes.unreadBadge,
            'flex items-center justify-center min-w-24 h-24 rounded-full font-medium text-12 text-center'
          )}
        >
          {props.contact.unread}
        </div>
      )} */}
     {/* Show accept / reject buttons */}
    
     {/* <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group"> */}
     {/* <ButtonGroup color="secondary" aria-label="outlined secondary button group"> */}
     {
      props.user.status == 'pending' ?
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button style={{color: 'green'}} onClick={() => accRejInvite(props.user, 'accepted')}>Accept</Button>
        <Button style={{color: 'red'}} onClick={() => accRejInvite(props.user, 'rejected')}>Reject</Button>
     </ButtonGroup> : null
     }

{
      props.user.status == 'accepted' ?
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button style={{color: 'orange'}} onClick={() => unMatch(props.user)}>UnMatch</Button>
     </ButtonGroup> : null
     }

    </div>
    {/* )} */}
  </ListItem>
  );
}

export default ContactListItem;
