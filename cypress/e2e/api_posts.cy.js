// cypress/e2e/api_posts.cy.js

describe('Testes de API para o endpoint /posts', () => {

//-------------TESTES APENAS COM GET

  it('Deve retornar uma lista de posts com sucesso (GET)', () => {
    // Faz a requisição GET para o endpoint /posts
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts').then((response) => {
      // Valida se a requisição foi bem-sucedida (status code 200)
      expect(response.status).to.eq(200);
      
      // Valida se o corpo da resposta é um array
      expect(response.body).to.be.an('array');
      
      // Valida se o array não está vazio
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it('Deve retornar um post específico com sucesso (GET)', () => {
    const postId = 1;
    // Faz a requisição GET para um post específico
    cy.request('GET', `https://jsonplaceholder.typicode.com/posts/${postId}`).then((response) => {
      // Valida o status code
      expect(response.status).to.eq(200);
      
      // Valida se o corpo da resposta é um objeto
      expect(response.body).to.be.an('object');
      
      // Valida se o post retornado tem o ID correto
      expect(response.body).to.have.property('id', postId);
    });
  });

//-------------TESTES APENAS COM POST

it('Deve criar um novo post com sucesso (POST)', () => {
  // Define o corpo da requisição para o novo post
  const newPost = {
    title: 'Meu Novo Post Incrível',
    body: 'Este é o conteúdo do meu post, criado via automação Cypress.',
    userId: 1,
  };

  // Faz a requisição POST
  cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', newPost).then((response) => {
    // Um recurso criado com sucesso geralmente retorna o status 201
    expect(response.status).to.eq(201);
    
    // Valida se o corpo da resposta contém os dados enviados, mais um ID gerado
    expect(response.body).to.have.property('title', newPost.title);
    expect(response.body).to.have.property('body', newPost.body);
    expect(response.body).to.have.property('userId', newPost.userId);
    
    // Valida que o novo post recebeu um ID
    expect(response.body).to.have.property('id');
  });
});


});