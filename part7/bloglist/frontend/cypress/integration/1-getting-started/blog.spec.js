
describe('Blog ', function() {

  beforeEach(function () {
    cy.ResetDatabase()
    cy.RegisterUser({ name: 'Paavo Salin', username: 'paavo', password: 'secret' })
  })

  // it('create user paavo', function(){
  //   cy.request('POST', 'http://localhost:3001/api/testing/reset')
  //   const user = {
  //     name: 'Paavo Salin',
  //     username: 'paavo',
  //     password: 'secret'
  //   }
  //   cy.request('POST', 'http://localhost:3001/api/users/', user)
  //   cy.visit('http://localhost:3000')
  // })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('user can login & logout', function () {
    cy.get('#username').type('paavo')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.contains('Logged in as Paavo Salin')
    cy.get('#logout-button').click()
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('paavo')
    cy.get('#password').type('secret2')
    cy.get('#login-button').click()
    cy.contains('invalid username or password')
    cy.visit('http://localhost:3000')
  })

  it('user can create blog and remove own blog', function () {
    cy.contains('login').click()
    cy.get('#username').type('paavo')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.contains('Logged in as Paavo Salin')
    cy.contains('create new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('paavo')
    cy.get('#url').type('http://www.ruka.fi')
    cy.get('[data-cy=submit-create]').click()
    cy.contains('view').click()
    cy.get('#remove-button').click()
    cy.get('#logout-button').click()
  })

  it('a new blog can be created & liked', function() {
    cy.contains('login').click()
    cy.get('#username').type('paavo')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.contains('Logged in as Paavo Salin')
    cy.contains('create new blog').click()
    cy.get('#title').type('a blog created by cypress')
    cy.get('#author').type('paavo')
    cy.get('#url').type('http://www.ruka.fi')
    cy.get('[data-cy=submit-create]').click()

    cy.get('.submit-toggleView').eq(0).click()
    for (let i = 0; i < 3; i++) {
      cy.get('[data-cy=like-submit]').click()
      cy.get('.submit-toggleView').eq(0).click()
      if (i === 3) {
        cy.get('.submit-toggleView').eq(0).click()
      }
    }
    cy.get('#remove-button').click()
    cy.get('#logout-button').click()
  })

  it('login form is shown 2', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('paavo')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.contains('Logged in as Paavo Salin')

    cy.contains('create new blog').click()
    cy.get('#title').type('Test blog 1')
    cy.get('#author').type('paavo')
    cy.get('#url').type('http://www.ruka.fi')
    cy.get('[data-cy=submit-create]').click()

    cy.wait(1000)

    cy.contains('create new blog').click()
    cy.get('#title').type('Test blog 2')
    cy.get('#author').type('paavo')
    cy.get('#url').type('http://www.finnair.fi')
    cy.get('[data-cy=submit-create]').click()

    cy.wait(1000)

    cy.get('.submit-toggleView').first().click()
    cy.get('[data-cy=like-submit]').first().click()
    cy.get('.submit-toggleView').first().click()

    cy.wait(1000)

    cy.get('.submit-toggleView').last().click()
    cy.get('[data-cy=like-submit]').last().click()
    cy.get('.submit-toggleView').last().click()
    cy.get('[data-cy=like-submit]').last().click()

    cy.get('.title-value').contains('Test blog 1')

    cy.get('.submit-toggleView').click({ multiple: true })
  })

  it('Reset Database', function () {
    cy.ResetDatabase()
  })
})

// difficulties with eq(index) used first() and last()