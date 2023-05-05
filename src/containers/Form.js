import React, { useEffect, useState } from "react";
import Text from "../components/Text";
import Select from "../components/Select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from "@mui/material";
import usePokemon from "../hooks/usePokemon";
import StandardImageList from "../components/ImageList";

// * use spritesTitles to set the titles to Images

const spriteTitles = {
  back_default: "Macho posterior",
  back_female: "Hembra posterior",
  back_shiny: "Macho brillante posterior",
  back_shiny_female: "Hembra brillante posterior",
  front_default: "Macho frontal",
  front_female: "Hembra frontal",
  front_shiny: "Macho frontal brillante",
  front_shiny_female: "Hembra frontal brillante",
};

export default function Form(props) {
  const location = useLocation();
  // * Use navigate to return root path
  const navigate = useNavigate();

  const { pokemonName } = useParams();
  const { pokemonList, pokemon, getPokemonByName, getFriendsByType, types, friends } = usePokemon()

  const initialValues = {
    name: '',
    description: '',
    types: [],
    friends: [],
    image: '',
    pokemonRef: pokemonName
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'types') {
      getFriendsByType(value)
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [formValues, setFormValues] = useState(initialValues);
  const handleSubmit = (event) => {
    event.preventDefault();
    const pokemonList = JSON.parse(localStorage.getItem('pokemonSelected'))
    if (!pokemonList) {
      localStorage.setItem('pokemonSelected', JSON.stringify([formValues]));
      return navigate('/')
    }
    localStorage.setItem('pokemonSelected', JSON.stringify([...pokemonList, formValues]));
    navigate('/')
  };

  useEffect(() => {
    getPokemonByName(pokemonName)
  }, [pokemonName, pokemonList])

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center'}}>
      <Grid container direction="column" gap={3} width={'50%'}>
        <h1>{`Seleccionaste a ${pokemonName}`}</h1>
        <Grid item>
          <TextField
            id="name"
            name="name"
            label="New Name"
            type="text"
            value={formValues?.name}
            onChange={handleInputChange}
            sx={{ width:'100%'}}
          />
        </Grid>
        <Grid item width={'100%'}>
          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            value={formValues?.description}
            onChange={handleInputChange}
            multiline
            rows={5}
            sx={{ width:'100%'}}
          />
        </Grid>
        <Grid item sx={{ width:'100%'}}>
            <Select
              options={types}
              name= 'types'
              label='Types'
              defaultValue={formValues?.types?.map(elem => elem.name)}
              onSelect = {(e) => {
                handleInputChange(e)
              }}
            />
        </Grid>

        <Grid item sx={{ width:'100%'}}>
            <Select
              options={friends}
              name= 'friends'
              label='Friends'
              defaultValue={[]}
              onSelect = {(e) => {
                handleInputChange(e)
              }}
            />
        </Grid>

        <Grid item sx={{ width:'100%'}}>
            <StandardImageList
              list={pokemon?.images}
              handleChange={handleInputChange}
              valueSelected={formValues.image}
            />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" type="submit" style={{
            backgroundColor: "green",
            margin: "5px"
          }}>
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
