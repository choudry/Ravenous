import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import { getBusinesses } from "../../utils/yelpapi";

const App = () => {
  const [businesses, setBusinesses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("Food");
  const [location, setLocation] = useState("New York");
  const [sortByOption, setSortByOption] = useState("best_match");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (term, loc, sort) => {
    setIsLoading(true);
    setError(null); // Clear previous error

    console.log(`handleSearch called. term:${term}, loc: ${loc}, sort: ${sort}`);

    try {
      const fetchedBusinesses = await getBusinesses(term, loc, sort);
      if (fetchedBusinesses.length == 0) setError("No record found!")
      setBusinesses(formateBusinessList(fetchedBusinesses));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formateBusinessList = (businesses) => {
    return businesses.map((business) => ({
      imageSrc: business.image_url,
      name: business.name,
      address: business.location.address1,
      city: business.location.city,
      state: business.location.state,
      zipCode: business.location.zip_code,
      category: business.categories[0].title,
      rating: business.rating,
      reviewCount: business.review_count,
    }));
  }

  // Call handleSearch on component mount (optional):
  useEffect(() => {
    // Replace these with default values if needed
    handleSearch(searchTerm, location, sortByOption); 
  }, [sortByOption]);

  

  return (
    <div className={styles.App}>
      {/* <h1>ravenous</h1> */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        sortByOption={sortByOption}
        setSortByOption={setSortByOption}
        handleSearch={handleSearch}
      />
      {isLoading && <p>Loading businesses...</p>}
      {error && <p>{error}</p>}
      <BusinessList businessList={businesses} />
    </div>
  );
};

export default App;
