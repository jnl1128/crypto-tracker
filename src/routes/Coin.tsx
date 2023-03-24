import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

interface RouteState {
    name: string;
}

function Coin() {
    // const { coinId } = useParams<{ coinId: string }>();
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams<RouteParams>();

    //react-router-dom이 보내주는 location object에 접근
    //state는 coins화면을 열 때와 coin 화면으로 넘어갈 때 생성
    const { state } = useLocation<RouteState>();
    return (
        // state는 Coins 컴포넌트에서 넘어온 것
        // 따라서 Coins 컴포넌트에서 Link 를 클릭해서 넘어오지 않고 url을 직접 입력해서 Coin 컴포넌트가 렌더링된다면
        // state는 undefined일 것
        // 예외 처리를 위한 ?를 붙여주자: state가 null이나 undefined가 아니면 state.name을 보여주고, 그렇지 않으면 "Loading"을 보여주라
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : null}
        </Container>
    );
}

export default Coin;
