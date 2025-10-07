import { Biblioteca } from "../src/definitions.js";

function testaCRUDLivro(assert) {
    let biblioteca = new Biblioteca();

    let titulo = 'Memórias Póstumas de Brás Cubas';
    let autor = 'Machado de Assis';
    let ano = 1881;

    biblioteca.adicionarLivro(titulo, autor, ano);

    let livro = biblioteca.getLivro(1);

    assert.equal(livro.titulo, titulo);
    assert.equal(livro.autor, autor);
    assert.equal(livro.ano, ano);

    // testa recuperar um livro que não existe - tem que dar erro
    assert.throws(() => biblioteca.getLivro(null));
    assert.throws(() => biblioteca.getLivro(-1));
}

function testaCRUDUsuario(assert) {
    let biblioteca = new Biblioteca();

    let nome = 'João';
    let email = 'joao@gmail.com';
    let senha = '1234';

    biblioteca.adicionarUsuario(nome, email, senha);

    let usuario = biblioteca.getUsuario(1);

    assert.equal(usuario.nome, nome);
    assert.equal(usuario.email, email);
    assert.equal(usuario.senha, senha);

    // tenta criar usuário que já existe - tem que dar erro
    assert.throws(
        () => biblioteca.adicionarUsuario(nome, email, senha)
    );

    // testa recuperar um usuário que não existe - tem que dar erro
    assert.throws(() => biblioteca.getUsuario(null));
    assert.throws(() => biblioteca.getUsuario(-1));
}

function testaAdicaoEmprestimo(assert) {
    let biblioteca = new Biblioteca();

    biblioteca.adicionarLivro('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881);
    biblioteca.adicionarUsuario('João', 'joao@gmail.com', '1234');

    assert.equal(biblioteca.emprestimos.length, 0);

    // testa adicionar um empréstimo com campos nulos
    assert.throws(() => biblioteca.adicionarEmprestimo(null, undefined, 1, 2));

    biblioteca.adicionarEmprestimo(1, 1, new Date(2025, 1, 1), new Date(2025, 1, 10));

    assert.equal(biblioteca.emprestimos.length, 1);
    assert.equal(biblioteca.getLivro(biblioteca.emprestimos[0].id_livro).titulo, 'Memórias Póstumas de Brás Cubas');
    assert.equal(biblioteca.getUsuario(biblioteca.emprestimos[0].id_usuario).nome, 'João');

    // testa adicionar um empréstimo de um livro em um período que já existe
    assert.throws(() =>
        biblioteca.adicionarEmprestimo(
            1,
            1,
            new Date(2025, 1, 1),
            new Date(2025, 1, 10)
        )
    );
}

QUnit.module("index", () => {
    QUnit.test("testa adição de livro", assert => testaCRUDLivro(assert));
    QUnit.test("testa adição de usuário", assert => testaCRUDUsuario(assert));
    QUnit.test("testa adição de empréstimo", assert => testaAdicaoEmprestimo(assert));
});
