const API_KEY = "LNR7-qHiNTkz4Q6NEe18-U44CLb4h4UerNJcsLYdYxV4VTLg_Ax7UQaxmXtmfz7Rbm-KO-7ny4PmdBxmRp9d-miYr1Cz39tvrh0_7OYS_sAok4h6eWwtDtw-quUEZnYx";
const BASE_URL = "https://api.yelp.com/v3/businesses/search";
const CORS_ANYWHERE_URL = "https://cors-anywhere.herokuapp.com/"

export async function getBusinesses(searchTerm, location, sortByOption) {
  const url = new URL(`${CORS_ANYWHERE_URL}${BASE_URL}?location=${location}&term=${searchTerm}&sort_by=${sortByOption}`);
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json'
  };

  try {
    const response = await fetch(url, {headers});
    if (!response.ok) {
      throw new Error(`Yelp API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.businesses;
  } catch (error) {
    console.error("Error fetching Yelp businesses:", error);
    // Consider providing a user-friendly error message or handling differently
    return []; // Or throw the error if appropriate
  }
}
