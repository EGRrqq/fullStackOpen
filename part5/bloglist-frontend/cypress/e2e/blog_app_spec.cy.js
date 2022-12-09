describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'ilovejerseyclub',
      name: 'eeeeee',
      password: 'ilovejerseyclub'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')

    cy.get('#username')
    cy.get('#password')

    cy.contains('button', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ilovejerseyclub')
      cy.get('#password').type('ilovejerseyclub')

      cy.contains('button', 'login').click()
      cy.contains('ilovejerseyclub logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')

      cy.contains('button', 'login').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ilovejerseyclub', password: 'ilovejerseyclub' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('ilovejerseyclub')
      cy.get('#author').type('e')
      cy.get('#url').type('https://soundcloud.com/')

      cy.contains('button', 'create').click()
      cy.contains('a new blog ilovejerseyclub by e added')
    })
  })
})