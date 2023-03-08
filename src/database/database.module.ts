import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleConfig } from '@shared/services/module-config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ModuleConfig],
      useFactory: (moduleConfigService: ModuleConfig) =>
        moduleConfigService.getPostgresConfig(),
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
