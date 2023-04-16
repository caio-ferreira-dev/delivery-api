import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryModule } from './routes/delivery/delivery.module';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [ 
    AuthModule,
    DeliveryModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
