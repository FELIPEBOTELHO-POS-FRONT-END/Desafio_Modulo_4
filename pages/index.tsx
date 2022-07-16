import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../src/services/apiFetchservice";
import ListComponent from "../src/components/ListComponent";
import { ExchangesItem } from "src/interfaces/dataInterfaces";
import { Box, Button, TextField } from "@mui/material";

export default function Home() {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [filterText, setFilterText] = useState("");
  const itensPerPage = 100;

  const { data, error } = useSWR(
    `https://api.coingecko.com/api/v3/exchanges/?per_page=100&page=${pageIndex}`,
    fetcher
  );

  if (error) {
    return <div>Error...</div>;
  }
  return (
    <Box padding={5}>
      <Box display="flex" flex-direction="row" justifyContent="space-between">
        <Button
          role="button"
          variant="outlined"
          onClick={() => {
            setFilterText("");
            setPageIndex((oldValue) => oldValue - 1);
          }}
          disabled={pageIndex === 1}
        >
          Página Anterior
        </Button>
        <Button
          role="button"
          variant="outlined"
          onClick={() => {
            setFilterText("");
            setPageIndex((oldValue) => oldValue + 1);
          }}
          disabled={data && data.length < itensPerPage}
        >
          Próxima Página
        </Button>
      </Box>

      <Box padding={2} display="flex">
        <TextField
          variant="standard"
          fullWidth
          label="Filtre por Nome"
          value={filterText}
          onChange={(event) => setFilterText(event.target.value)}
        />
      </Box>
      <Box>
        <ListComponent data={data as ExchangesItem[]} filterText={filterText} />
      </Box>
    </Box>
  );
}
