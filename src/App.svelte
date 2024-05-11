<script>
	// Define the getPokemonId function to extract the Pokémon ID from its URL
	function getPokemonId(url) {
	  // Extract the ID from the end of the URL
	  const parts = url.split('/');
	  return parts[parts.length - 2];
	}
  
	let pokemons = [];
	let filteredPokemons = [];
	let searchText = '';
	let sortType = 'name'; // Default sorting type
  
	// Fetch Pokémon data from the API
	async function fetchPokemons() {
	  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
	  const data = await response.json();
	  pokemons = data.results;
	  filterPokemons(); // Apply initial filter
	}
  
	// Call fetchPokemons function when the component is mounted
	fetchPokemons();
  
	// Function to filter pokemons based on search text
	function filterPokemons() {
	  filteredPokemons = pokemons.filter(pokemon => {
		return pokemon.name.toLowerCase().includes(searchText.toLowerCase());
	  });
	}
  
	// Function to handle search input change
	function handleSearchChange(event) {
	  searchText = event.target.value;
	  filterPokemons();
	}
  
	// Function to handle sorting
	function handleSort(type) {
	  sortType = type;
	  filterPokemons();
	  if (sortType === 'name') {
		filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
	  } else if (sortType === 'id') {
		filteredPokemons.sort((a, b) => getPokemonId(a.url) - getPokemonId(b.url));
	  }
	}
</script>


  
  <main class="container mx-auto px-4 sm:px-6 md:px-8">
	<!-- Search input -->
	<input type="text" placeholder="Search Pokémon..." class="mb-4 px-4 py-2 w-full" on:input={handleSearchChange}>

	<!-- Sort buttons -->
	<div class="flex mb-4">
		<button class="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={() => handleSort('name')}>Sort by Name</button>
		<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={() => handleSort('id')}>Sort by ID</button>
	</div>

	<!-- Iterate over the filtered pokemons array and display each pokemon as a card -->
	{#each filteredPokemons as pokemon}
		<div class="pokemon-card">
			<h2>{pokemon.name}</h2>
			<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`} alt={pokemon.name} />
		</div>
	{/each}
  </main>
  
  <style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	main {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	  gap: 1rem;
	  padding: 1rem;
	}
  
	.pokemon-card {
	  background-color: #f4f4f4;
	  border-radius: 8px;
	  padding: 1rem;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	  text-align: center;
	  width: 200px;
	}
  
	.pokemon-card h2 {
	  margin-bottom: 0.5rem;
	  font-size: 1.2rem;
	}
  
	.pokemon-card img {
	  width: 100px;
	  height: 100px;
	}
  </style>
  
  