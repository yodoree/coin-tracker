import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Modal = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

interface ChildProps {
  coinId: string;
  tickersData: {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_30m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_1y: number;
        ath_price: number;
        ath_date: string;
        percent_from_price_ath: number;
      };
    };
  };
}

function Price() {
  const {
    tickersData: {
      quotes: { USD },
    },
  } = useOutletContext<ChildProps>();
  console.log(USD);
  return (
    <>
      <Overview>
        <OverviewItem>
          <span>Today's 수익률</span>
        </OverviewItem>

        <OverviewItem>
          <Modal color={USD.percent_change_24h < 0 ? "red" : "blue"}>
            {USD.percent_change_24h}
          </Modal>
        </OverviewItem>
      </Overview>
    </>
  );
}

export default Price;
