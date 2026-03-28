function adicionarTarefa(dia) {
    let input = document.getElementById("input-" + dia);
    let lista = document.getElementById("lista-" + dia);

    let tarefa = input.value;
    if (tarefa === "") return;

    let novoItem = document.createElement("li");

    let texto = document.createElement("span");
    texto.innerText = tarefa;

    let botaoDeletar = document.createElement("button");
    botaoDeletar.innerText = "🗑️";

    botaoDeletar.onclick = function() {
        novoItem.remove();
        salvarTarefas(dia, lista);
    };

    texto.onclick = function() {
        texto.classList.toggle("concluida");

        if (texto.classList.contains("concluida")) {
            texto.style.textDecoration = "line-through";
            texto.innerText = texto.innerText.replace(" ✔️", "") + " ✔️";
        } else {
            texto.style.textDecoration = "none";
            texto.innerText = texto.innerText.replace(" ✔️", "");
        }

        salvarTarefas(dia, lista);
    };

    novoItem.appendChild(texto);
    novoItem.appendChild(botaoDeletar);
    lista.appendChild(novoItem);

    input.value = "";

    salvarTarefas(dia, lista);
}

function salvarTarefas(dia, lista) {
    let tarefas = [];

    lista.querySelectorAll("li").forEach(item => {
        let span = item.querySelector("span");

        tarefas.push({
            texto: span.innerText.replace(" ✔️", ""),
            concluida: span.classList.contains("concluida")
        });
    });

    localStorage.setItem(dia, JSON.stringify(tarefas));
}

function carregarTarefas() {
    let dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

    dias.forEach(dia => {
        let lista = document.getElementById("lista-" + dia);
        let tarefasSalvas = JSON.parse(localStorage.getItem(dia)) || [];

        tarefasSalvas.forEach(tarefa => {
            let novoItem = document.createElement("li");

            let texto = document.createElement("span");
            texto.innerText = tarefa.texto;

            if (tarefa.concluida) {
                texto.classList.add("concluida");
                texto.style.textDecoration = "line-through";
                texto.innerText += " ✔️";
            }

            let botaoDeletar = document.createElement("button");
            botaoDeletar.innerText = "🗑️";

            botaoDeletar.onclick = function() {
                novoItem.remove();
                salvarTarefas(dia, lista);
            };

            texto.onclick = function() {
                texto.classList.toggle("concluida");

                if (texto.classList.contains("concluida")) {
                    texto.style.textDecoration = "line-through";
                    texto.innerText = texto.innerText.replace(" ✔️", "") + " ✔️";
                } else {
                    texto.style.textDecoration = "none";
                    texto.innerText = texto.innerText.replace(" ✔️", "");
                }

                salvarTarefas(dia, lista);
            };

            novoItem.appendChild(texto);
            novoItem.appendChild(botaoDeletar);
            lista.appendChild(novoItem);
        });
    });
}

carregarTarefas();