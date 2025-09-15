import { fetchChatsPending, fetchChatsSuccess, setCurrentChat ,clearCurrentChat} from "src/redux/reducers/chat.slice";
import { db, fb, auth, storage } from '../../config/firebase';



export const fetchChats = (user1, user2_data) => async (dispatch) => {
    const user2 = user2_data.uid;
    const users =  {user1, user2};
    console.log('User 1: ', user1);
    console.log('User 2 chat data: ', user2);

    dispatch(setCurrentChat({}));
     dispatch(setCurrentChat(user2_data));
     dispatch(getRealtimeChat(users))
};

export const clearChats = () => async (dispatch) => {
   
    dispatch(clearCurrentChat());
    
    
};


export const sendChat = (msgObj) => async (dispatch) => {
    
    console.log('Msg Obj: ', msgObj);
    // const today = new Date();
    // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    const today = new Date();
    const date = today.toISOString();

    const user1 = msgObj.user1;
    const user2 = msgObj.user2;
    const users =  {user1, user2};

    db.collection('chats')
    .add({
        ...msgObj,
        isViewed: false,
        unread: 0,
        time: date,
    })
    .then((snapshot) => {
        dispatch(getRealtimeChat(users))
        console.log('Sent Chat: ', snapshot);
}).catch((error) => {
        var errorMessage = error.message;
        console.log('Error sending chat', errorMessage);
});

};

export const getRealtimeChat = (users) => async (dispatch) => {
    db.collection('chats')
    .where('user1', 'in', [users.user1, users.user2])
    .orderBy('time', 'asc')
    .onSnapshot((querySnapshot) => {
        const chats = [];
        querySnapshot.forEach(doc => {
            if(
                (doc.data().user1 == users.user1 && doc.data().user2 == users.user2)
                || 
                (doc.data().user1 == users.user2 && doc.data().user2 == users.user1)
            ){
                chats.push(doc.data())
            }
        });

        dispatch(fetchChatsSuccess(chats));
        console.log('Realtime Fetched Chats: ', chats);
        console.log('Realtime Chat Length: ', chats.length);
    })
};



