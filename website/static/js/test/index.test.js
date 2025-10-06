import { Biblioteca } from "../src/definitions.js";

function testaCriacaoLivro(assert) {
    let biblioteca = new Biblioteca();

    let titulo = 'Memórias Póstumas de Brás Cubas';
    let autor = 'Machado de Assis';
    let ano = 1881;

    biblioteca.adicionarLivro(titulo, autor, ano);

    let livro = biblioteca.getLivro(1);

    assert.equal(livro.titulo, titulo);
    assert.equal(livro.autor, autor);
    assert.equal(livro.ano, ano);
}

function testaCriacaoUsuario(assert) {
    let biblioteca = new Biblioteca();

    let nome = 'João';
    let email = 'joao@gmail.com';
    let senha = '1234';

    biblioteca.adicionarUsuario(nome, email, senha);

    let usuario = biblioteca.getUsuario(1);

    assert.equal(usuario.nome, nome);
    assert.equal(usuario.email, email);
    assert.equal(usuario.senha, senha);
}

function testaAdicaoEmprestimo(assert) {
    let biblioteca = new Biblioteca();

    biblioteca.adicionarLivro('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881);
    biblioteca.adicionarUsuario('João', 'joao@gmail.com', '1234');

    assert.equal(biblioteca.emprestimos.length, 0);

    biblioteca.adicionarEmprestimo(1, 1, new Date(2025, 1, 1), new Date(2025, 1, 10));

    assert.equal(biblioteca.emprestimos.length, 1);
    assert.equal(biblioteca.getLivro(biblioteca.emprestimos[0].id_livro).titulo, 'Memórias Póstumas de Brás Cubas');
    assert.equal(biblioteca.getUsuario(biblioteca.emprestimos[0].id_usuario).nome, 'João');
}

QUnit.module("index", () => {
    QUnit.test("testa adição de livro", assert => testaCriacaoLivro(assert));
    QUnit.test("testa adição de usuário", assert => testaCriacaoUsuario(assert));
    QUnit.test("testa adição de empréstimo", assert => testaAdicaoEmprestimo(assert));
});

