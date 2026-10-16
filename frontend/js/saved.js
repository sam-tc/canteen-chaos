/* saved.js — Saved Dishes page */

const savedGrid = $('#savedGrid');
const savedStatus = $('#savedStatus');

let savedDishes = [];
let savedRequestId = 0;

function renderSavedDishes() {
  savedDishes = savedDishes.filter((dish) =>
    isFavourite(dish.id)
  );

  setText('#savedCount', `${state.favourites.length} saved`);

  if (state.favourites.length === 0) {
    savedGrid.innerHTML = '';
    showStatus(
      savedStatus,
      emptyBlock(
        'No saved dishes yet',
        'Go to Menu and tap the star on a dish to save it.'
      )
    );
    return;
  }

  if (savedDishes.length === 0) {
    savedGrid.innerHTML = '';
    showStatus(
      savedStatus,
      emptyBlock(
        'Saved dishes unavailable',
        'Check your connection and try again.'
      )
    );
    return;
  }

  hideStatus(savedStatus);
  render(savedGrid, savedDishes.map(dishCard).join(''));
}

async function loadSavedDishes() {
  const requestId = ++savedRequestId;
  savedDishes = [];
  savedGrid.innerHTML = '';

  if (state.favourites.length === 0) {
    renderSavedDishes();
    return;
  }

  setText('#savedCount', `${state.favourites.length} saved`);
  showStatus(savedStatus, '<p>Loading saved dishes...</p>');

  const dishes = [];

  for (const id of [...state.favourites]) {
    if (requestId !== savedRequestId || state.route !== 'saved') {
      return;
    }

    try {
      const dish = await api.getDish(id);
      dishes.push(dish);
    } catch (error) {
      // Continue loading other saved dishes.
    }
  }

  if (requestId !== savedRequestId || state.route !== 'saved') {
    return;
  }

  savedDishes = dishes;
  renderSavedDishes();
}

delegate(savedGrid, '[data-action]', 'click', (event, button) => {
  const card = button.closest('.dish-card');
  if (!card) return;

  const dish = savedDishes.find(
    (item) => item.id === Number(card.dataset.id)
  );

  if (!dish) return;

  switch (button.dataset.action) {
    case 'open':
      openDishModal(dish.id);
      break;

    case 'fav': {
      const isSaved = toggleFavourite(dish.id);
      toast(
        isSaved ? `Saved ${dish.name}` : `Removed ${dish.name}`,
        'info'
      );
      break;
    }

    case 'add':
    case 'inc':
    case 'dec': {
      const step = button.dataset.action === 'dec' ? -1 : 1;
      const result = addToCart(dish, step);

      if (!result.ok) {
        toast(result.reason, 'warn');
      } else if (button.dataset.action === 'add') {
        toast(`${dish.name} added`, 'ok');
      }
      break;
    }
  }
});

on('favourites', () => {
  if (state.route !== 'saved') return;

  const hasNewFavorite = state.favourites.some(
    (id) => !savedDishes.some((dish) => dish.id === id)
  );

  if (hasNewFavorite) {
    loadSavedDishes();
  } else {
    renderSavedDishes();
  }
});

on('cart', () => {
  if (state.route === 'saved') {
    renderSavedDishes();
  }
});
