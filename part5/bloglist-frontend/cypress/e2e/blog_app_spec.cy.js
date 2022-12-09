describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'ilovejerseyclub',
      name: 'eeeeee',
      password: 'ilovejerseyclub'
    }

    const anotherUser = {
      username: 'ilovejerseyclubtoo',
      name: 'qqqqqq',
      password: 'ilovejerseyclubtoo'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser)
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

    describe('and one blog is added', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'ilovejerseyclubsomuch', author: 'e', url: 'https://soundcloud.com/' })
      })

      it('a blog can be liked', function() {
        cy.contains('button', 'show').click()
        cy.contains('button', 'like').click()
        cy.contains('likes: 1')
      })

      it('a blog can be deleted', function() {
        cy.contains('button', 'show').click()
        cy.contains('button', 'remove').click()
        cy.get('html')
            .should('not.contain', 'ilovejerseyclubsomuch')
      })

      it('other user cannot delete the blog', function () {
        cy.login({ username: 'ilovejerseyclubtoo', password: 'ilovejerseyclubtoo' })

        cy.contains('button', 'show').click()
        cy.contains('button', 'remove').click()
        cy.contains('only the author of the blog can delete it')
      })
    })
  })
})