import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import TransferFundsPage from '../../../Pages/UI/transfer-funds.page';

Given('the user navigates to the Transfer Funds page', () => TransferFundsPage.visit());
Given('the user has at least two bank accounts', () => {
  TransferFundsPage.visit();
  TransferFundsPage.fromDropdown().find('option').should('have.length.greaterThan', 1);
  TransferFundsPage.toDropdown().find('option').should('have.length.greaterThan', 1);
});
When('the user enters {string} in the amount field', (value: string) => TransferFundsPage.enterAmount(value));
When('the user selects the first account as the source', () => TransferFundsPage.selectFirstSourceAccount());
When('the user selects the second account as the destination', () => TransferFundsPage.selectSecondDestinationAccount());
Then('the amount input field is visible', () => TransferFundsPage.amountInput().should('be.visible'));
Then('the from-account dropdown contains at least one option', () => TransferFundsPage.accountOptionCount('from').should('be.greaterThan', 0));
Then('the to-account dropdown contains at least one option', () => TransferFundsPage.accountOptionCount('to').should('be.greaterThan', 0));
Then('the heading {string} is displayed', (heading: string) => TransferFundsPage.result().should('contain.text', heading));

import ApiClient from '../../../Pages/API/api-client';
let balanceSnapshot: { sourceId: string; destinationId: string; sourceBefore: number; destinationBefore: number } | undefined;
let balanceCustomerId: string | number;
function getBalanceAccounts(): Cypress.Chainable<Array<{id: string|number; balance: number|string}>> {
  return cy.env(['PARABANK_USERNAME','PARABANK_PASSWORD']).then(({PARABANK_USERNAME,PARABANK_PASSWORD}) => {
    if(typeof PARABANK_USERNAME!=='string'||typeof PARABANK_PASSWORD!=='string') throw new Error('Credentials missing');
    return ApiClient.login(PARABANK_USERNAME,PARABANK_PASSWORD).then(login => { expect(login.status).to.eq(200); balanceCustomerId=(login.body as any).id; return ApiClient.request('GET',`customers/${balanceCustomerId}/accounts`,{headers:{Accept:'application/json'}}).then(res => { expect(res.status).to.eq(200); expect(res.body).to.be.an('array').and.have.length.greaterThan(1); return res.body as Array<{id:string|number;balance:number|string}>; }); });
  });
}
Given('the user has two accounts with known balances', () => {
  getBalanceAccounts().then(accounts => { const a=accounts[0], b=accounts[1]; balanceSnapshot={sourceId:String(a.id),destinationId:String(b.id),sourceBefore:Number(a.balance),destinationBefore:Number(b.balance)}; });
});
When('the user transfers {string} from account A to account B', (amount: string) => {
  expect(balanceSnapshot, 'balance snapshot').to.exist;
  const snap=balanceSnapshot!; TransferFundsPage.visit(); TransferFundsPage.enterAmount(amount);
  TransferFundsPage.fromDropdown().select(snap.sourceId); TransferFundsPage.toDropdown().select(snap.destinationId); TransferFundsPage.submit();
  TransferFundsPage.result().should('be.visible').and('contain.text','Transfer Complete');
});
Then('the source account balance decreases by {float}', (amount: number) => {
  expect(balanceSnapshot).to.exist; const snap=balanceSnapshot!;
  ApiClient.request('GET',`accounts/${snap.sourceId}`,{headers:{Accept:'application/json'}}).then(res => { expect(res.status).to.eq(200); expect(Number((res.body as any).balance)).to.be.closeTo(snap.sourceBefore-amount,0.01); });
});
Then('the destination account balance increases by {float}', (amount: number) => {
  expect(balanceSnapshot).to.exist; const snap=balanceSnapshot!;
  ApiClient.request('GET',`accounts/${snap.destinationId}`,{headers:{Accept:'application/json'}}).then(res => { expect(res.status).to.eq(200); expect(Number((res.body as any).balance)).to.be.closeTo(snap.destinationBefore+amount,0.01); });
});
