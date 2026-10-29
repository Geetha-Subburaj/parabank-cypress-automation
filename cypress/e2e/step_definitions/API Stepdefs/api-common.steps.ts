import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ApiClient from "../../../Pages/API/api-client";

let customerId: string | number;
let accountId: string | number;
let accountId1: string | number;
let accountId2: string | number;
let responseBody: any;
let responseStatus: number;
let requestedAccountId: string | number;
let acceptJson = false;
let pendingRequest: (() => Cypress.Chainable<Cypress.Response<unknown>>) | undefined;

function getCredentials(): Cypress.Chainable<{ username: string; password: string }> {
  return cy.env(["PARABANK_USERNAME", "PARABANK_PASSWORD"]).then((env) => {
    const username = env.PARABANK_USERNAME;
    const password = env.PARABANK_PASSWORD;
    if (typeof username !== "string" || !username || typeof password !== "string" || !password) {
      throw new Error("PARABANK_USERNAME and PARABANK_PASSWORD must be configured in the Cypress environment");
    }
    return { username, password };
  });
}

function replacePathTokens(path: string): string {
  return path
    .replaceAll("{customerId}", String(customerId))
    .replaceAll("{accountId1}", String(accountId1 ?? accountId))
    .replaceAll("{accountId2}", String(accountId2))
    .replaceAll("{accountId}", String(accountId));
}

function saveResponse(response: Cypress.Response<unknown>): void {
  responseStatus = response.status;
  responseBody = response.body;
}

Given("the API base URL is configured", () => {
  cy.env(["PARABANK_API_BASE_URL"]).then((env) => {
    expect(env.PARABANK_API_BASE_URL, "PARABANK_API_BASE_URL").to.be.a("string").and.not.be.empty;
  });
});

Given("a valid customer is logged in via the API", () => {
  getCredentials().then(({ username, password }) => {
    ApiClient.login(username, password).then((response) => {
      saveResponse(response);
      expect(response.status, "API login status").to.equal(200);
      expect(response.body).to.be.an("object");
      const body = response.body as Record<string, unknown>;
      expect(body.id, "customer id from login").to.exist;
      customerId = body.id as string | number;
    });
  });
});

Given("the customerId is stored for subsequent requests", () => {
  expect(customerId, "customerId").to.exist;
});

Given("the customerId and a source accountId are stored for subsequent requests", () => {
  expect(customerId, "customerId").to.exist;
  ApiClient.request("GET", `customers/${customerId}/accounts`, { headers: { Accept: "application/json" } }).then((response) => {
    saveResponse(response);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").and.not.be.empty;
    const accounts = response.body as Array<Record<string, unknown>>;
    accountId = accounts[0].id as string | number;
    accountId1 = accountId;
    expect(accountId, "source account id").to.exist;
  });
});

Given("the customerId and accountId are stored for subsequent requests", () => {
  expect(customerId, "customerId").to.exist;
  ApiClient.request("GET", `customers/${customerId}/accounts`, { headers: { Accept: "application/json" } }).then((response) => {
    saveResponse(response);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").and.not.be.empty;
    accountId = (response.body as Array<Record<string, unknown>>)[0].id as string | number;
  });
});

Given("the first account ID is obtained from the customer accounts list", () => {
  ApiClient.request("GET", `customers/${customerId}/accounts`, { headers: { Accept: "application/json" } }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").and.not.be.empty;
    accountId = (response.body as Array<Record<string, unknown>>)[0].id as string | number;
    requestedAccountId = accountId;
  });
});

Given("the customer has at least two accounts", () => {
  ApiClient.request("GET", `customers/${customerId}/accounts`, { headers: { Accept: "application/json" } }).then((response) => {
    expect(response.status).to.equal(200);
    const accounts = response.body as Array<Record<string, unknown>>;
    expect(accounts.length).to.be.at.least(2);
    accountId1 = accounts[0].id as string | number;
    accountId2 = accounts[1].id as string | number;
    accountId = accountId1;
  });
});

When("a GET request is sent to {string}", (path: string) => {
  const urlPath = replacePathTokens(path);
  pendingRequest = () => ApiClient.request("GET", urlPath, { headers: acceptJson ? { Accept: "application/json" } : {} });
});

When("a GET request is sent to {string} with valid credentials", (path: string) => {
  pendingRequest = () => getCredentials().then(({ username, password }) => {
    const resolved = path.replace("{username}", encodeURIComponent(username)).replace("{password}", encodeURIComponent(password));
    return ApiClient.request("GET", resolved, { headers: { Accept: "application/json" } });
  });
});

