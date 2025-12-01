import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { Session, } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { OrganizationId } from 'src/common/decorators/organization.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiCookieAuth, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ORGANIZATION_ID_HEADER_TOKEN } from 'src/common/utils/constants';
import { CreateOutlineResponseDto, OutlineListResponseDto } from './dto/response.dto';

@ApiTags('Outline')
@ApiCookieAuth('better-auth.session_token')
@ApiSecurity(ORGANIZATION_ID_HEADER_TOKEN)
@Controller('outline')
export class OutlineController {
  constructor(private readonly outlineService: OutlineService) { }

  @Post()
  @ApiOkResponse({ type: CreateOutlineResponseDto })
  create(@Body() createOutlineDto: CreateOutlineDto, @OrganizationId() organizationId: string) {
    return this.outlineService.create(createOutlineDto, organizationId);
  }

  @Get()
  @ApiOkResponse({ type: OutlineListResponseDto })
  findAll(@OrganizationId() organizationId: string, @Query() paginationDto: PaginationDto) {
    return this.outlineService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outlineService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CreateOutlineResponseDto })
  update(@Param('id') id: string, @Body() updateOutlineDto: UpdateOutlineDto, @OrganizationId() organizationId: string) {
    return this.outlineService.update(id, updateOutlineDto, organizationId);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateOutlineResponseDto })
  remove(@Param('id') id: string, @OrganizationId() organizationId: string) {
    return this.outlineService.remove(id, organizationId);
  }
}
