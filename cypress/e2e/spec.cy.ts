describe('Delivery Tracking App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the app title', () => {
    cy.get('.app-title').should('contain', 'Delivery Tracking')
  })

  it('should navigate to dashboard', () => {
    cy.get('a[routerlink="/dashboard"]').click()
    cy.url().should('include', '/dashboard')
    cy.get('mat-card-title').should('contain', 'Andamento de Entregas por Motorista')
  })

  it('should navigate to delivery list', () => {
    cy.get('a[routerlink="/deliveries"]').click()
    cy.url().should('include', '/deliveries')
    cy.get('mat-card-title').should('contain', 'Lista de Entregas')
  })

  it('should filter deliveries', () => {
    cy.visit('/deliveries')
    cy.get('mat-select[formcontrolname="driver"]').click()
    cy.get('mat-option').first().click()
    cy.get('button').contains('Aplicar Filtro').click()
    cy.get('table').should('exist')
  })

  it('should paginate through deliveries', () => {
    cy.visit('/deliveries')
    cy.get('mat-paginator').should('exist')
    cy.get('button[aria-label="Next page"]').click()
    cy.get('div.mat-paginator-range-label').should('contain', 'Page 2')
  })
})