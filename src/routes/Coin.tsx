import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
    coinId: string;
}

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center; // 가로 정렬
    align-items: center; // 세로 정렬
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.h1`
    text-align: center;
`;

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

    span: first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${props => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
    a {
        display: block;
    }
`;

interface RouteState {
    name: string;
}
interface ITag {
    coin_counter: number;
    ico_counter: number;
    id: string;
}

interface ITeam {
    id: string;
    name: string;
    position: string;
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    contracts: object;
    logo: string;
    parent: object;
    tags: ITag[];
    team: ITeam[];
    description: string;
    message: object;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface ITickersData {
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
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

function Coin() {
    // const { coinId } = useParams<{ coinId: string }>();
    const { coinId } = useParams<RouteParams>();

    // //react-router-dom이 보내주는 location object에 접근
    // //state는 coins화면을 열 때와 coin 화면으로 넘어갈 때 생성
    const { state } = useLocation<RouteState>();

    // const [info, setInfo] = useState<IInfoData>();
    // const [priceInfo, setPriceInfo] = useState<IPriceData>();

    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
        refetchInterval: 5000,
    });

    const loading = infoLoading || tickersLoading;

    return (
        // state는 Coins 컴포넌트에서 넘어온 것
        // 따라서 Coins 컴포넌트에서 Link 를 클릭해서 넘어오지 않고 url을 직접 입력해서 Coin 컴포넌트가 렌더링된다면
        // state는 undefined일 것
        // 예외 처리를 위한 ?를 붙여주자: state가 null이나 undefined가 아니면 state.name을 보여주고, 그렇지 않으면 "Loading"을 보여주라
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</title>
            </Helmet>

            <Header>
                <Title>{state?.name ? state.name : loading ? "loading..." : infoData?.name}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    {/* 한번에 한 컴포넌트만 렌더링되길 바라니까 Switch 사용 */}
                    <Tabs>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                    </Tabs>

                    <Switch>
                        <Route path={`/:coinId/price`}>
                            <Price />
                        </Route>
                        <Route path={`/:coinId/chart`}>
                            <Chart coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}

export default Coin;
