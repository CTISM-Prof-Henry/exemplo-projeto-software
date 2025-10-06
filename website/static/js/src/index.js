import { Biblioteca } from "./definitions.js";

function atualizarListaEmprestimos() {
    let lista_emprestimos = document.getElementById('list-emprestimos');
    lista_emprestimos.innerHTML = '';

    let biblioteca = window.biblioteca;
    let emprestimos = biblioteca.emprestimos;

    for(let i = 0; i < emprestimos.length; i++) {
        let emprestimo = emprestimos[i];
        let li = document.createElement('li');

        li.classList.add('list-group-item');
        li.textContent = `${biblioteca.getLivro(emprestimo.id_livro).titulo} emprestado para ` +
            `${biblioteca.getUsuario(emprestimo.id_usuario).nome} de ` +
            `${emprestimo.data_emprestimo.toLocaleDateString()} à ${emprestimo.data_devolucao.toLocaleDateString()}`;
        lista_emprestimos.appendChild(li);
    }
}

function callbackAdicionarEmprestimo() {
    let id_livro = parseInt(document.getElementById('select-livro').value);
    let id_usuario = parseInt(document.getElementById('select-usuario').value);

    let data_emprestimo = picker.getStartDate();
    let data_devolucao = picker.getEndDate();

    let emprestimo_texto = document.getElementById('modal-emprestimo-texto');

    try {
        window.biblioteca.adicionarEmprestimo(id_livro, id_usuario, data_emprestimo, data_devolucao);
        atualizarListaEmprestimos();
        emprestimo_texto.innerHTML = 'Empréstimo solicitado com sucesso!';
    } catch(e) {
        emprestimo_texto.innerHTML = e.message;
    }
}

function main() {
    window.biblioteca = new Biblioteca();

    // inicia a biblioteca com 3 usuários e 3 livros
    window.biblioteca.adicionarLivro('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881);
    window.biblioteca.adicionarLivro('Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', 1954);
    window.biblioteca.adicionarLivro('As Crônicas de Gelo e Fogo', 'George R. R. Martin', 1996);

    window.biblioteca.adicionarUsuario('João', 'joao@gmail.com', '1234');
    window.biblioteca.adicionarUsuario('Maria', 'maria@gmail.com', '1234');
    window.biblioteca.adicionarUsuario('José', 'jose@gmail.com', '1234');

    //adiciona callbacks
    document.getElementById('button-emprestar').addEventListener('click', callbackAdicionarEmprestimo);
}

main();
