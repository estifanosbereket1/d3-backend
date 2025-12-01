import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { DatabaseService } from 'src/database/database.service';
import { auth } from 'src/auth/auth';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class OutlineService {
  logger = new Logger(OutlineService.name)
  constructor(private readonly db: TransactionHost<TransactionalAdapterPrisma>) { }

  async create(createOutlineDto: CreateOutlineDto, organizationId: string) {
    try {
      const outline = await this.db.tx.outline.create({
        data: {
          ...createOutlineDto,
          organizationId
        }
      })
      return outline
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    try {
      const page = Number(paginationDto.page) || 1
      const limit = Math.max(1, Number(paginationDto.limit) || 10)
      const skip = (page - 1) * limit

      const [rows, total] = await Promise.all([
        this.db.tx.outline.findMany({
          where: { organizationId },
          include: {
            member: {
              select: {
                userId: true,
                user: { select: { name: true } }
              }
            }
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: "asc"
          }
        }),
        this.db.tx.outline.count({
          where: { organizationId }
        })
      ])

      const items = rows.map((row) => {
        const { member, ...rest } = row
        return {
          ...rest,
          reviewerId: rest.memberId ?? null,
          reviewer: member?.user?.name ?? null,
        }
      })

      return { items, total }
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }




  findOne(id: string) {
    return `This action returns a #${id} outline`;
  }


  @Transactional()
  async update(id: string, updateOutlineDto: UpdateOutlineDto, organizationId: string) {
    try {
      const updated = this.db.tx.outline.update({
        where: { id, organizationId },
        data: updateOutlineDto
      })
      return updated
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }


  async remove(id: string, organizationId: string) {
    try {
      const deleted = this.db.tx.outline.delete({
        where: { id, organizationId }
      })
      return deleted
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
