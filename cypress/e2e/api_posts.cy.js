// cypress/e2e/api_posts.cy.js

describe('Testes de API para o endpoint /posts', () => {

//-------------TESTES APENAS COM GET

 it('Deve retornar uma lista de posts com validações avançadas (GET)', () => {
  cy.request('GET', '/posts').then((response) => {
    // Validação do Status Code
    expect(response.status).to.eq(200);

    // Validação de Headers
    // Verifica se o cabeçalho 'content-type' existe e contém 'application/json'
    expect(response.headers['content-type']).to.include('application/json');

    // Validação do Corpo (Body)
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.length(100); // A API de exemplo retorna 100 posts

    // Validação da estrutura de um item na lista
    // Verifica se o primeiro post no array tem as propriedades esperadas e os tipos corretos
    const firstPost = response.body[0];
    expect(firstPost).to.have.property('userId').and.to.be.a('number');
    expect(firstPost).to.have.property('id').and.to.be.a('number');
    expect(firstPost).to.have.property('title').and.to.be.a('string');
    expect(firstPost).to.have.property('body').and.to.be.a('string');
  });
});

  it('Deve retornar um post específico com sucesso (GET)', () => {
    const postId = 1;
    // Faz a requisição GET para um post específico
    cy.request('GET', `/posts/${postId}`).then((response) => {
      // Valida o status code
      expect(response.status).to.eq(200);
      
      // Valida se o corpo da resposta é um objeto
      expect(response.body).to.be.an('object');
      
      // Valida se o post retornado tem o ID correto
      expect(response.body).to.have.property('id', postId);
    });
  });

//-------------TESTES APENAS COM POST

it('Deve criar um novo post usando um fixture (POST)', () => {
  // Carrega os dados do arquivo fixture
  cy.fixture('new_post').then((postData) => {
    // Faz a requisição POST usando os dados do fixture
    cy.request('POST', '/posts', postData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('title', postData.title);
      expect(response.body).to.have.property('body', postData.body);
      expect(response.body).to.have.property('userId', postData.userId);
      expect(response.body).to.have.property('id');
    });
  });
});

//-------------TESTES APENAS COM PUT

it('Deve atualizar um post existente com sucesso (PUT)', () => {
  const postId = 5;
  const updatedPost = {
    id: postId,
    title: 'Post Atualizado',
    body: 'O conteúdo deste post foi totalmente atualizado.',
    userId: 1,
  };

  // Faz a requisição PUT para o post com ID 5
  cy.request('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`, updatedPost).then((response) => {
    // Valida o status code de sucesso
    expect(response.status).to.eq(200);
    
    // Valida se os dados na resposta correspondem aos dados enviados
    expect(response.body).to.deep.equal(updatedPost);
  });
});

//-------------TESTES APENAS COM DELETE

it('Deve deletar um post com sucesso (DELETE)', () => {
  const postId = 10;

  // Faz a requisição DELETE
  cy.request('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`).then((response) => {
    // Uma deleção bem-sucedida geralmente retorna 200 (OK) ou 204 (No Content)
    // A API JSONPlaceholder retorna 200
    expect(response.status).to.eq(200);
    
    // O corpo da resposta para um DELETE bem-sucedido pode estar vazio
    expect(response.body).to.be.empty;
  });
});


});