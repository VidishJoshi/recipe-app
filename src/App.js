import React, {Component, useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "2700d545";
  const APP_KEY = "a9b8f5cf47b30214eac3c9856958da5b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(`chicken`)
  const [key, setKey] = useState(1);

  useEffect( () => {
    getRecipes();

  }, [query]); 
  //the second argument of the empty array makes the effect run only once
  // that is when the first time the page is rendered
  // without the second argument of empty array, the effect is re-rendered every time
  // an event, such as counter++, occurs
  // if we pass argument of some State in the array, such as [counter], than the effect
  // is rendered only when that State is run.

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json(); //await is necesary as the the data from API may not come instantly and actually take some time
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={getKey => {return (setKey(key+1));}}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} i
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;
