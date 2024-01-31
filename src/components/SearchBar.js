import { useState, useMemo, useEffect } from "react";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { searchMulti } from "../services/tmdbService";

export default function SearchBar() {
  const searchContainer = {
    display: "flex",
    width: { xs: "90%", sm: "100%" },
    maxWidth: 760,
    height: { xs: 27, sm: "7vmin" },
    maxHeight: 60,
    marginTop: "2.5vmax",
    "& div.MuiAutocomplete-endAdornment svg": {
      width: { xs: 10, sm: 20 },
    },
  };

  const searchInput = {
    height: "100%",
    background: "white",
    borderRadius: "40px 0 0 40px",
    "& .MuiInputBase-root": {
      height: "100%",
      padding: { xs: "0 5px", sm: "0 20px" },
      fontSize: "2vmin",
      fontWeight: 600,
    },
    "& fieldset": {
      border: "none",
    },
  };

  const searchButton = {
    width: "20%",
    height: "100%",
    fontSize: "2vmin",
    color: "#FFFFFF",
    borderRadius: "0 40px 40px 0",
    background: "#aa405b",
    "&:hover": {
      transition: "all 150ms ease-in-out",
      background: "#aa405b",
      opacity: 0.8,
    },
  };

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const updateOptions = useMemo(
    () =>
      debounce(async (query, callback) => {
        try {
          const newOptions = await searchMulti(query);
          callback(newOptions); // kembalikan hasil ketika sudah selesai
        } catch (err) {
          console.error(err);
        }
      }, 400),
    []
  );

  useEffect(() => {
    // status komponen saat terhubung
    let active = true;

    // kembalikan opsi kosong apabila inputan kosong
    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    updateOptions(inputValue, (results) => {
      // cek status komponen sebelum update
      if (active) {
        setOptions(results);
      }
    });

    // matikan status apabila komponen terlepas
    return () => {
      active = false;
    };
  }, [inputValue, updateOptions]);

  return (
    <Box sx={searchContainer}>
      <Autocomplete
        freeSolo
        id="search-bar"
        sx={{ width: "80%" }}
        options={options}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.title || option.name}
        filterOptions={(options) =>
          options.filter((item) => item.popularity >= 5)
        }
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a movie..."
            sx={searchInput}
          />
        )}
      />
      <Button sx={searchButton}>Search</Button>
    </Box>
  );
}
