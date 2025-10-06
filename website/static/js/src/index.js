class Livro {
    constructor(id_livro, titulo, autor, ano) {
        this.id_livro = id_livro;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
}

class Usuario {
    constructor(id_usuario, nome, email, senha) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

class Emprestimo {
    constructor(id_emprestimo, id_livro, id_usuario, data_emprestimo, data_devolucao) {
        this.id_emprestimo = id_emprestimo;
        this.id_livro = id_livro;
        this.id_usuario = id_usuario;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
    }
}

class Biblioteca {
    constructor() {
        this.livros = [];
        this.usuarios = [];
        this.emprestimos = [];

        this.ultimo_id_livro = 0;
        this.ultimo_id_usuario = 0;
        this.ultimo_id_emprestimo = 0;
    }

    adicionarLivro(titulo, autor, ano) {
        this.ultimo_id_livro += 1;
        this.livros.push(new Livro(this.ultimo_id_livro, titulo, autor, ano));
    }

    adicionarUsuario(nome, email, senha) {
        // verifica se o usuário já não existe
        for(let i = 0; i < this.usuarios.length; i++) {
            if(this.usuarios[i].email === email) {
                throw new Error('Usuário já existe no banco de dados!')
            }
        }

        this.ultimo_id_usuario += 1;
        this.usuarios.push(new Usuario(this.ultimo_id_usuario, nome, email, senha));
    }

    adicionarEmprestimo(id_livro, id_usuario, data_emprestimo, data_devolucao) {
        if(!id_livro || !id_usuario || !data_emprestimo || !data_devolucao) {
            throw new Error('Por favor, preencha todos os campos!');
        }

        // data_emprestimo = new Date(data_emprestimo);
        // data_devolucao = new Date(data_devolucao);

        // verifica se o livro já não está emprestado
        for(let i = 0; i < this.emprestimos.length; i++) {
            if(this.emprestimos[i].id_livro === id_livro) {
                let outro = this.emprestimos[i];

                let caso_1 = (data_emprestimo <= outro.data_emprestimo) && ((data_devolucao >= outro.data_emprestimo) && (data_devolucao <= outro.data_devolucao));
                let caso_2 = ((data_emprestimo >= outro.data_emprestimo) && (data_emprestimo <= outro.data_devolucao)) && (data_devolucao >= outro.data_devolucao);
                let caso_3 = ((data_emprestimo >= outro.data_emprestimo) && (data_emprestimo <= outro.data_devolucao)) && ((data_devolucao >= outro.data_emprestimo) && (data_devolucao <= outro.data_devolucao));
                let caso_4 = (data_emprestimo <= outro.data_emprestimo) && (data_devolucao >= outro.data_devolucao);

                if(caso_1 || caso_2 || caso_3 || caso_4) {
                    throw new Error('O livro requisitado já está emprestado no período solicitado!');
                }
            }
        }
        this.ultimo_id_emprestimo += 1;

        this.emprestimos.push(
            new Emprestimo(
                this.ultimo_id_emprestimo, id_livro, id_usuario, data_emprestimo, data_devolucao
            )
        );
        atualizarListaEmprestimos();
    }

    getUsuario(id_usuario) {
        for(let i = 0; i < this.usuarios.length; i++) {
            if(this.usuarios[i].id_usuario === id_usuario) {
                return this.usuarios[i];
            }
        }
        throw new Error('Usuário não encontrado!');
    }

    getLivro(id_livro) {
        for(let i = 0; i < this.livros.length; i++) {
            if(this.livros[i].id_livro === id_livro) {
                return this.livros[i];
            }
        }
        throw new Error('Livro não encontrado!');
    }
}

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

        emprestimo_texto.innerHTML = 'Empréstimo solicitado com sucesso!';
    } catch(e) {
        emprestimo_texto.innerHTML = e.message;
    }
}

function main() {
    window.biblioteca = new Biblioteca();

    // inicia a biblioteca com 3 usuários e 3 livros
    biblioteca.adicionarLivro('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 1881);
    biblioteca.adicionarLivro('Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', 1954);
    biblioteca.adicionarLivro('As Crônicas de Gelo e Fogo', 'George R. R. Martin', 1996);

    biblioteca.adicionarUsuario('João', 'joao@gmail.com', '1234');
    biblioteca.adicionarUsuario('Maria', 'maria@gmail.com', '1234');
    biblioteca.adicionarUsuario('José', 'jose@gmail.com', '1234');

    //adiciona callbacks
    document.getElementById('button-emprestar').addEventListener('click', callbackAdicionarEmprestimo);
}

main();
