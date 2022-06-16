import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSearch }) {
    const [searchRequest, setSearchRequest] = useState('');

  const handleRequestChange = event => {
    setSearchRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchRequest.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    onSearch(searchRequest);
  };

    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.searchForm_button}>
            <span className={s.searchForm_button_label}>Search</span>
          </button>

          <input
            className={s.searchForm_input}
            type="text"
            name="searchRequest"
            value={searchRequest}
            onChange={handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
};


  Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};