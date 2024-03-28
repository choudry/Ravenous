import React, { useState } from "react";
import styles from "./SearchBar.module.css";

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

const SearchBar = ({handleSearch, searchTerm, setSearchTerm, location, setLocation, sortByOption, setSortByOption}) => {
  

  function handleSortByChange(sortByOption) {
    setSortByOption(sortByOption);
  }

  function handleSearchTermChange({target}) {
    setSearchTerm(target.value);
  }

  function handleLocationInputChange({target}) {
    setLocation(target.value);
  }

  function handleSearchClick() {
    handleSearch(searchTerm, location, sortByOption);
  }
  
  const renderSortByOptions = () => {
    return Object.keys(sortByOptions).map((option) => {
      let sortByOptionValue = sortByOptions[option];
      return <li 
        key={sortByOptionValue} 
        value={sortByOptionValue} 
        onClick={() => {
          handleSortByChange(sortByOptionValue);
        }}
        className={ sortByOption == sortByOptionValue ? styles.active : styles.inactive }
        >
          {option}
        </li>;
    });
  };

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBarSortOptions}>
        <ul>{renderSortByOptions()}</ul>
      </div>
      <div className={styles.SearchBarFields}>
        <input placeholder="Search Businesses" onChange={handleSearchTermChange} value={searchTerm}/>
        <input placeholder="Where?" onChange={handleLocationInputChange} value={location}/>
      </div>
      <div className={styles.SearchBarSubmit} onClick={handleSearchClick}>
        <a>Let's Go</a>
      </div>
    </div>
  );
};

export default SearchBar;
