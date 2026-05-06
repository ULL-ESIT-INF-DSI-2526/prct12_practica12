import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { Game } from '../src/data/gameSchema';

describe('Test para comprobar el funcionamiento de la función findGameById', () => {
  beforeEach(async () => {
    await Game.deleteMany();
    const game1 = new Game(myGame);
    const game2 = new Game(myGame2);
    await game1.save();
    await game2.save();
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

  const myGame2 = {
    title: 'Mario Bros',
    developer: 'Nintendo',
    publisher: 'Nintendo',
    genre: ['Action'],
    platform: ['PS5'],
    releaseDate: new Date(),
    price: 14.99,
    score: 85,
  };

  test('Permite eliminar un juego por su id', async () => {
    const resForId = await Game.find({ title: 'Zelda' });
    
    const res = await request(app).delete(`/videogames/${resForId}`);

    expect(res.status).toBe(404);
  })

  test('Da error si el id no existe', async () => {
    
    const res = await request(app).get(`/videogames/69f473e840f5b1f3cd7852f7`);

    expect(res.status).toBe(404);
    expect(res.body.error).toEqual('Juego con id (69f473e840f5b1f3cd7852f7) no encontrado');
  })

  test('Da error si el id no es valido', async () => {
    
    const res = await request(app).get(`/videogames/69f473e8`);

    expect(res.status).toBe(400);
    expect(res.body.error).toEqual('Formato de id invalido');
  })
  
});