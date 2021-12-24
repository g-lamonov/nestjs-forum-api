import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/common/filters/http-exception.filter';

export class ServerApplication {
  private readonly host: string = process.env.HOST;
  private readonly port: number = Number(process.env.PORT);
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(AppModule);

    this.buildAPIDocumentation(app);
    this.log();

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(this.port, this.host);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = 'Blog';
    const description = 'Blog API documentation';
    const version = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
  }

  private log(): void {
    Logger.log(
      `Server started on host: ${this.host}; port: ${this.port};`,
      ServerApplication.name,
    );
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
