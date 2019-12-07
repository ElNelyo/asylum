import React from "react";
import request from 'superagent';
import SearchBar from './SearchBar';
import GifList from './GifList';
import { animateScroll } from "react-scroll";
import { Image, Col, Container, Row, Toast } from 'react-bootstrap'
import axios from 'axios';
import { element } from "prop-types";

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

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "options-holder"
    });
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
      console.log(this.state.messages)

    }, this.scrollToBottom);
    event.preventDefault();
  }

  UNSAFE_componentWillMount = () => {

    
    this.getUsers();
    this.state.isLoading= false;
  }
  componentWillUnmount = () => {
    return this.setState({ current_user: "none",isLoading:false }, function () {
      console.log(this.state.current_user);
    });
  }

  sendMessage(gif) {

    axios.post(`http://awesome-dev.eu:8090/messages`, {
      senderId:   this.state.my_id,
      recipientId: this.state.current_user,
      text: gif.images.downsized.url})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    let new_message = [];
    new_message["sender_id"] = this.state.my_id;
    new_message["sender_name"] = "Charly";
    new_message["receiver_id"] = this.state.current_user;
    new_message["message"] = gif.images.downsized.url;
    new_message["datetime"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
    new_message["read"] = false;
    var my_messages = this.state.messages
    my_messages.push(new_message);

    this.setState({ messages: my_messages }, function () {
      console.log(this.state.messages)
    }, this.scrollToBottom);
  }


  getMessages(id) {
    //this.setState({ messages: JSON.parse('[{"sender_id":"12313133","sender_name":"Maxime","receiver_id":"20113551","receiver_name":"Charly","message":"https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true},{"sender_id":"01315886","sender_name":"Trinh","receiver_id":"20113551","receiver_name":"Charly","message":"https://media3.giphy.com/media/xBAreNGk5DapO/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"01315886","receiver_name":"Trinh","message":"https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"12313133","receiver_name":"Maxile","message":"https://media0.giphy.com/media/71PLYtZUiPRg4/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true}]') });
    console.log("EXEMPLE")    
    console.log(JSON.parse('[{"sender_id":"12313133","sender_name":"Maxime","receiver_id":"20113551","receiver_name":"Charly","message":"https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true},{"sender_id":"01315886","sender_name":"Trinh","receiver_id":"20113551","receiver_name":"Charly","message":"https://media3.giphy.com/media/xBAreNGk5DapO/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"01315886","receiver_name":"Trinh","message":"https://media2.giphy.com/media/8vQSQ3cNXuDGo/giphy-downsized.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy-downsized.gif","datetime":"2019-09-09:09:53","read":false},{"sender_id":"20113551","sender_name":"Charly","receiver_id":"12313133","receiver_name":"Maxile","message":"https://media0.giphy.com/media/71PLYtZUiPRg4/giphy.gif?cid=ed7f48fc42831e360524111ed8c73cd1b375f0f945303dfd&rid=giphy.gif","datetime":"2019-09-09:09:53","read":true}]'));
    
   
     axios.get('http://awesome-dev.eu:8090/conversations?userId='+id,{})
    .then(response => {
            this.setState({messages: response.data,isLoading : false})
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
          
        <Col xs={12} md={4} key={index}>
          <Image  onClick={() => this.onClickDiv(value.id)} src={value.image} rounded fluid bsPrefix="avatar" />
        </Col>

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
   
    const { isLoading, all_messages } = this.state;
    
    if (this.state.current_user !== "none") {
   
      console.log("Chargement des messages")
      console.log(this.state.messages[0]);
      var messages = <div id="options-holder" className="messages-container" >
        <ol className="messages">
          
          <Container>
            <Row >
            
              {this.state.messages.map((value, index) => {
                console.log("CONVERSATION : RECEIVER ID")
                value.map((value, index) => {
                if (value.receiver_id === this.state.my_id && value.sender_id === this.state.current_user) {

                  return (


                    <Col md={12} xs={12} key={index}>
                      <div>{this.createMessageToast(value.message, value.datetime, value.sender_name, false)}</div>
                    </Col>

                  );


                } else if (value.receiver_id === this.state.current_user && value.sender_id === this.state.my_id) {

                  return (


                    <Col md={12} xs={12} key={index}>
                      <div >{this.createMessageToast(value.message, value.datetime, value.sender_name, true)}</div>
                    </Col>


                  );
                }
                return console.log("load message")
              })}
            )}

            </Row>
          </Container>
        </ol>
      </div>

    } else {
      messages = <div className="mainTitle">Veuillez choisir un contact</div>
    }

    let contacts;
    contacts = <div className="contact-container">

      <Container>
        <Row>
          <div className="space"></div>
          {this.createAddressCard()}
        </Row>
      </Container>




    </div>

    let form_send_message;
    if (this.state.current_user !== "none") {
      form_send_message =

        <div className="search">

          <SearchBar onTermChange={this.handleTermChange} />


          <GifList gifs={this.state.gifs}
            onGifSelect={selectedGif => this.sendMessage(selectedGif)} />


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