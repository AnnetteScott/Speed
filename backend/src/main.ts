import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// enable cors
	app.enableCors({ origin: true, credentials: true });
	const port = process.env.PORT || 8000;
	await app.listen(port);
}
bootstrap();
