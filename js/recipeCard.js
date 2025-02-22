// js/recipecard.js
import { config } from '../api/config.js';

// Fetch recipe details and populate the page
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  fetchRecipeDetails(recipeId);
};

function fetchRecipeDetails(recipeId) {
  fetch(`${config.apiUrl}/${recipeId}/information?apiKey=${config.apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayRecipeDetails(data);
    })
    .catch(error => {
      // Get the error message from the response directly
      const errorData = error.message || 'No error message available.';
      const recipeDetailsDiv = document.getElementById('recipeDetails');

      // Create a <pre> element to preserve whitespace and display the HTML code
      const codeElement = document.createElement('pre');
      codeElement.textContent = errorData;
      recipeDetailsDiv.appendChild(codeElement);

      console.error('Error fetching recipe details:', error);
    });
}

function displayRecipeDetails(recipe) {
  const recipeDetailsDiv = document.getElementById('recipeDetails');
  recipeDetailsDiv.innerHTML = ''; // Clear previous details
  recipeDetailsDiv.classList.add('recipe-details');

  const title = document.createElement('h2');
  title.textContent = recipe.title;
  recipeDetailsDiv.appendChild(title);

  const image = document.createElement('img');
  image.src = recipe.image;
  image.alt = recipe.title;
  recipeDetailsDiv.appendChild(image);

  const info = document.createElement('div');
  info.classList.add('extend');
  recipeDetailsDiv.appendChild(info);

  const servings = document.createElement('p');
  servings.textContent = 'Servings: ' + recipe.servings;
  info.appendChild(servings);

  const category = document.createElement('p');
  category.textContent = 'Category: ' + recipe.dishTypes.join(', ');
  info.appendChild(category);

  const level = document.createElement('p');
  level.textContent = 'Level: ' + (recipe.veryEasy ? 'Easy' : 'Advanced');
  info.appendChild(level);

  const servingTime = document.createElement('p');
  servingTime.textContent = 'Serving Time: ' + recipe.readyInMinutes + ' min';
  info.appendChild(servingTime);

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients:';

  const ingredientsList = document.createElement('ul');
  recipe.extendedIngredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = `${ingredient.original}`;
    ingredientsList.appendChild(listItem);
  });

  const instructionsTitle = document.createElement('h3');
  instructionsTitle.textContent = 'Instructions:';

  const instructions = document.createElement('div');
  instructions.innerHTML = recipe.instructions || 'Instructions not available.';

  recipeDetailsDiv.appendChild(ingredientsTitle);
  recipeDetailsDiv.appendChild(ingredientsList);
  recipeDetailsDiv.appendChild(instructionsTitle);
  recipeDetailsDiv.appendChild(instructions);
}