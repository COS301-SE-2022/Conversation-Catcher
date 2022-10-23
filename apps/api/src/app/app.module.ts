import { Module, DynamicModule } from '@nestjs/common';
import { ApiShellModule } from '@conversation-catcher/shell';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ApiShellModule, ConfigModule.forRoot({ envFilePath: '.env',isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
