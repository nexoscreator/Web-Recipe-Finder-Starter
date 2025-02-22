import { fetchRecipes, displayRecipes } from './searchForm.js';

// Define variables to store DOM elements
const searchForm = document.getElementById('search-form');
const ingredient = document.getElementById('search-input');
const loading = document.getElementById('loading');
const progressBar = document.getElementById('progress-bar');
//  const diet = document.getElementById('dietSelect').value;

// Function to simulate progress bar animation
function animateProgressBar() {
  progressBar.style.width = '0';
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width += 10; // Adjust this value to control the speed
      progressBar.style.width = width + '%';
    }
  }, 100); // Adjust this value to control the frequency of updates
}

// Function to handle form submission
function handleFormSubmit() {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Show the loading indicator and start the progress bar animation
    const recipeContainer = document.getElementById('recipe-results');
    recipeContainer.innerHTML = '';
    loading.style.display = 'flex';
    animateProgressBar();

    // Get user input from form fields
    const ingredients = ingredient.value;
    //  const queryString = `ingredients=${encodeURIComponent(ingredientsInput)}&diet=${encodeURIComponent(dietaryInput)}`;

    await fetchRecipes(ingredients)
      .then(recipes => {
        // Hide the loading indicator
        loading.style.display = 'none';

        if (recipes) {
          displayRecipes(recipes);
        } else {
          console.error('Failed to fetch recipes');
        }
      })
      .catch(error => {
        // Hide the loading indicator even if there's an error
        loading.style.display = 'none';
        console.error('Error fetching recipes:', error);
      });
  });
}

handleFormSubmit();
feedbackMessage.textContent = 'No recipes found. Please try different ingredients.';
recipeContainer.appendChild(feedbackMessage);