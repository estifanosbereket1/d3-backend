import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { Session, } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('outline')
export class OutlineController {
  constructor(private readonly outlineService: OutlineService) { }

  @Post()
  create(@Body() createOutlineDto: CreateOutlineDto) {
    return this.outlineService.create(createOutlineDto);
  }

  @Get()
  findAll(@Session() session: UserSession,) {
    return this.outlineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outlineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutlineDto: UpdateOutlineDto) {
    return this.outlineService.update(+id, updateOutlineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outlineService.remove(+id);
  }
}
