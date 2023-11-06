import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';
const port = process.env.PORT || 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My User-Product-Review')
    .setDescription('User-Product-Review')
    .setVersion('1.0')
    .addTag('CRUD')
    .addBearerAuth()
    .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

    console.log(`The server is running on ${port} port: http://localhost:${port}/api`);
  };
bootstrap();
