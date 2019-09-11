import React from "react";
import ReactDOM from 'react-dom';



class Users extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.users =[]
       
      }

    
    getUsers() {
        this.users = ["charly","maxime","trinh"];
      }
    
      render() {
          this.getUsers();
          if(this.users.length > 0 ){
            
            return React.createElement(
                "div",
                null,
                "Asylum get ", this.users.length, " members"
              
              );
          }else{
            return React.createElement(
                "div",
                null,
                "Salut ",
                this.props.name
              );
          }
        
      }
}


export default Users;