// js/searchForm.js
import { config } from '../api/config.js';

// Function to fetch recipes from the API
async function fetchRecipes(ingredients) {
  try {
    const response = await fetch(`${config.apiUrl}/findByIngredients?ingredients=${ingredients}&apiKey=${config.apiKey}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your API key.';
          break;
        case 404:
          errorMessage = 'Recipes not found. Please try different ingredients.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = 'Something went wrong. Please try again.';
      }
    }
    console.error('Error fetching recipes:', error);
    alert(errorMessage);
    return null;
  }
}


function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-results');
  recipeContainer.innerHTML = ''; // Clear previous content

  if (recipes && recipes.length > 0) {
    recipes.forEach(recipe => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = recipe.image;
      recipeCard.appendChild(image);

      const info = document.createElement('div');
      info.classList.add('recipe-info');
      recipeCard.appendChild(info);

      const title = document.createElement('h2');
      title.textContent = recipe.title;
      info.appendChild(title);

      const detailsLink = document.createElement('a');
      detailsLink.href = `recipe.html?id=${recipe.id}`;
      detailsLink.textContent = 'View Details';
      info.appendChild(detailsLink);

      const ingredientsList = document.createElement('ul');
      recipe.usedIngredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient.originalString;
        ingredientsList.appendChild(listItem);
      });

      recipeCard.appendChild(ingredientsList);
      recipeContainer.appendChild(recipeCard);
    });
  } else {
    feedbackMessage.textContent = 'No recipes found. Please try different ingredients.';
    recipeContainer.appendChild(feedbackMessage);
  }
}

export { fetchRecipes, displayRecipes };