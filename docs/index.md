# Tutorial de Instalação e Configuração de site de Biblioteca

Este tutorial apresenta um passo-a-passo detalhado para instalar e configurar as ferramentas necessárias para trabalhar 
neste projeto, mesmo que você nunca tenha usado linha de comando ou precise de explicações bem detalhadas.

## Pré-requisitos

### 1. Instalar o Python 3.x

1. Acesse o site do [Anaconda](https://www.anaconda.com/download/success).
2. Baixe a versão para o seu sistema operacional (Windows, Mac ou Linux).
3. Abra o instalador baixado.
4. Clique em "Next" (Próximo) até chegar na tela "Advanced Options" (Opções Avançadas).
5. Marque a opção **"Add Anaconda to my PATH environment variable"** (Adicionar Anaconda ao PATH do sistema). Isso é 
   importante!
   ![path_anaconda.png](images/path_anaconda.png)
6. Clique em "Install" (Instalar) e aguarde terminar.
7. Clique em "Finish" (Finalizar).

### 2. Instalar o Node.js e o npm

1. Acesse o site [https://nodejs.org/pt/download](https://nodejs.org/pt/download).
2. Baixe a versão recomendada para o seu sistema.
3. Abra o instalador baixado.
4. Clique em "Next" (Próximo) até o final, aceitando as opções padrão.
5. Certifique-se de que a opção "Add to PATH" está marcada (normalmente já está).
6. Clique em "Install" (Instalar) e depois em "Finish" (Finalizar).

### 3. Testando se está tudo instalado

1. No Windows, pressione as teclas **Windows + R** ao mesmo tempo.
2. Digite `cmd` e aperte Enter para abrir o terminal.
3. Digite `python --version` e aperte Enter. Deve aparecer algo como `Python 3.x.x`.
4. Digite `npm --version` e aperte Enter. Deve aparecer um número (ex: `10.2.0`).

Veja como deve aparecer:

![teste_cli.gif](images/teste_cli.gif)

Se aparecer erro, volte e confira se instalou corretamente e se marcou a opção de adicionar ao PATH.

---

## 4. Instalação da Documentação (MKDocs)

1. Abra o terminal (como explicado acima).
2. Acesse o link do seu trabalho no GitHub. Por exemplo, o link do repositório desse tutorial é 
   [https://github.com/CTISM-Prof-Henry/exemplo-projeto-software](https://github.com/CTISM-Prof-Henry/exemplo-projeto-software). 
   Acesse o link do **seu** trabalho
3. Baixe o zip do seu trabalho (botão Code > Download zip), ou então clone na sua máquina pela linha de comando
4. Descompacte o arquivo (não funciona com ele zipado!)
5. Navegue até a pasta do seu projeto, utilizando o comando `cd`, ou por outros métodos. Por exemplo, se você salvou o 
   projeto em `C:\Users\HenryCagnini\Projects\CTISM-Prof-Henry\exemplo-projeto-software`, certifique-se que é esse o 
   caminho que aparece na linha de comando:
6. Digite o comando abaixo e aperte Enter:
   ```bash
   pip install -r requirements.txt
   ```
7. Para criar a estrutura inicial da documentação (caso ainda não exista):
  ```bash
  python -m mkdocs new .
  ```
  Isso criará a pasta `docs` e o arquivo `mkdocs.yml`.
  Para mais detalhes, siga o tutorial em: https://github.com/CTISM-Prof-Henry/docsTutorial

## 5. Instalação e Uso dos Testes (QUnit + NYC)

1. No terminal, já dentro da pasta do projeto, digite:
   ```bash
   npm install --save-dev qunit nyc
   ```
2. Para rodar os testes, digite:
   ```bash
   npm test
   ```

Para mais detalhes, siga o tutorial em: https://github.com/CTISM-Prof-Henry/softwareTesting

## 6. Instalação e Uso do Linter (ESLint)

1. No terminal, digite:
   ```bash
   npm install --save-dev eslint
   npx eslint --init
   ```

2. O terminal vai fazer perguntas sobre o seu projeto. Use as setas do teclado para escolher as opções e aperte Enter. 
   Veja um exemplo de como será:
   ![eslint_instalacao.png](images/eslint_instalacao.png)

3. Para rodar o linter e verificar o código, digite:
   ```bash
   npx eslint website/static/js/src
   ```

## 7. Dicas Gerais

- Sempre execute os comandos na raiz do projeto (a pasta principal do projeto).
- Se aparecer erro dizendo que o comando não foi encontrado, confira se instalou e adicionou ao PATH.
- Se não conseguir, peça ajuda!
- Consulte a documentação oficial das ferramentas para configurações avançadas.
