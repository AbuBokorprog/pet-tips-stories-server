import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import { AdminSeed } from './app/seed';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server successfully running on port ${config.port}`);
    });

    await AdminSeed();
  } catch (err) {
    console.log(err as string);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
