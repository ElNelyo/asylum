import React from "react";
import ReactDOM from 'react-dom';


class Message extends React.Component {
   

 

  constructor(props) {
    super(props);
    
    this.users = [];
    this. state = {messages: [], current_user : "none", my_id:"20113551",message:""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
    this.getMessages();
    this.getUsers();
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }
  
  handleSubmit(event) {
   // Nouveau message

  
   let new_message = new Array();
   new_message["sender_id"]= this.state.my_id;
   new_message["sender_name"]= "Charly";
   new_message["receiver_id"]= this.state.current_user;
   new_message["message"] = this.state.message;
   new_message["datetime"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
   new_message["read"] = false;
   var my_messages = this.state.messages
   my_messages.push(new_message);
  
   this.setState({messages: my_messages}, function () {
     console.log(this.state.messages)
   });
   event.preventDefault();
  }

  componentWillUnmount = () =>{
    return this.setState({current_user: "none"}, function () {
      console.log(this.state.current_user);
  });
  }
  getMessages() {
    this.state.messages=  JSON.parse('[   {      "sender_id": "12313133",      "sender_name": "Maxime",      "receiver_id": "20113551",      "receiver_name": "Charly",      "message": "Salut, ceci est nouveau message de Maxime pour Charly",      "datetime": "2019-09-09:09:53",      "read": true   },   {      "sender_id": "01315886",      "sender_name": "Trinh",      "receiver_id": "20113551",      "receiver_name": "Charly",      "message": "Salut, ceci est nouveau message de Trinh pour Charly",      "datetime": "2019-09-09:09:53",      "read": false   },   {      "sender_id": "20113551",      "sender_name": "Charly",      "receiver_id": "01315886",      "receiver_name": "Trinh",      "message": "Salut, ceci est nouveau message de Charly pour Trinh",      "datetime": "2019-09-09:09:53",      "read": false   },   {      "sender_id": "20113551",      "sender_name": "Charly",      "receiver_id": "12313133",      "receiver_name": "Maxile",      "message": "Salut, ceci est nouveau message de Charly pour Maxime",      "datetime": "2019-09-09:09:53",      "read": true   }]');
  }
  getUsers(){
    this.users = 
    [
    
      {
        name: "Maxime",
        image: require( '../img/avatar/maxime.png' ),
        id:"12313133"
      },
      {
        name: "Trinh",
        image: require( '../img/avatar/trinh.png' ),
        id:"01315886"
      }
    ]
  }
  onClickDiv = (id) => {
    console.log(id)
    return this.setState({current_user: id}, function () {
      console.log(this.state.current_user);
  });
  
}


  render() {
 

    var messages;
    if(this.state.current_user!= "none"){
      messages = <div class="messages-container">
      <ol class="messages">
            {this.state.messages.map((value, index) => {
              if(value.receiver_id==this.state.my_id && value.sender_id == this.state.current_user){
                return <li >{value.message}</li>
              }else if(value.receiver_id ==  this.state.current_user && value.sender_id == this.state.my_id ){
                
                return <li class="mine">{value.message}</li>
              }
              
            })}
        
        </ol>
      </div>
  
    }else{
      messages = <div>Veuillez choisir un contact</div>
    }
    
    let contacts;
    contacts = <div class="contact-container">
       
    {this.users.map((value, index) => {
        return <img  onClick={() => this.onClickDiv(value.id)} class="avatar" src={value.image}></img>

    })}
          
        
   </div>

   let form_send_message;
   if(this.state.current_user!= "none"){
      form_send_message = 
      
      <div class="form">
         <form onSubmit={this.handleSubmit}>
        <label>
          <input class="send_message" type="text" value={this.state.message} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Envoyer" />
      </form>


    </div>
   }

   

    return [
  
      <div>
           
           {contacts}
           {messages}
           {form_send_message}

      </div>

      

     
    ];
  }
}


export default Message;