import { Game } from '../data/gameSchema.js';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

export async function findGameById(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Formato de id invalido' });
    }

    const patient = await Game.findById(id);

    if (!patient)
      return res
        .status(404)
        .json({ error: `Juego con id (${id}) no encontrado` });

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Error interno del servidor desconocido',
    });
  }
}
