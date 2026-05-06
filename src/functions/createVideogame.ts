import { Game } from '../data/gameSchema.js';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

/**
 * Funcion para crear un documento de videojuego
 * @param videogame - Interfaz a añadir
 * @returns El mensaje de exito o un error dependiendo de si el juego ya estaba creado
 */
export async function createVideogame(req: Request, res: Response) {
  try {
    const gameToAdd = new Game(req.body);
    await gameToAdd.save();
    return res.status(201).json(gameToAdd);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: error.message,
      });
    }

    if (error instanceof Error) {
      const mongoError = error as Error & { code?: number };

      if (mongoError.code === 11000) {
        return res.status(409).json({
          error: 'The patient is already at our system',
        });
      }
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
}
