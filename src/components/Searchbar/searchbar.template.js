export function getSearchbar(state) {
  const {searchQuery} = state
  return `
    <div class="searchbar__input">
      <input value="${searchQuery}" placeholder="Поиск..." type="text">
      <button data-action="search" class="searchbar__btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
  `
}
