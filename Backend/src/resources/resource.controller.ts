
import { Controller, Get, Post, Param, Body, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resources')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) { }

    @Get()
    getAll() {
        return this.resourceService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.resourceService.findOne(+id);
    }

    @Post()
    create(@Body() dto: CreateResourceDto) {
        return this.resourceService.create(dto);
    }


    @Get('download/:id')
    @UseGuards(JwtAuthGuard)
    async download(@Param('id') id: string, @Req() req) {
        if (req.user.role !== 'STUDENT') {
            throw new ForbiddenException('Only students can download resources');
        }
        return this.resourceService.download(+id, req.user.id);
    }

    @Post('bookmark/:id')
    @UseGuards(JwtAuthGuard)
    async bookmark(@Param('id') id: string, @Req() req) {
        return this.resourceService.bookmark(+id, req.user.id);
    }

    @Post('rate/:id')
    @UseGuards(JwtAuthGuard)
    async rate(
        @Param('id') id: string,
        @Req() req,
        @Body() body: { rating: number },
    ) {
        if (req.user.role !== 'STUDENT') {
            throw new ForbiddenException('Only students can rate resources');
        }
        return this.resourceService.rate(+id, req.user.id, body.rating);
    }
}
