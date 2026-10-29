export function uniqueUsername(prefix = 'testuser'): string { return `${prefix}${Date.now()}${Cypress._.random(100000, 999999)}`; }
export function uniqueTestSuffix(): string { return `${Date.now()}${Cypress._.random(1000, 9999)}`; }
export function billPayeeData() { const suffix = uniqueTestSuffix(); return { name: `Test Payee ${suffix}`, address: '456 Pay Street', city: 'Paytown', state: 'NY', zip: '10001', phone: '555-0200', account: '12345', amount: '50' }; }
