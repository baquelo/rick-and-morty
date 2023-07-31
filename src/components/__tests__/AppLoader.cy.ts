import AppLoader from '../AppLoader.vue';

describe('App Loader component tests', () => {
    const loaderContentSelector = '[data-cy=loader-content]';

    it('show  loader correctly', () => {
        cy.mount(AppLoader, { props: { show: true } });
        cy.get(loaderContentSelector).should('exist');
        cy.get(loaderContentSelector).contains('Loading...');
    });

    it('hide  loader correctly', () => {
        cy.mount(AppLoader);
        cy.get(loaderContentSelector).should('exist');
        cy.get(loaderContentSelector).not('span');
    });
});
