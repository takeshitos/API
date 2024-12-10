const express = require('express');
const app = express();
const port = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// "Banco de dados" em memória (array de tarefas)
let tasks = [
    { id: 1, title: 'Comprar leite', description: 'Ir ao mercado comprar leite.', completed: false },
    { id: 2, title: 'Lavar a roupa', description: 'Lavar todas as roupas sujas.', completed: false }
];

// GET /tasks - Retorna todas as tarefas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Cria uma nova tarefa
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required.' });
    }

    const newTask = {
        id: tasks.length + 1, // ID simples, apenas incrementando
        title,
        description,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id - Atualiza uma tarefa existente
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json(task);
});

// DELETE /tasks/:id - Exclui uma tarefa
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send(); 
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
