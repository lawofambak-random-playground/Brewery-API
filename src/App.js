import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [input, setInput] = useState("");
  const [breweries, setBreweries] = useState([]);
  const [emptyResults, setEmptyResults] = useState(false);

  // Fetching data from API and storing data in state
  const getBreweries = () => {
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${input}`)
      .then(response => response.json())
      .then(data => {
        if (data.length < 1) {
          setEmptyResults(true);
        }
        setBreweries(data)
      })
      .catch(error => {
        window.alert(error.message);
      });
  };

  // Clears state to default state
  const clearResults = () => {
    setBreweries([]);
    setInput("");
    setEmptyResults(false);
  };

  // Mapping over breweries array stored in state to get display details
  const breweriesArray = breweries.map(brewery => (
    <li key={brewery.id}>
      <h1 className="BreweryName">{"🍺" + brewery.name}</h1>
      <h3 className="BreweryLocation">{brewery.city + ", " + brewery.state}</h3>
      {brewery.website_url ? (<a className="BreweryWebsite" href={brewery.website_url}>{brewery.website_url}</a>)
        : (<p className="BreweryWebsite">No Website Found</p>)}
    </li>
  ));

  return (
    <div className="App">
      <Header />
      <main className="Main">
        <p className="SearchText">Search for a brewery</p>
        <div className="InputSection">
          <input className="Input" type="text" placeholder="Search keyword" value={input} onChange={e => setInput(e.target.value)} />
          <button className="SearchButton" onClick={getBreweries}>Search</button>
          <button className="ClearButton" onClick={clearResults}>Clear</button>
        </div>
        <div className="Results">
          {emptyResults === false ? (<ul className="BreweryList">{breweriesArray}</ul>)
            : (<p className="NoResults">No Results Found</p>)}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
