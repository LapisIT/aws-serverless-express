import { bootstrap } from './app';

async function startLocal() {
  const fastifyInstance = await bootstrap();
  fastifyInstance.listen(3000);
//   const address = '0.0.0.0';
//   const port = process.env.PORT ? Number(process.env.PORT) : 3000;
//   await app.listen(port, address, () => {
//     Logger.debug(`Listening at http://${address}:${port}`);
//   });

}

startLocal();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
// import { Logger } from '@nestjs/common';
//
// async function bootstrap() {
//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     new FastifyAdapter(),
//   );
//   const address = '0.0.0.0';
//   const port = process.env.PORT ? Number(process.env.PORT) : 3000;
//   await app.listen(port, address, () => {
//     Logger.debug(`Listening at http://${address}:${port}`);
//   });
// }
// bootstrap();
