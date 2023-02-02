// const express = require(`express`);
// const fs = require(`fs`);
// const notes = require(`./db/db.json`);
// const path = require(`path`);
// const { v4: uuidv4 } = require(`uuid`);

// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`public`));
// app.use(express.json());

// app.get(`/api/notes`, (req, res) => {
//     res.sendFile(path.join(__dirname, `/db/db.json`));
// });
// app.post(`/api/notes`, (req, res) => {
//     const { title, text, id } = req.body;
//     const newNote = {
//         title,
//         text,
//         id,
//     };
//     newNote.id = uuidv4();
//     fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
//         const noteArray = JSON.parse(data);
//         noteArray.push(newNote)
//         const noteText = JSON.stringify(noteArray, null, 3)
//     fs.writeFile(`./db/db.json`, noteText, (err) => {
//         err
//             ? console.log(err)
//             : console.log(
//                 `Submitted! ID: ${newNote.id}`
//             )
//     })
// })
//     const response = {
//         status: `success`,
//         body: newNote,
//     };
//     res.json(response)
// })
// app.delete(`/api/notes/:id`, (req, res) => {
//     const id = req.params.id;
//     const notes = JSON.parse(fs.readFileSync(`./db/db.json`));
//     const removeIndex = notes.filter((item) => item.id !== id);
//     fs.writeFileSync(`./db/db.json`, JSON.stringify(removeIndex));
//     res.json(removeIndex);
//     console.log(`You have removed an item from the list`)
// })
// app.get(`/`, (req, res) =>
//   res.sendFile(path.join(__dirname, `./public/index.html`))
// );
// app.get(`/notes`, (req, res) =>
//   res.sendFile(path.join(__dirname, `./notes.html`))
// );
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`)
// })
// requiring dependencies and file paths
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = require('./db/db.json');
const cors = require('cors')

//create instances of express and our port for heroku
const app = express();
const PORT = process.env.PORT || 3001


// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Get route for api/notes to read from our database
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

// Post route for api/notes that allows user to input note and write a new db file
app.post('/api/notes', (req, res) => {

    const { title, text, id } = req.body;

    const newNote = {
        title,
        text,
        id,
    };

    newNote.id = uuidv4();

    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        const notesArr = JSON.parse(data);
        notesArr.push(newNote)
        const noteString = JSON.stringify(notesArr, null, 2)
    

    fs.writeFile('./db/db.json', noteString, (err) => {
        err
            ? console.log(err)
            : console.log(
                `New note has been submitted with an id of ${newNote.id}`
            )
    })
})
    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response)
})

// Delete route, reads into db file, filters through the current array and prints different array
// without the current id
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const removeIndex = notes.filter((item) => item.id !== id);
    fs.writeFileSync('./db/db.json', JSON.stringify(removeIndex));
    res.json(removeIndex);
    console.log(`You have removed an item from the list`)
})

// Get route for the home page in case middleware fails
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// Get route for the notes.html page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Listens for port and then starts the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})