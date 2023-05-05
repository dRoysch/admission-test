import { useEffect, useState } from 'react';
import PokemonRepository from '../repositories/pokemon.repository';


export default function usePokemon() {
    const [loading, setLoading] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [types, setTypes] = useState([]);
    const [friends, setFriends] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const pokemonRepository = new PokemonRepository()

    const getPokemons = async () => {
        setLoading(true);
        try {
            const pokemonList = await pokemonRepository.getAll()
              setPokemonList(pokemonList)
              setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
        
    }

    const getTypes = async () => {
        setLoading(true);
        try {
            const typeList = await pokemonRepository.getTypes()
                setTypes(typeList)
              setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
        
    }

    useEffect(() => {
        getPokemons()
        getTypes()
    }, [])

    return {
        loading,
        pokemonList,
        pokemon,
        types,
        friends,
        setPokemonList: (payload) => {
            setPokemonList(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getPokemons,
        getTypes,

        getPokemon: async (pokemonURL) => {
            setLoading(true)
            const {
                id,
                name,
                sprites,
                types,
                height,
                weight,
                base_experience
            } = await pokemonRepository.getPokemon(pokemonURL)
            setPokemon({
                id,
                name,
                image: sprites.front_default,
                images: Object.values(sprites).filter(elem => typeof elem === "string"),
                types: types.map(elem => {
                    return {
                        ...elem.type
                    }
                }),
                height,
                weight,
                base_experience,
                description: '',
                friends: []
            })
            setLoading(false)
        },

        getPokemonByName: async (pokemonName) => {
            setLoading(true)
            const pokemonSelected = pokemonList.find(elem => elem.name === pokemonName)
            if (!pokemonSelected) return
            const {
                id,
                name,
                sprites,
                types,
                height,
                weight,
                base_experience
            } = await pokemonRepository.getPokemon(pokemonSelected.url)
            setPokemon({
                id,
                name,
                image: sprites.front_default,
                images: Object.values(sprites).filter(elem => typeof elem === "string"),
                types: types.map(elem => {
                    return {
                        ...elem.type
                    }
                }),
                height,
                weight,
                base_experience,
                description: '',
                friends: []
            })
            setLoading(false)
        },

        getFriendsByType: async (typesSelected) => {
            setLoading(true)
            let response = []
            const typeList = types.filter(elem => typesSelected.some(obj => obj === elem.name))

            for (let typ of typeList) {
            const { pokemon } = await pokemonRepository.getPokemon(typ.url)
            
            const friendList = pokemon.map(elem => {
                return {
                    ...elem.pokemon
                }
            })
            response = [...response, ...friendList]
            
            }
            setFriends(response)
            setLoading(false)
            return response
        },
    };
}