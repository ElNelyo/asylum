import React from "react";
import ReactDOM from 'react-dom';
import request from 'superagent';
import SearchBar from './SearchBar';
import GifList from './GifList';

class Message extends React.Component {
   

 

  constructor(props) {
    super(props);
    
    this.users = [];
    this. state = {messages: [], current_user : "none", my_id:"20113551",message:"",  gifs: [],  selectedGif: null};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  
  }

  
  handleTermChange(term) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=KhtIpziWuF1ivtx88xjO5xSURnHgYCPK`;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data })
  
    });
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

  componentWillMount = () =>{
      
    this.getMessages();
    this.getUsers();
  }
  componentWillUnmount = () =>{
    return this.setState({current_user: "none"}, function () {
      console.log(this.state.current_user);
  });
  }

  sendMessage(gif) {
   console.log(gif);

   let new_message = new Array();
   new_message["sender_id"]= this.state.my_id;
   new_message["sender_name"]= "Charly";
   new_message["receiver_id"]= this.state.current_user;
   new_message["message"] = gif.images.downsized.url;
   new_message["datetime"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
   new_message["read"] = false;
   var my_messages = this.state.messages
   my_messages.push(new_message);
  
   this.setState({messages: my_messages}, function () {
     console.log(this.state.messages)
   });
}


  getMessages() {
    this.state.messages=  JSON.parse('[{"sender_id":"12313133","sender_name":"Maxime","receiver_id":"20113551","receiver_name":"Charly","message":"https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true},{"sender_id":"01315886","sender_name":"Trinh","receiver_id":"20113551","receiver_name":"Charly","message":"https://media3.giphy.com/media/xBAreNGk5DapO/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"01315886","receiver_name":"Trinh","message":"https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"12313133","receiver_name":"Maxile","message":"https://media0.giphy.com/media/71PLYtZUiPRg4/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true}]');
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



render(){
 
 

    var messages;
    if(this.state.current_user!= "none"){
      messages = <div class="messages-container">
      <ol class="messages">
            {this.state.messages.map((value, index) => {
              if(value.receiver_id==this.state.my_id && value.sender_id == this.state.current_user){
                return  <img src={value.message} />
              }else if(value.receiver_id ==  this.state.current_user && value.sender_id == this.state.my_id ){
                
                return  <img class="mine" src={value.message} />
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
      
      <div class="search">

      <SearchBar onTermChange={this.handleTermChange} />
                <GifList gifs={this.state.gifs} 
                onGifSelect={selectedGif => this.sendMessage(selectedGif) } />


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