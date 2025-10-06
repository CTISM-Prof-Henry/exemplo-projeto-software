/**
 * Esse arquivo possui definições de classes que serão usadas no software.
 * Não coloque nada com DOM (e.g. document.getElementById) aqui, pois isso vai fazer o QUnit falhar!
 */

export class Livro {
    constructor(id_livro, titulo, autor, ano) {
        this.id_livro = id_livro;
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
}

export class Usuario {
    constructor(id_usuario, nome, email, senha) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

export class Emprestimo {
    constructor(id_emprestimo, id_livro, id_usuario, data_emprestimo, data_devolucao) {
        this.id_emprestimo = id_emprestimo;
        this.id_livro = id_livro;
        this.id_usuario = id_usuario;
        this.data_emprestimo = data_emprestimo;
        this.data_devolucao = data_devolucao;
    }
}

export class Biblioteca {
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