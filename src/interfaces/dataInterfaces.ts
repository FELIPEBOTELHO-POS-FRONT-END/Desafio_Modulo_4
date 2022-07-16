export interface ExchangesItem {
  id: string;
  name: string;
  image: string;
  year_established: number;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export interface ListComponentProps {
  data: ExchangesItem[];
  filterText: string;
}
