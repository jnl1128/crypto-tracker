// export async function fetchCoins() {
//     const response = await fetch("https://api.coinpaprika.com/v1/coins");
//     const json = await response.json();
//     return json;
// }

export async function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
}

export async function fetchCoinInfo(coinId: string) {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(response => response.json());
}
export async function fetchCoinTickers(coinId: string) {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response => response.json());
}
