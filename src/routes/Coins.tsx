import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a {
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Loader = styled.h1`
    text-align: center;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

const CoinWrapper = styled.div`
    display: flex;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

// Coins 컴포넌트 내에서의 상태는 다른 컴포넌트가 렌더링되면 모두 사라진다.
// Coins 화면에서 api를 호출한다.
// 이 방법은 Coins 화면에 접속할 때마다 api를 호출하는 문제를 야기한다.
function Coins() {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // 함수를 만든 이유: async-await 를 사용해야 해서
    //     // 즉시 실행 함수
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         if (response.ok) {
    //             const json = await response.json();
    //             setCoins(json.slice(100));
    //             setLoading(false);
    //         }
    //     })();
    // }, []);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(100).map(coin => (
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name },
                                }}
                            >
                                {/* <CoinWrapper> */}
                                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name}
                                {/* </CoinWrapper> */}
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;
