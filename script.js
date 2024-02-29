// Função para carregar os itens cadastrados anteriormente
function carregarItensCadastrados() {
    var planilha = JSON.parse(localStorage.getItem('planilha')) || [];
    var listaItens = document.getElementById('itensCadastrados');

    // Limpa a lista antes de atualizar
    listaItens.innerHTML = '';

    // Adiciona cada item à lista
    planilha.forEach(function(item, index) {
        var li = document.createElement('li');
        var descricao = item.descricao ? ` - ${item.descricao}` : ''; // Adiciona descrição, se existir
        li.textContent = `Qualidade: ${item.qualidade}, Quantidade: ${item.quantidade}${descricao}`;

        // Botões de editar e excluir
        var btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('btnEditar');
        btnEditar.dataset.index = index; // Armazena o índice do item como um atributo de dados

        var btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('btnExcluir');
        btnExcluir.dataset.index = index; // Armazena o índice do item como um atributo de dados

        li.appendChild(btnEditar);
        li.appendChild(btnExcluir);
        listaItens.appendChild(li);
    });

    // Adiciona um ouvinte de evento para os botões de edição
    var btnsEditar = document.querySelectorAll('.btnEditar');
    btnsEditar.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            var index = event.target.dataset.index; // Obtém o índice do item
            editarItem(index);
        });
    });

    // Adiciona um ouvinte de evento para os botões de exclusão
    var btnsExcluir = document.querySelectorAll('.btnExcluir');
    btnsExcluir.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            var index = event.target.dataset.index; // Obtém o índice do item
            excluirItem(index);
        });
    });
}

// Função para editar um item cadastrado
function editarItem(index) {
    var planilha = JSON.parse(localStorage.getItem('planilha')) || [];
    var item = planilha[index];

    // Preenche o formulário com os dados do item selecionado
    document.getElementById('qualidade').value = item.qualidade;
    document.getElementById('quantidade').value = item.quantidade;
    document.getElementById('descricao').value = item.descricao || '';

    // Remove o item da planilha
    planilha.splice(index, 1);
    localStorage.setItem('planilha', JSON.stringify(planilha));

    // Recarrega os itens cadastrados
    carregarItensCadastrados();
}

// Função para excluir um item cadastrado
function excluirItem(index) {
    var planilha = JSON.parse(localStorage.getItem('planilha')) || [];
    planilha.splice(index, 1);
    localStorage.setItem('planilha', JSON.stringify(planilha));

    // Recarrega os itens cadastrados
    carregarItensCadastrados();
}

// Função para adicionar um item ao estoque
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    // Obtém os valores do formulário
    var qualidade = document.getElementById('qualidade').value;
    var quantidade = document.getElementById('quantidade').value;
    var descricao = document.getElementById('descricao').value;

    // Adiciona o item à planilha
    adicionarItemAoEstoque(qualidade, quantidade, descricao);

    // Limpa os campos do formulário após o cadastro
    document.getElementById('cadastroForm').reset();
});

// Função para adicionar um item ao estoque
function adicionarItemAoEstoque(qualidade, quantidade, descricao) {
    var item = {
        qualidade: qualidade,
        quantidade: quantidade,
        descricao: descricao
    };

    var planilha = JSON.parse(localStorage.getItem('planilha')) || [];
    planilha.push(item);
    localStorage.setItem('planilha', JSON.stringify(planilha));

    // Recarrega os itens cadastrados
    carregarItensCadastrados();
}

// Carrega os itens cadastrados quando a página é carregada
carregarItensCadastrados();
