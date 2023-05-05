import React from "react";
import EnhancedTable from "../components/Table";
import { useNavigate } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import LoadingComponent from "../components/loading/LoadingComponent";
import { Box } from "@mui/material";

export default function Home(props) {
  const navigate = useNavigate();

  const { pokemonList, loading } = usePokemon()

  const handleEditButton = (row) => (e) => {
    e.stopPropagation();
    navigate(`form/${row.name}`);
  };

  return (
    <Box sx={{ paddingRight: 10, paddingLeft: 10, paddingTop: 4 }}>
      {!loading ? (
        <EnhancedTable
          rowsProp={pokemonList}
          handleEditButton={handleEditButton}
        />
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
}
