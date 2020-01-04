import React from 'react';
class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
        
     
            <input onChange={event => this.onInputChange(event.target.value)}
              type="text"
              className="compose-input"
              placeholder="Entrez votre gif"
            />
    
    
            
        );
    }
}

export default SearchBar;