describe('Access pages', () => {
  const LANDING_PAGE_URL = Cypress.env('LANDING_PAGE_URL');

  it('can render landing page', () => {
    cy.visit(LANDING_PAGE_URL);
    cy.get('h5').should((arr) => {
      for (const el of arr) {
        if (el.childNodes.data === 'Dashboard') expect(el).contains('Dashboard');
      }
    });
  });
});
