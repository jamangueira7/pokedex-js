const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromisses = [];

    for (let i = 1; i <= 150; i++) {
        pokemonPromisses.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    Promise.all(pokemonPromisses)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);

                accumulator += `
                        <li class="card">
                        <img class="card-image ${types[0]}" alt="${pokemon.name}" src="${pokemon.sprites.back_default}"/>
                            <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                            <p class="card-subtitle">${types.join(' | ')}</p>
                        </li>
                `;
                return accumulator;
            }, '');

            const ul = document.querySelector('[data-js = "pokedex"]');
            ul.innerHTML = lisPokemons;
        });
}

fetchPokemon();