const nusp = "{{ nusp }}";

fetch(`/dados/${nusp}`)
    .then(response => response.json())
    .then(data => {
        const tabelaBody = document.getElementById('tabelaBody');
        
        // Limpa a tabela antes de inserir novos dados
        tabelaBody.innerHTML = '';

        // Itera sobre os relatórios retornados e cria as linhas da tabela
        data.dados_aluno.forEach(dado => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${dados_aluno.email}</td>
                <td>${dados_aluno.nome}</td>
                <td>${dados_aluno.orientador}</td>
                <td>${dados_aluno.nusp}</td>
                <td>${dados_aluno.lattes}</td>
                
                // Data da ultima atualizacao do lattes

                <td>${dados_aluno.curso}</td>
                <td>${dados_aluno.data_matricula}</td>
                
                // Resultado do ultimo relatorio

                <td>${dados_aluno.disc_aprov}</td>
                <td>${dados_aluno.disc_reprov}</td>
                <td>${new Date(dados_aluno.data_exqualif).toLocaleDateString()}</td>
                <td>${new Date(dados_aluno.data_exprof).toLocaleDateString()}</td>

                // Data maxima inscricao no exame de qualificacao  

                <td>${new Date(dados_aluno.data_dissert).toLocaleDateString()}</td>

                // Qtd de artigos feitos
                // Relatorio de atividades  
                // Resumo de atividades
                // Consideracoes adicionais
                // Dificuldade ou nao  

            `;
            
            const url = "{{ url_for('aluno.detalhes_relatorio', relatorio_id='') }}" + dado.id

            row.addEventListener('click', function() {
                window.location.href = url;
            });

            tabelaBody.appendChild(row);
        });

        $('#tabelaRelatorios table').DataTable({
            "order": [[0, "desc"]], // Ordena por data de envio (descendente)
            "paging": true, // Habilita paginação
            "searching": true, // Habilita o campo de busca
            "info": true // Exibe informações de paginação
        });

        $('#tabelaRelatorios table').DataTable().columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });
    })
    .catch(error => {
        console.error('Erro ao buscar relatórios:', error);
    });
