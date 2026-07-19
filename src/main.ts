import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;
const swaggerPath = 'docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Team Atlas API')
    .setDescription('Team Atlas server API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  await app.listen(port);
}
bootstrap()
  .then(() => {
    console.log(`🚀 Application is running on: http://localhost:${port}/api`);
    console.log(
      `📚 Swagger UI available at: http://localhost:${port}/${swaggerPath}`,
    );
  })
  .catch((err) => {
    console.error('❌ Failed to start application', err);
    process.exit(1);
  });
