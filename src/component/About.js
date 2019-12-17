import React from "react";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
class About extends React.Component {





  render() {
    var myElement = <div style={{ width: "100%", height: 'auto' }}>
    <ResponsiveEmbed aspectRatio="16by9">
      <embed type="image/svg+xml" src="http://195.154.150.105/asylum/" />
    </ResponsiveEmbed>
  </div>
    
    
//    <iframe src="http://195.154.150.105/asylum/" style={{ width: 100%, height: 'auto' }}></iframe>;
       return [
       
        <div>

        
        
        {myElement}

      </div>




    ];

  }



}


export default About;