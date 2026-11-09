import { useState } from 'react';
import './App.css';

// 1. MOCK_RECIPES: A hardcoded array to test our UI without needing the Spoonacular API yet.
const MOCK_RECIPES = [
  { id: 1, title: "Chocolate Chip Cookies", readyInMinutes: 45, tags: ["dessert", "cookie"] },
  { id: 2, title: "Chicken Noodle Soup", readyInMinutes: 30, tags: ["soup", "chicken"] },
  { id: 3, title: "Holiday Roast", readyInMinutes: 120, tags: ["main", "christmas"] }
];

function App() {
  // 2. React State (useState Hooks)
  const [searchTerm, setSearchTerm] = useState('');
  const [maxTime, setMaxTime] = useState(60);
  const [recipes, setRecipes] = useState(MOCK_RECIPES);

  // 3. handleSearch: Intercepts the form submit and filters the array
  const handleSearch = (event) => {
    event.preventDefault();
    
    const filtered = MOCK_RECIPES.filter(recipe => {
      // Right now, this only checks if the title matches the search term
      const matchesTitle = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTime = recipe.readyInMinutes <= maxTime;
      
      return matchesTitle && matchesTime;
    });
    
    setRecipes(filtered);
  };

  return (
    <div className="app-container">
      <h1>Recipe Search</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search recipes (e.g., 'soup')..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={maxTime} onChange={(e) => setMaxTime(Number(e.target.value))}>
          <option value={15}>15 Minutes</option>
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>60 Minutes</option>
          <option value={120}>120 Minutes</option>
        </select>
        
        <button type="submit">Search</button>
      </form>
      
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>Prep time: {recipe.readyInMinutes} mins</p>
            <p>Tags: {recipe.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;