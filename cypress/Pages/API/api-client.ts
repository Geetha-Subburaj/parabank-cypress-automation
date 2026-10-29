export interface ApiResponse {
  status: number;
  body: unknown;
  headers: Record<string, unknown>;
}

export interface Customer {
  id: number;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface Account {
  id: number;
  customerId?: number;
  type?: string;
  balance?: number | string;
  [key: string]: unknown;
}

class ApiClient {
  private baseUrl(): Cypress.Chainable<string> {
    return cy.env(["PARABANK_API_BASE_URL"]).then((env) => {
      const value = env.PARABANK_API_BASE_URL;
      if (typeof value !== "string" || !value.trim()) {
        throw new Error("Missing PARABANK_API_BASE_URL environment variable");
      }
      return value.endsWith("/") ? value : `${value}/`;
    });
  }

  request(method: string, path: string, options: Partial<Cypress.RequestOptions> = {}) {
    return this.baseUrl().then((baseUrl) =>
      cy.request({
        method,
        url: `${baseUrl}${path.replace(/^\/+/, "")}`,
        failOnStatusCode: false,
        ...options,
      })
    );
  }

  login(username: string, password: string) {
    return this.request("GET", `login/${encodeURIComponent(username)}/${encodeURIComponent(password)}`, {
      headers: { Accept: "application/json" },
    });
  }
}
export default new ApiClient();
