// API Client for fetching data from external sources and internal APIs

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 10000
  ): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const response = await this.fetchWithTimeout(url.toString());
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// DexScreener API Client
export class DexScreenerAPI extends APIClient {
  constructor() {
    super("https://api.dexscreener.com/latest/dex");
  }

  async getPairsByChain(chainId: string) {
    return this.get(`/pairs/${chainId}`);
  }

  async searchPairs(query: string) {
    return this.get(`/search`, { q: query });
  }

  async getPairByAddress(chainId: string, pairAddress: string) {
    return this.get(`/pairs/${chainId}/${pairAddress}`);
  }
}

// CoinGecko API Client
export class CoinGeckoAPI extends APIClient {
  private apiKey?: string;

  constructor(apiKey?: string) {
    super("https://api.coingecko.com/api/v3");
    this.apiKey = apiKey;
  }

  async getTrendingCoins() {
    return this.get("/search/trending");
  }

  async getCoinMarkets(currency: string = "usd", perPage: number = 100) {
    return this.get("/coins/markets", {
      vs_currency: currency,
      per_page: perPage.toString(),
      order: "market_cap_desc",
    });
  }

  async getCoinById(coinId: string) {
    return this.get(`/coins/${coinId}`);
  }
}

// Internal API Client
export const internalAPI = new APIClient("");
export const dexScreenerAPI = new DexScreenerAPI();
export const coinGeckoAPI = new CoinGeckoAPI(
  process.env.NEXT_PUBLIC_COINGECKO_API_KEY
);
