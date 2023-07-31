import AppSelect from '../AppSelect.vue';

describe('App Select component tests', () => {
    const selectLabelSelector = '[data-cy=select-label]';
    const selectInputSelector = '[data-cy=select-input]';

    const label = 'test';
    const options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
    ];

    it('show select correctly', () => {
        cy.mount(AppSelect, {
            props: { label, options, modelValue: '1' },
        });
        cy.get(selectLabelSelector).should('exist').contains(label);
        cy.get(selectInputSelector).should('have.value', '1');
    });

    it('emit events on change select', () => {
        const changeSpy = cy.spy().as('changeSpy');
        cy.mount(AppSelect, {
            props: { label, options, modelValue: '', 'onUpdate:modelValue': changeSpy },
        });
        cy.get(selectInputSelector).select('2');
        cy.get('@changeSpy').should('have.been.calledOnceWith', '2');
    });
});
