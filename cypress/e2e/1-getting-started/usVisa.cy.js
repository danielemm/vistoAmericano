describe("us visa appointment", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://ais.usvisa-info.com/en-ca/niv/groups/32334438");
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("reschedulle", () => {
    // cy.contains('a', 'Continue').click()
    // cy.get('#user_email').type('danielemm@gmail.com')
    // cy.get('#user_password').type('@usavisa123')
    // cy.get('.icheckbox').click()
    // cy.contains('input', 'Sign In').click()

    // cy.intercept(
    //   'POST',
    //   'https://ais.usvisa-info.com/en-ca/niv/users/sign_in'
    // ).as('signInRequest')

    // cy.wait('@signInRequest')

    // cy.contains('Current Status')
    cy.get(".ui-dialog-buttonset > .ui-button").click();
    cy.get("#user_email").type(""); //inserir email
    cy.get("#user_password").type(""); //inserir senha
    cy.get(".icheckbox").click();
    cy.contains("input", "Sign In").click();
    cy.contains("a", "Continue").click();
    cy.get("li > .button").click();

    cy.get("h5 > .fa-calendar-minus").click();
    cy.contains("a.button", "Reschedule Appointment").click();
    cy.contains("input", "Continue").click();
    cy.wait(1500);
    cy.get("#appointments_consulate_appointment_date").click();

    cy.get("body")
      .then(() => {
        verifyAvailableDate();
      })
      .then(() => {
        verifyAvailableDate();
      })
      .then(() => {
        verifyAvailableDate();
      });
  });

  function verifyAvailableDate() {
    cy.get("body").then(($body) => {
      const dateResult = $body.find("a.ui-state-default");

      if (dateResult.length > 0) {
        var element = dateResult[0];
        const day = element.innerText;
        const month = element.parentElement.getAttribute("data-month");
        const fixedMonth = parseInt(month) + 1;
        const year = element.parentElement.getAttribute("data-year");

        //alert('Achou!!! A próxima data é' + day + '/' + fixedMonth + '/' + year)
        alert(`Achou!!! A próxima data é' ${day}/${fixedMonth}/${year}`);
      } else {
        cy.get(".ui-datepicker-next > .ui-icon").click();
      }
    });
  }
});
