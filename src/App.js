import react , { useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase';

import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';






  

function getModalStyle() {
  const top = 50;
  const left =50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));





function App() {

    
    const classes =useStyles();

    const [modalStyle] = useState(getModalStyle);
 
    const [posts, setPosts] =useState([]);
    const [open, setOpen] =useState(false);


    const [openSignIn , setOpenSignIn] =useState(false);
     
    /*
    input Field
    
    */
      const [username, setUsername] =useState('');
      const [password, setPassword] =useState('');
      const [email, setEmail] =useState('');

      const [user,setUser] =useState(null);
    

      useEffect(() =>  {
       const unsubscribe= auth.onAuthStateChanged((authUser) =>{
        
        if(authUser){
          //user logged in
          console.log(authUser);
          setUser(authUser);
          
        }else{
          
            //user logged out
            setUser(null);
          }
        })

return() =>{
  unsubscribe();
}

      }, [user,username]);


     



  
 /* //useeffect =>runs a peace of code based specific condition*/
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot =>{
     setPosts(snapshot.docs.map(doc => ({ 
       
      id: doc.id,
      post: doc.data()
    
    })));
    })

  },[]);




  const signUp =(event) =>{

    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)

     .then((authUser) =>{

      authUser.user.updateProfile({
       displayName:username
      })
     })
    .catch((error) => alert(error.message))
    setOpen(false);

  }
       
     const signIn=(event)  =>{

      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password)
      .catch((error) => alert(error.message))
      setOpenSignIn(false);
     }



      
  return (

    <div className="app">

     

   {/* i want to have*/}
    {/* caption input*/}
     {/* file piker*/}
      {/* post button*/}

    








    
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    >
   <div style={modalStyle} className={classes.paper}>
    
     <form className="app__signup">
     <center>
     <img className ="app_HeaderImage"
       src ="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt=""
       />
      </center>

      <input
       placeholder ="username"
       type ="text"
       value ={username}
       onChange ={(e) => setUsername(e.target.value)}
       
      /> 
       
       <input
       placeholder ="email"
       type ="text"
       value ={email}
       onChange ={(e) => setEmail(e.target.value)}
       
      /> 

      <input
       placeholder ="password"
       type ="password"
       value ={password}
       onChange ={(e) => setPassword(e.target.value)} 
      /> 


   

      <Button type ="submit" onClick ={() => setOpen(true)}>Sign Up</Button>

      </form>
       </div>
       
       </Modal>




                    
    <Modal
    open={openSignIn}
    onClose={() => setOpenSignIn(false)}
    >
   <div style={modalStyle} className={classes.paper}>
    
     <form className="app__signup">
     <center>
     <img className ="app_HeaderImage"
       src ="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt=""
       />
      </center>

    
       
       <input
       placeholder ="email"
       type ="text"
       value ={email}
       onChange ={(e) => setEmail(e.target.value)}
       
      /> 

      <input
       placeholder ="password"
       type ="password"
       value ={password}
       onChange ={(e) => setPassword(e.target.value)} 
      /> 


   

      <Button type ="submit" onClick ={() => setOpen(true)}>Sign IN</Button>

      </form>
       </div>
       
       </Modal>








     
    <div className ="app_header">
     
     <img className ="app_HeaderImage"
       src ="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
       alt=""
       />

          {user ?(

          <Button  onClick ={() => auth.signOut()}>logout</Button>
          ):(

            <div className="App__loginContainer">
              <Button onClick ={() => setOpen(true)}>Sign In</Button>
              <Button onClick ={() => setOpen(true)}>Sign Up</Button>
            

         

      </div>
      )  }
</div>
    


        
     
  
       
  

     


     

     {/* All posts comes here*/}

     <div className="app__posts">
     <div className="app_post_left">
     {
      posts.map(({id, post})=>(
        <Post key={id} username ={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))
     } 
     </div>
     

        
        <div className="app_post_right">

        <InstagramEmbed
            url='https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHRvcHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'
            clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />

        </div>
 
    
  
   
   

   </div>
   <ImageUpload/>
   </div> 
   
   
  );
}

export default App;
