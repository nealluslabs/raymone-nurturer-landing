// import axios from '../../helpers/axios';
import {loginPending,loginSuccess,loginFailed,signupSuccess,signupPending,signupFailed,logoutPending,logoutSuccess} from '../reducers/auth.slice';
import { db, fb, auth, static_img } from '../../config/firebase';
import { fetchProfile } from './profile.action';
import { clearProfile } from 'src/redux/reducers/profile.slice';
import { clearUser } from 'src/redux/reducers/user.slice';
import { clearChat } from 'src/redux/reducers/chat.slice';
// import { clearSlice } from '../reducers/transaction.slice';
// import { clearBank } from '../reducers/bank.slice';
// import { createBankAcc } from './bank.action';


// export const signup = (user, history) => async (dispatch) => {
//   console.log(user);
//    dispatch(signupPending());
//    const res = db.collection('users').add({
//         name: user.name,
//         email: user.email,
//         password: user.password,
//     })
//     .then((docRef) => {
//         console.log("Document written with ID: ", docRef.id);
//         console.log('Response is: ', res);
//         dispatch(signupSuccess());
//         history.push("/login");
//     })
//     .catch((err) => {
//         console.error("Error adding document: ", err);
//         dispatch(signupFailed({err, msg}));
//     });
//   }



export const signup = (user, history,notifySkip) => async (dispatch) => {
      console.log(user);
       dispatch(signupPending());

   

       db.collection('companies')
            .get()
            .then((snapshot) => {
              
          
              const  validCompanyIds = snapshot.docs.map((doc) => (doc.data().companyID));

    
              console.log("WHAT IS VALID COMPANY IDS--->",validCompanyIds)
              console.log("WHAT IS COMPANY ID SUBMITTED FOR USER--->",user.companyID)
              
       if(validCompanyIds.includes(user.companyID)){  
        fb.auth().createUserWithEmailAndPassword(
          user.email,
          user.password
      ).then((res)=>{
        return db.collection('users').doc(res.user.uid).set({
          uid: res.user.uid,
          name: user.name,
          email: user.email,
          companyID:user.companyID,
          phone: user.phone,
          password: user.password,
          photoUrl: static_img,
          lastActive: new Date().getTime(),
          monthlyConnection: 5,
          usedConnection: 0,
          registeredOn:new Date()
        })
      }).then(() => {
        dispatch(signupSuccess());
        history.push("/login");
      }).catch((err) => {
        console.error("Error signiing up: ", err);
        var errorMessage = err.message;
        dispatch(signupFailed({ errorMessage }));
      })

      }else{
        notifySkip("The company ID you entered is invalid, please verify your company ID and try again!")
      }




      })    



  }

  export const signin = (user,history) => async (dispatch) => {
    dispatch(loginPending());
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Signed In user is: ', user.email);
      const currentUserProfile = db.collection("users").doc(user.uid);
  
      currentUserProfile.get()
      .then((doc) => {
          const user = doc.data();
          var uid = userCredential.user.uid;
          console.log(user)
          dispatch(loginSuccess({ user, uid }));
          dispatch(fetchProfile());
          dispatch(updateLastActive(uid));
          history.push('/apps/dashboard');
          // history.push('/apps/sessions');
          // window.location.href = '/candidates';
      })
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);

      console.log('Error Msg is:---> ', errorMessage);
     
     if(errorMessage){
      dispatch(loginFailed({errorMessage:"Invalid Login Credentials"} ));
     }
    });


 
  }


export const logout = (history) => async (dispatch) => {
  dispatch(updateLastActive(fb.auth().currentUser.uid));
  fb.auth().signOut().then(() => {
    console.log('logout successful!');
    dispatch(clearProfile());
    dispatch(clearUser());
    dispatch(clearChat());
    dispatch(logoutSuccess());
    history.push('/login');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}


export const fetchUserData = (uid) => async (dispatch) => {
  const currentUserProfile = db.collection("users").doc(uid);
  
      currentUserProfile.get()
      .then((doc) => {
          const user = doc.data();
          console.log(user)
          dispatch(loginSuccess({ user }));
      })
}


export const updateLastActive = (uid) => async (dispatch) => {
  const currentTimeStamp = new Date().getTime();
  var userRef = db.collection("users").doc(uid);
   userRef.update({
      lastActive: currentTimeStamp,
  })
  .then(() => {
    console.log('Timestamp updated');
  })
  .catch((error) => {
    var errorMessage = error.message;
    console.log('Error updating timestamp:', errorMessage);
  });
}
