import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

@Module({
    exports: [TeamService],
    providers: [TeamService, PrismaService],
    controllers: [TeamController],
})
export class TeamModule {}
