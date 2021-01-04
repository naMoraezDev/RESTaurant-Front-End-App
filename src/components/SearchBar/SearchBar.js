import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.sortByOptions = {
      'Melhor Resultado': 'best_match',
      'Melhor Avaliado': 'rating',
      'Mais Avaliado': 'review_count'
    };
  };

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    };
    return '';
  };

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  };

  handleTermChange(event) {
    this.setState({term: event.target.value});
  };

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  };

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  };

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (<li className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue} 
        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
        {sortByOption} </li>
      );
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Que tipo de comida você quer?" onChange={this.handleTermChange} />
          <input placeholder="Onde?" onChange={this.handleLocationChange}/>
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Buscar</a>
        </div>
      </div>
    );
  };
};

export default SearchBar;