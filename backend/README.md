# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

Criar o ambiente virtual
`python3 -m venv env`

Ativar o ambiente virtual
`source /path_to_folder_project/env/bin/activate`

Desativar o ambiente virtual
`deactivate`

Instalar as dependências
`pip install -r requirements.txt`

Atualizar o requirements
`pip freeze > requirements.txt`

Rodar a Aplicação
`uvicorn src.server:app --reload --reload-dir=src`

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)

### Install .env by command prompt:

- `python -m venv nome_do_ambiente`

ex: `python -m venv venv`

Active the new environment
`nome_do_ambiente\Scripts\activate`

Install packages
`pip install -r imported.txt`
