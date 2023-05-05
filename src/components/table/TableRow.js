import { Checkbox, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import usePokemon from '../../hooks/usePokemon';
import CustomizedDialogs from '../Dialog';
import Cell from './TableCell';

const Row = ({
    row,
    labelId,
    handleEditButton,
    handleClick,
    isItemSelected
}) => {

    const { getPokemon, pokemon } = usePokemon()
    const [pokemonSelectd, setPokemonSelected] = useState(null)

    const validate = (value, field) => {
      if (!isItemSelected) return value
      if (!pokemonSelectd) return value
      if (field === 'types' || field === 'friends' ) {
        return pokemonSelectd[field].map(elem => {
          return {
            name: elem
          }
        })
      }
      return pokemonSelectd[field]
    }

    useEffect(() => {
      getPokemon(row.url)
    }, [row])

    useEffect(() => {
      if (!isItemSelected) return
      const pokemonList = JSON.parse(localStorage.getItem('pokemonSelected'))
      if (!pokemonList) return
      const pokemonExist = pokemonList.find(elem => elem.pokemonRef === pokemon?.name)
      if (!pokemonExist) return
      setPokemonSelected(pokemonExist)
    }, [isItemSelected])

    return (
        <TableRow
            hover
            onClick={(event) => {
            handleClick(event, pokemon?.name);
            }}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={pokemon?.name}
            selected={isItemSelected}
        >
        <TableCell padding="checkbox">
            <Checkbox color="primary" checked={isItemSelected} />
            <button onClick={handleEditButton(pokemon)}>Seleccionar</button>
        </TableCell>

        <TableCell
          id={labelId}
          scope="row"
          padding="none"
        >
          <img src={validate(pokemon?.image, 'image')} alt="pokemon"/>
        </TableCell>
        <Cell value={pokemon?.id}/>
        <Cell value={validate(pokemon?.name, 'name')}/>
        <Cell value={validate(pokemon?.types, 'types')} type={'list'}/>
        <Cell value={validate(pokemon?.friends, 'friends')} type={'list'}/>
        <Cell value={pokemon?.height}/>
        <Cell value={pokemon?.weight}/>
        <Cell value={validate(pokemon?.description,'description')}/>

      </TableRow>
    );

}

export default Row
