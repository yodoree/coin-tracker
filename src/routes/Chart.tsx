import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChildProps {
  coinId: string;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<ChildProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  // console.log(
  //   data?.map((price) => {
  //     return { x: 1, y: [price.open, price.high, price.low, price.close] };
  //   })
  // );
  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [
                    price.open.toFixed(2),
                    price.high.toFixed(2),
                    price.low.toFixed(2),
                    price.close.toFixed(2),
                  ],
                };
              }),
            },
          ]}
          type="candlestick"
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;

// type="line"
// series={[
//   {
//     name: "price",
//     data: data?.map((price) => price.close),
//   },
// ]}
// options={{
//   theme: {
//     mode: "dark",
//   },
//   chart: {
//     height: 500,
//     width: 500,
//     toolbar: {
//       show: false,
//     },
//     background: "transparent",
//   },
//   grid: { show: false },
//   stroke: {
//     curve: "smooth",
//     width: 4,
//   },
//   yaxis: { show: false },
//   xaxis: {
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//     labels: { show: false },
//     type: "datetime",
//     categories: data?.map((price) => price.time_close),
//   },
//   fill: {
//     type: "gradient",
//     gradient: { gradientToColors: ["blue"], stops: [0, 100] },
//   },
//   colors: ["red"],
//   tooltip: {
//     y: {
//       formatter: (value) => `$ ${value.toFixed(2)}`,
//     },
//   },
// }}
