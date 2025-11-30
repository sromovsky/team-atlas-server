import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
    constructor(private prisma: PrismaService) {}

    async create(createTeamDto: CreateTeamDto) {
        return this.prisma.team.create({
            data: createTeamDto,
        });
    }

    async findAll() {
        return this.prisma.team.findMany();
    }

    async findOne(id: number) {
        const team = await this.prisma.team.findUnique({
            where: { id },
        });

        if (!team) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }

        return team;
    }

    async update(id: number, updateTeamDto: UpdateTeamDto) {
        await this.findOne(id); // Check if team exists

        return this.prisma.team.update({
            where: { id },
            data: updateTeamDto,
        });
    }

    async remove(id: number) {
        await this.findOne(id); // Check if team exists

        return this.prisma.team.delete({
            where: { id },
        });
    }
}

