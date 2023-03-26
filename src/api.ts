// export async function fetchCoins() {
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     return json;
// }

export function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(response => response.json());
}
export function fetchCoinTickers(coinId: string) {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response => response.json());
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7; // endDate 기준 1주일 전
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then(response => response.json());
}
