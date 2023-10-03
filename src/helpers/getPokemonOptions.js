import pokemonApi from '../api/pokemonApi';


const getRandomPokemonNumbers = () => {
  // Business rules
  const min = 1;
  const max = 650;
  const numberOptions = 4

  // solution
  const arr = [];
  while (arr.length < numberOptions) {
    const rand = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(rand) === -1) {
      arr.push(rand);
    }
  }
  return arr;
}

const getPokemonNames = async ([a, b, c, d]) => {

  const promisesArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promisesArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
}

const getPokemonOptions = async () => {
  const [a, b, c, d] = getRandomPokemonNumbers();
  const options = await getPokemonNames([a, b, c, d]);
  return options;
}

export default getPokemonOptions;