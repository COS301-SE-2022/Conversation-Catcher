import { Module } from '@nestjs/common';
import { GlobalKey } from './global.vars';

@Module({
  controllers: [],
  providers: [GlobalKey],
  exports: [GlobalKey],
})
export class GlobalSharedModule {}
