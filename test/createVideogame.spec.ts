import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Game } from '../src/data/gameSchema';

describe('Test para comprobar el funcionamiento de la función createVideogame', () => {
  beforeEach(async () => {
    await Game.deleteMany();
  });

  const myGame = {
    title: 'Zelda',
    developer: 'Nintendo',
    publisher: 'Nintendo',
    genre: ['Action'],
    platform: ['PS5'],
    releaseDate: new Date(),
    price: 14.99,
    score: 85,
  };

  test('Debe permitir agregar un juego a una colección vacia', async () => {
    const res = await request(app).post('/videogames').send(myGame);

    expect(res.status).toBe(201);
    expect(res.body.title).toEqual('Zelda');

    const gameId = await Game.findById(res.body._id);
    expect(gameId).not.toBeNull();
  });

  test('Debe dar error 409 si el titulo está duplicado', async () => {
    const newGame = new Game(myGame);
    await newGame.save();

    const res = await request(app).post('/videogames').send(myGame);

    expect(res.status).toBe(409);
    expect(res.body.error).toEqual('The patient is already at our system');
  });

  test('Debe dar error 400 si el objeto está mal formado (falta titulo)', async () => {
    const notValidGame = {
      developer: 'Nintendo',
      publisher: 'Nintendo',
      genre: ['Action'],
      platform: ['PS5'],
      releaseDate: new Date(),
      price: 14.99,
      score: 85,
    };

    const res = await request(app).post('/videogames').send(notValidGame);

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      'Game validation failed: title: Path `title` is required.',
    );
  });

  test('Debe dar error 400 si el objeto está mal formado (falta developer)', async () => {
    const notValidGame = {
      title: 'Zelda',
      publisher: 'Nintendo',
      genre: ['Action'],
      platform: ['PS5'],
      releaseDate: new Date(),
      price: 14.99,
      score: 85,
    };

    const res = await request(app).post('/videogames').send(notValidGame);

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual(
      'Game validation failed: developer: Path `developer` is required.',
    );
  });
});
