import { TEST_USER } from "../../ts/utils/test";

describe('Authorization', () => {
    it('sign up', () => {
        cy.request('GET', '/api/users/test/delete');
        cy.visit('/');

        cy.contains('Sign up').click();

        cy.url().should('include', '/signUp');
        cy.get('[name=email]')
            .type(TEST_USER.email)
            .should('have.value', TEST_USER.email);
        cy.get('[name=password]')
            .type(TEST_USER.password);
        cy.get('[name=confirmPassword]')
            .type(TEST_USER.password);
        cy.contains('Submit').click();
        cy.wait(300);

        cy.url().should('include', '/signIn');
    });

    it('sign in', () => {
        cy.visit('/signIn');
        cy.contains('Sign in!');
        cy.get('[name=email]').type(TEST_USER.email);
        cy.get('[name=password]').type(TEST_USER.password);
        cy.contains('Submit').click();

        cy.url().should('include', '/dashboard');
    });
});
