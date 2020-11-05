import { TEST_USER } from "../../ts/utils/test";

describe('Piece actions', () => {
    it('adds piece', () => {
        cy.request('GET', '/api/users/test/create');

        cy.visit('/signIn');
        cy.get('[name=email]').type(TEST_USER.email);
        cy.get('[name=password]').type(TEST_USER.password);
        cy.contains('Submit').click();

        cy.get('.main-nav').contains('Pieces').click();
        cy.contains('Add piece').click();
        cy.get('[name=title]').type('My new piece');
        cy.get('[name=isFavourite]').check();
        cy.contains('Save').click();

        cy.url().should('include', '/pieces/');
    });
});
