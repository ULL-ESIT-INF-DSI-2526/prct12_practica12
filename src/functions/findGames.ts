/**
 * Funcion para buscar un juego por el sigueinte filtro:
 * genre, platform y/o multiplayer.
 * @param filter - Objeto de filtro con los siguientes parametros
 * @returns Devuelve un array con los juegos buscados
 */

// type allowedGenre = 'Action' |
//         'RPG'|
//         'Strategy'|
//         'Puzzle'|
//         'Sports'|
//         'Simulation'|
//         'Horror'|
//         'Adventure';

// type allowedPlatform = 'Pc'| 'PS5'| 'Xbox'| 'Switch'| 'Mobile';
// export async function findGames(filter: filterOptions) {
//   try {
//     const games = await Game.find(filter);

//     if (games.length === 0) {
//       throw new Error(
//         'No se han encontrado juegos con el filtro especificado.',
//       );
//     }
//     return games;
//   } catch (error: any) {
//     if (error) throw error;
//   }
// }

// import { Game } from '../data/gameSchema.js';
// import { Request, Response } from 'express';

// interface filterOptions {
//   genre?: string;
//   platform?: string;
//   multiplayer?: boolean;
// }

// export async function findGames(req: Request, res: Response) {
//   try {
//     constfilter = req.query.genre ?{genre: req.query.genre.toString()} : {};

//     const games = await Game.find(genre);

//     if (games.length) {
//         return res.status(404).json({error: 'No se han encontrado juegos con el filtro especificado.'});
//     }

//     return res.status(200).json(games);

//   } catch (error) {
//     return error;
//   }
// }
