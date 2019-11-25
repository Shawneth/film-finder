import Express from 'express'
import fetch from 'node-fetch'
import fs from 'fs'


const apiData = JSON.parse(fs.readFileSync('./server/auth.json', 'utf8'));
const apiKey: string = apiData.key;
const dbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;

const app = Express();

app.use(Express.json());

async function getListOfMovies(filter: string, pageNumber: number) {
    const results = await fetch(`${dbUrl}&query=${filter}&page=${pageNumber}`).then(res => res.json());
    return results;
}

app.post('/converter', (req, res) => {
    getListOfMovies(req.body.input, req.body.pageNumber).then(results => {
        res.json(results);
    })
    .catch(error => res.sendStatus(404));
});

app.listen(8080); 