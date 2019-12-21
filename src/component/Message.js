import React from "react";
import request from 'superagent';
import SearchBar from './SearchBar';
import GifList from './GifList';
import { Col, Container, Row, Toast } from 'react-bootstrap'
import axios from 'axios';


import '../assets/ConversationListItem.css';
import '../assets/ConversationList.css';
import '../assets/ConversationSearch.css';
import '../assets/Messenger.css';
import '../assets/MessageList.css'; 
import '../assets/Message.css'; 
import '../assets/Compose.css';
class Message extends React.Component {


  constructor(props) {
    super(props);

    this.users = [];
    this.state = { isLoading:true,messages: [], current_user: "none", my_id: "1", message: "", gifs: [], selectedGif: null};

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
    this.setState({ message: event.target.value });
  }


  handleSubmit(event) {
    // Nouveau message


    let new_message = [];
    new_message["sender_id"] = this.state.my_id;
    new_message["sender_name"] = "Charly";
    new_message["receiver_id"] = this.state.current_user;
    new_message["message"] = this.state.message;
    new_message["datetime"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
    new_message["read"] = false;
    var my_messages = this.state.messages
    my_messages.push(new_message);

    this.setState({ messages: my_messages }, function () {
      

    });
    
  }

  UNSAFE_componentWillMount = () => {

    
    this.getUsers();
    this.setState({ isLoading:false});
  }
  componentWillUnmount = () => {
    return this.setState({ current_user: "none",isLoading:false }, function () {
      
    });
  }

  sendMessage(gif) {



    var my_current_id = this.state.my_id
    var my_current_user = this.state.current_user
    var all_my_current_messages = this.state.messages

    axios.post(`http://awesome-dev.eu:8090/messages`, {
      senderId:   this.state.my_id,
      recipientId: this.state.current_user,
      text: gif.images.downsized.url})
    .then(response => {
        console.log("trigger");
        let new_message = [];
        new_message["senderId"] = my_current_id;
        new_message["senderUsername"] = "Charly";
        new_message["recipientId"] = my_current_user;
        new_message["text"] = gif.images.downsized.url;
        new_message["datetime"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        new_message["read"] = false;
        var my_messages = all_my_current_messages
        my_messages.push(new_message);
       
  
      this.setState({ messages: my_messages ,isLoading : false})
      

    })
    .catch(function (error) {
      console.log(error);
    });

    
    

  
  }
  


  getMessages(id) {
    //this.setState({ messages: JSON.parse('[{"sender_id":"12313133","sender_name":"Maxime","receiver_id":"20113551","receiver_name":"Charly","message":"https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true},{"sender_id":"01315886","sender_name":"Trinh","receiver_id":"20113551","receiver_name":"Charly","message":"https://media3.giphy.com/media/xBAreNGk5DapO/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"01315886","receiver_name":"Trinh","message":"https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"12313133","receiver_name":"Maxile","message":"https://media0.giphy.com/media/71PLYtZUiPRg4/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true}]') });
    console.log("EXEMPLE")    
    console.log(JSON.parse('[{"sender_id":"12313133","sender_name":"Maxime","receiver_id":"20113551","receiver_name":"Charly","message":"https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true},{"sender_id":"01315886","sender_name":"Trinh","receiver_id":"20113551","receiver_name":"Charly","message":"https://media3.giphy.com/media/xBAreNGk5DapO/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"01315886","receiver_name":"Trinh","message":"https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"12313133","receiver_name":"Maxile","message":"https://media0.giphy.com/media/71PLYtZUiPRg4/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true}]'));
    
   
     axios.get('http://awesome-dev.eu:8090/conversations?userId='+id,{})
    .then(response => {
          console.log("RECEIVE FROM API")
          console.log(response.data[0].messages)
            this.setState({messages: response.data[0].messages,isLoading : false})
     })


     .catch(function(error){
            console.log(error);
        });


      
    

   
     
  }
  getUsers() {
    this.users =
      [

        {
          name: "Maxime",
          image: require('../img/avatar/maxime.png'),
          id: "3"
        },
        {
          name: "Trinh",
          image: require('../img/avatar/trinh.png'),
          id: "2"
        }
      ]
  }
  onClickDiv = (id) => {
    this.setState({ current_user: id}, function () {
      console.log(this.state.current_user);
      })

    return  this.getMessages(id);
    

  }

  createAddressCard = () => {
    let parent = [];

    this.users.map((value, index) => {
      parent.push(
          
        <div className="conversation-list-item" onClick={() => this.onClickDiv(value.id)} src={value.image}>
        <img className="conversation-photo" src={value.image} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ value.name }</h1>
          <p className="conversation-snippet">Last message 12</p>
        </div>
      </div>
      
       

      )
      return console.log("loaded addressCard")
    });

    return parent;
  }



  createMessageToast = (message, date, sender_name, owned) => {
    let parent = []
    if (owned === true) {
      parent.push(
        <Toast className='owned'>
          <Toast.Header >
            <strong className="mr-auto">{sender_name}</strong>
            <small>{date}</small>
          </Toast.Header>
          <Toast.Body ><img src={message} alt={message}></img></Toast.Body>
        </Toast>
      );
    } else {
      parent.push(
        <Toast className='unowned'>
          <Toast.Header >
            <strong className="mr-auto">{sender_name}</strong>
            <small>{date}</small>
          </Toast.Header>
          <Toast.Body ><img src={message} alt={message}></img></Toast.Body>
        </Toast>
      );
    }

    return parent
  }
  render() {
   
    const { isLoading } = this.state;
    
    if (this.state.current_user !== "none") { 
    
     
      var messages = <div>

     

    

    
      
              {this.state.messages.map((value, index) => { 
                 if (parseInt(value.recipientId) === parseInt(this.state.my_id) && parseInt(value.senderId) === parseInt(this.state.current_user)) { 
               
                  }else{
                    return (
                      <div class="message mine start end">
                       <div className="bubble-container">
                         <div className="bubble" title="Saturday, December 21, 2019 4:36 PM">
                           <img src={value.text}></img>
                         </div>
                       </div>
                        </div>
                    
                       )
                  }
                 
              })}
             
 
             </div>
            }

      var messages2 = 
      <div class="message-list-container">
            <div class="message mine start end">
              <div class="timestamp">Saturday, December 21, 2019 4:36 PM</div>
                <div class="bubble-container">
                  <div class="bubble" title="Saturday, December 21, 2019 4:36 PM">
                    Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.</div>
                    </div>
                  </div>
                  <div class="message  start ">
                    <div class="bubble-container">
                      <div class="bubble" title="Saturday, December 21, 2019 4:36 PM">It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!</div>
                      </div>
                      </div>
      </div>


    let contacts;
    contacts = <div className="contact-container">
            <div className="conversation-list">
              {this.createAddressCard()}  
            </div>
          
                
          </div>

  
      let search;
      search = 
      
 
        <div className="search"> 
 
          <SearchBar onTermChange={this.handleTermChange} /> 
 
 
          <GifList gifs={this.state.gifs} 
            onGifSelect={selectedGif => this.sendMessage(selectedGif)} /> 
 
 
        </div> 
    

    return [
       
      <div>
        <div className="messenger">
          <div className="scrollable sidebar">
            {contacts}
            </div>
        <div className="scrollable content">
          <div className="message-list">
          <div class="message-list-container"> 
            {messages}

            <div className="compose">
              {search}
            </div>
            </div>
          </div>
        </div>
        
        
        </div>
      

      </div>




    ];
  }
}


export default Message;