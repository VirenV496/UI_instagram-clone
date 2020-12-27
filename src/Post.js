import React from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar"

function Post({username, caption , imageUrl} ) {
    return (
        <div className ="post">
           <div className ="post__header">

           <Avatar
           className ="post_avatar"
           alt="__sublimed"
           src=""
           />

           <h3>{username}</h3>
            {/*header => avatar=>username*/}
            </div>

             {/* image*/}
            <img className ="post_image" src={imageUrl}/>
              {/*username caption*/}
             <h4 className ="post_text" > <strong>{username}</strong><br/>{caption} </h4>

             
        </div>
    )
}

export default Post


