<template>
  <div v-if="pokemon">
    <h2>Score: {{score}}</h2>
    <h1>Quién es este pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon?.id" :showPokemon="showPokemon" :isCorrect="isCorrect"/>
    <PokemonOptions :pokemonsArray = "pokemonsArray" @selection="checkAnswer"/>
    <!-- Show div messages if answer is correct or not -->
    <div v-if="isLoading">
      <h1>Cargando...</h1>
    </div>
    <div v-else-if="submited && isCorrect">
      <h1>Correcto!</h1>
    </div>
    <div v-else-if="submited && !isCorrect">
      <h1>Incorrecto! El pokemón correcto era: {{pokemon.name}}</h1>
    </div>
  </div>
  
</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '@/components/PokemonPicture.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions.js'

export default {
  components: {
    PokemonOptions,
    PokemonPicture
  },
  data() {
    return {
      pokemonsArray: [],
      pokemon: null,
      showPokemon: false,
      submited: null,
      score: 0,
      isCorrect: null,
      isLoading: false
    }
  },
  methods: {
    async getPokemons() {
      const pokemons = await getPokemonOptions()
      this.pokemonsArray = pokemons
      this.pokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
    },
    checkAnswer(pokemonId){
      this.submited = true;
      this.showPokemon = true;
      if(pokemonId === this.pokemon.id){
        this.score++
        this.isCorrect = true
      } else {
        this.isCorrect = false
      }

      setTimeout(() => {

        this.getPokemons()
        this.showPokemon = false;
        this.submited = false;
      }, 2000);
    }
  },
  mounted() {
    this.getPokemons()
  }
}
</script>

<style>

</style>