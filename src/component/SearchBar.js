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
            
            <div className="search">
                  <input onChange={event => this.onInputChange(event.target.value)} placeholder='Search...' class='js-search' type="text"/>
                            <i class="fa fa-search"></i> 
            </div>
        );
    }
}

export default SearchBar;