import { app } from './app.js';

const port = 3000;
try {
  console.log('Connection to MongoDB server established');
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });
} catch (error) {
  console.log(error);
}
