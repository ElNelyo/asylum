import React from "react";
import ReactDOM from 'react-dom';


class Message extends React.Component {

  constructor(props) {
    super(props);
    this.messages = [];
    this.users = [];
    this.current_user = "";
  
  }

  getMessages() {
      this.messages=  JSON.parse('[   {      "sender_id": "12313133",      "sender_name": "Maxime",      "receiver_id": "20113551",      "receiver_name": "Charly",      "message": "Salut, ceci est nouveau message de Maxime pour Charly",      "datetime": "2019-09-09:09:53",      "read": true   },   {      "sender_id": "01315886",      "sender_name": "Trinh",      "receiver_id": "20113551",      "receiver_name": "Charly",      "message": "Salut, ceci est nouveau message de Trinh pour Charly",      "datetime": "2019-09-09:09:53",      "read": false   },   {      "sender_id": "20113551",      "sender_name": "Charly",      "receiver_id": "01315886",      "receiver_name": "Trinh",      "message": "Salut, ceci est nouveau message de Charly pour Trinh",      "datetime": "2019-09-09:09:53",      "read": false   },   {      "sender_id": "20113551",      "sender_name": "Charly",      "receiver_id": "12313133",      "receiver_name": "Maxile",      "message": "Salut, ceci est nouveau message de Charly pour Maxime",      "datetime": "2019-09-09:09:53",      "read": true   }]');
  }
  getUsers(){
    this.users = 
    [
    
      {
        name: "Trinh",
        image: require( '../img/avatar/trinh.png' )
      },
      {
        name: "Maxime",
        image: require( '../img/avatar/maxime.png' )
      }
    ]
  }
  onClickDiv = (column) => {
   console.log(column);
}


  render() {
    this.getMessages();
    this.getUsers();
    return [
  
      <div>
           <div class="contact-container">
       
            {this.users.map((value, index) => {
          
        
                return <img  onClick={() => this.onClickDiv(value.name)} class="avatar" src={value.image}></img>

               
            })}
        
                  
           </div>
            <div class="messages-container">
                  <ol class="messages">
                        {this.messages.map((value, index) => {
                          if(value.sender_id=="20113551"){
                            return <li class="mine">{value.message}</li>
                          }else{
                            return <li >{value.message}</li>
                          }
                          
                        })}
                    
                    </ol>
                  </div>

          </div>

      

     
    ];
  }
}


export default Message;