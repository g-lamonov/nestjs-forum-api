import { ServerApplication } from './ServerApplication';

async function bootstrap() {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}
bootstrap();
