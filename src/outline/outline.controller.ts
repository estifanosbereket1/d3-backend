import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { Session, } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { OrganizationId } from 'src/common/decorators/organization.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { O } from 'node_modules/better-auth/dist/index--CrC0_x3.mjs';

@Controller('outline')
export class OutlineController {
  constructor(private readonly outlineService: OutlineService) { }

  @Post()
  create(@Body() createOutlineDto: CreateOutlineDto, @OrganizationId() organizationId: string) {
    return this.outlineService.create(createOutlineDto, organizationId);
  }

  @Get()
  findAll(@Session() session: UserSession, @OrganizationId() organizationId: string, @Query() paginationDto: PaginationDto) {
    return this.outlineService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outlineService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutlineDto: UpdateOutlineDto, @OrganizationId() organizationId: string) {
    return this.outlineService.update(id, updateOutlineDto, organizationId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @OrganizationId() organizationId: string) {
    return this.outlineService.remove(id, organizationId);
  }
}
