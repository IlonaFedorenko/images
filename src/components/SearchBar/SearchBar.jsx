import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './SearchBar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.query.toLowerCase().trim();
    if (!query) {
      alert('Please enter your query');
      return;
    }
    this.props.changeQuery(this.state.query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className={style.searchBar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>
          <input
            className={style.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={query}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  changeQuery: PropTypes.func.isRequired,
};
