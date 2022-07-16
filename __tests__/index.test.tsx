import { render, screen, within } from "@testing-library/react";
import ListComponent from "../src/components/ListComponent";
import { MockData } from "../src/MockData";
import { ExchangesItem } from "src/interfaces/dataInterfaces";

describe("Home", () => {
  it("should render the list correctly", () => {
    render(
      <ListComponent data={MockData as ExchangesItem[]} filterText={""} />
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(2);

    (MockData as ExchangesItem[]).forEach(
      (mockItem: ExchangesItem, index: number) => {
        const item = within(listItems[index]);

        item.getByRole("heading", { name: mockItem.name });
        mockItem.year_established &&
          item.getByText(
            "Ano de Criação: " + String(mockItem.year_established)
          );
        mockItem.country && item.getByText("País: " + mockItem.country);
        mockItem.trust_score &&
          item.getByText("Pontuação: " + String(mockItem.trust_score));
        mockItem.trade_volume_24h_btc &&
          item.getByText(
            "Volume de trade (24 horas): " +
              String(mockItem.trade_volume_24h_btc)
          );
      }
    );
  });
  it("should filter correctly", () => {
    render(
      <ListComponent data={MockData as ExchangesItem[]} filterText={"okx"} />
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);

    const nodeItem = within(listItems[0]);
    nodeItem.getByRole("heading", { name: /okx/i });
  });
  it("should display Not Result for empty data", () => {
    render(<ListComponent data={[]} filterText={""} />);

    screen.getByText(/sem resultados/i);
  });
});
