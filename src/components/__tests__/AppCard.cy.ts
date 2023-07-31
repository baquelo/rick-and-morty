import AppCard from '../AppCard.vue';

describe('App Card component tests', () => {
    const cardImageSelector = '[data-cy=card-image]';
    const cardBodySelector = '[data-cy=card-body]';

    it('show card with body correctly', () => {
        cy.mount(AppCard, { slots: { default: 'Body' } });
        cy.get(cardImageSelector).should('not.exist');
        cy.get(cardBodySelector).should('have.text', 'Body');
    });

    it('show card with image correctly', () => {
        const image = 'https://rickandmortyapi.com/api/character/avatar/84.jpeg';

        cy.mount(AppCard, {
            props: { image },
        });
        cy.get(cardImageSelector)
            .should('exist')
            .should('have.attr', 'src', image)
            .should('have.attr', 'alt', 'Image');
        cy.get(cardBodySelector).should('have.text', '');
    });
});
