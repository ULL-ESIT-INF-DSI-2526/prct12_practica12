import express from 'express';
import { connect } from 'mongoose';
import { createVideogame } from './functions/createVideogame.js';
import { findGameById } from './functions/findGameById.js';
import { deleteGame } from './functions/deleteGame.js';

export const app = express();
app.use(express.json());

await connect('mongodb://127.0.0.1:27017/games-app');

app.post('/videogames', createVideogame);
app.get('/videogames/:id', findGameById);
app.delete('/videogames', deleteGame);
