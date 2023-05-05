import { Box, Checkbox, Chip, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import usePokemon from '../../hooks/usePokemon';

const Cell = ({
    type = 'text',
    value,
    ...props
}) => {

    return (
        <TableCell
            {...props}
        >
            {type === 'text' && value}
            {type === 'image' && <img src={value} alt="pokemon" />}
            {type === 'list' && 
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {value?.map((text) => (
                        <Chip key={text.name} label={text.name} />
                    ))}
                </Box>}
        </TableCell>
    );

}

export default Cell