When("a POST request is sent to {string}", (path: string) => {
  const urlPath = replacePathTokens(path);
  pendingRequest = () => ApiClient.request("POST", urlPath, { headers: acceptJson ? { Accept: "application/json" } : {} });
});

When("a POST request is sent to {string} with updated profile fields:", (path: string, table: any) => {
  const form: Record<string, string> = {};
  table.hashes().forEach((row: { field: string; value: string }) => { form[row.field] = row.value; });
  const urlPath = replacePathTokens(path);
  pendingRequest = () => ApiClient.request("POST", urlPath, {
    form: true,
    body: form,
    headers: acceptJson ? { Accept: "application/json" } : {},
  });
});

When("the {string} header is set", (header: string) => {
  acceptJson = header.toLowerCase() === "accept: application/json";
  if (!pendingRequest) throw new Error("No pending API request exists before setting the header");
  pendingRequest().then((response) => {
    saveResponse(response);
    pendingRequest = undefined;
  });
});

Then("the response status is {int}", (status: number) => {
  expect(responseStatus, "HTTP response status").to.equal(status);
});

Then("the response body is a non-empty JSON array", () => {
  expect(responseBody).to.be.an("array").and.not.be.empty;
});

Then("the response body is a JSON array", () => {
  expect(responseBody).to.be.an("array");
});

Then("the account {string} in the response matches the requested account ID", (field: string) => {
  expect((responseBody as Record<string, unknown>)[field]).to.equal(Number(requestedAccountId));
});

Then('the account "customerId" matches the customer\'s ID', () => {
  expect(Number((responseBody as Record<string, unknown>).customerId)).to.equal(Number(customerId));
});

Then('the response body contains a new account "id"', () => {
  expect(responseBody).to.be.an("object");
  expect((responseBody as Record<string, unknown>).id).to.exist;
  accountId = (responseBody as Record<string, unknown>).id as string | number;
});

Then('the account "type" in the response is {string}', (type: string) => {
  expect(String((responseBody as Record<string, unknown>).type).toUpperCase()).to.contain(type);
});

Then("the response body contains a customer {string}", (field: string) => {
  expect((responseBody as Record<string, unknown>)[field]).to.exist;
});

Then("the response body contains {string}", (field: string) => {
  expect((responseBody as Record<string, unknown>)[field]).to.exist;
});

Then("the response body contains {string} matching the customerId", (field: string) => {
  expect(Number((responseBody as Record<string, unknown>)[field])).to.equal(Number(customerId));
});

Then('the response body contains a nested "address" object', () => {
  expect((responseBody as Record<string, unknown>).address).to.be.an("object");
});

Then("the address contains {string}", (field: string) => {
  expect(((responseBody as Record<string, unknown>).address as Record<string, unknown>)[field]).to.exist;
});

Then('the response body contains an "approved" field of type boolean', () => {
  expect((responseBody as Record<string, unknown>).approved).to.be.a("boolean");
});

Then('the "approved" field may be false for large loans with insufficient down payment', () => {
  expect((responseBody as Record<string, unknown>).approved).to.be.a("boolean");
});

Then('the response body contains a "loanProviderName" field', () => {
  expect((responseBody as Record<string, unknown>).loanProviderName).to.exist;
});


When('the user transfers {string} from account A to account B via API', (amount: string) => {
  expect(accountId1).to.exist; expect(accountId2).to.exist;
    ApiClient.request('POST', `transfer?fromAccountId=${accountId1}&toAccountId=${accountId2}&amount=${encodeURIComponent(amount)}`, { headers: { Accept: 'application/json' } }).then((response) => {
    expect(response.status, 'transfer API status').to.eq(200);
  });
});
Then('the transactions list contains a transaction with amount {string}', (amount: string) => {
  expect(responseBody).to.be.an('array');
  const rows=responseBody as Array<Record<string, unknown>>;
  expect(rows.some(row => Math.abs(Number(row.amount)-Number(amount)) < 0.001)).to.equal(true);
});
Then('the transaction type is {string}', (type: string) => {
  expect(responseBody).to.be.an('array');
  const rows=responseBody as Array<Record<string, unknown>>;
  expect(rows.some(row => String(row.type).toLowerCase()===type.toLowerCase())).to.equal(true);
});
Then('if the loan is approved, the response contains a loan account ID', () => {
  const body=responseBody as Record<string, unknown>;
  if (body.approved === true) { expect(body.accountId ?? body.loanAccountId ?? body.newAccountId, 'loan account id').to.exist; }
  else { expect(body.approved).to.be.a('boolean'); }
});
