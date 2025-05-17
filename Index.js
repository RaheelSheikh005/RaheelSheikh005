const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Task storage
let tasks = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push({
            id: Date.now().toString(),
            text: newTask
        });
    }
    res.redirect('/');
});

app.post('/delete-task', (req, res) => {
    const taskId = req.body.id;
    tasks = tasks.filter(task => task.id !== taskId);
    res.redirect('/');
});

app.post('/update-task', (req, res) => {
    const { id, updatedText } = req.body;
    tasks = tasks.map(task => 
        task.id === id ? { ...task, text: updatedText } : task
    );
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});