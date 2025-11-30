import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

describe('TeamController', () => {
    let controller: TeamController;
    let service: TeamService;

    const mockTeamService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeamController],
            providers: [
                {
                    provide: TeamService,
                    useValue: mockTeamService,
                },
            ],
        }).compile();

        controller = module.get<TeamController>(TeamController);
        service = module.get<TeamService>(TeamService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a team', async () => {
            const createTeamDto = { name: 'Test Team' };
            const expectedResult = { id: 1, ...createTeamDto };

            mockTeamService.create.mockResolvedValue(expectedResult);

            expect(await controller.create(createTeamDto)).toEqual(expectedResult);
            expect(service.create).toHaveBeenCalledWith(createTeamDto);
        });
    });

    describe('findAll', () => {
        it('should return an array of teams', async () => {
            const expectedResult = [
                { id: 1, name: 'Team 1' },
                { id: 2, name: 'Team 2' },
            ];

            mockTeamService.findAll.mockResolvedValue(expectedResult);

            expect(await controller.findAll()).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a single team', async () => {
            const expectedResult = { id: 1, name: 'Test Team' };

            mockTeamService.findOne.mockResolvedValue(expectedResult);

            expect(await controller.findOne(1)).toEqual(expectedResult);
            expect(service.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a team', async () => {
            const updateTeamDto = { name: 'Updated Team' };
            const expectedResult = { id: 1, ...updateTeamDto };

            mockTeamService.update.mockResolvedValue(expectedResult);

            expect(await controller.update(1, updateTeamDto)).toEqual(expectedResult);
            expect(service.update).toHaveBeenCalledWith(1, updateTeamDto);
        });
    });

    describe('remove', () => {
        it('should remove a team', async () => {
            const expectedResult = { id: 1, name: 'Test Team' };

            mockTeamService.remove.mockResolvedValue(expectedResult);

            expect(await controller.remove(1)).toEqual(expectedResult);
            expect(service.remove).toHaveBeenCalledWith(1);
        });
    });
});

