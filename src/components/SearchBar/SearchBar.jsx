import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return alert('Please enter your query');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

