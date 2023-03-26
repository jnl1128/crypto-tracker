import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
    coinId: string;
}

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

function Chart({ coinId }: IChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["chart", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
    return (
        <>
            {isLoading ? (
                "Loading..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false,
                        },
                        stroke: {
                            curve: "smooth",
                            width: 5,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map(price => price.time_close),
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#9b59b6"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: value => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </>
    );
}

export default Chart;
