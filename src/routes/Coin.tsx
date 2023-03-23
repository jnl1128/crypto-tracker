import { useParams } from "react-router-dom";
import styled from "styled-components";
interface RouteParams {
    coinId: string;
}

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
`;

function Coin() {
    // const { coinId } = useParams<{ coinId: string }>();
    const { coinId } = useParams<RouteParams>();
    return <Title>Coin {coinId}</Title>;
}

export default Coin;
