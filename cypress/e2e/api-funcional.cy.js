const BASE_URL = 'https://crudcrud.com/api/49503accec8e490486e5bd5dce61cc3c/posts';

describe('Testes reais com API CRUDCRUD (posts)', () => {
  let createdId; // salva o ID do post criado para usar nos outros testes

  it('Deve criar um post (POST)', () => {
    const newPost = {
      title: 'Post real com banco',
      content: 'Esse post foi criado e persiste no banco por 24h'
    };

    cy.request('POST', BASE_URL, newPost).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id'); // ID real gerado
      createdId = response.body._id; // guarda o ID
    });
  });

  it('Deve buscar a lista de posts (GET)', () => {
    cy.request('GET', BASE_URL).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('Deve buscar um post específico (GET by ID)', () => {
    // Esse teste depende de um ID válido (criado no POST anterior)
    cy.request('GET', `${BASE_URL}/${createdId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', createdId);
    });
  });

  it('Deve atualizar um post (PUT)', () => {
    const updatedPost = {
      title: 'Post atualizado via PUT',
      content: 'Agora com conteúdo new',
    };

    cy.request('PUT', `${BASE_URL}/${createdId}`, updatedPost).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve deletar o post (DELETE)', () => {
    cy.request('DELETE', `${BASE_URL}/${createdId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
