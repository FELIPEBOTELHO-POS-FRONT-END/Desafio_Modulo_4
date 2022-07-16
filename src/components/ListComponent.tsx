import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ExchangesItem,
  ListComponentProps,
} from "src/interfaces/dataInterfaces";

const ListComponent = ({ data, filterText }: ListComponentProps) => {
  const [filteredList, setFilteredList] = useState<ExchangesItem[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredList(
        data.filter((item: ExchangesItem) =>
          item.name
            .toLocaleLowerCase()
            .includes(filterText.toLowerCase().trim())
        )
      );
    } else {
      setFilteredList([]);
    }
  }, [data, filterText]);

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>Sem Resultados</div>;
  }
  return (
    <div>
      {filterText !== "" && (
        <div>
          Exibindo {filteredList.length} de {data.length}
        </div>
      )}
      <Box
        display="flex"
        component="ul"
        flexWrap="wrap"
        justifyContent="center"
      >
        {filteredList.map((item) => (
          <Card
            role="listitem"
            key={item.id}
            sx={{ maxWidth: 370, padding: "10px", margin: "10px" }}
            variant="outlined"
          >
            <CardActionArea>
              <Box display="flex" justifyContent="center">
                <Image
                  height="50px"
                  width="50px"
                  src={
                    item.image.includes("http")
                      ? item.image
                      : "/missing_small.png"
                  }
                />
              </Box>
              <CardContent>
                <Typography
                  role="heading"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ano de Criação: {item.year_established}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  País: {item.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pontuação: {item.trust_score}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Volume de trade (24 horas): {item.trade_volume_24h_btc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ListComponent;
