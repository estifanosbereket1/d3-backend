import { Injectable, Logger } from '@nestjs/common';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { DatabaseService } from 'src/database/database.service';
import { auth } from 'src/auth/auth';

@Injectable()
export class OutlineService {
  logger = new Logger(OutlineService.name)
  constructor(private readonly db: DatabaseService) { }

  create(createOutlineDto: CreateOutlineDto) {
    return 'This action adds a new outline';
  }

  async findAll() {
    // const data = await auth.api.getFullOrganization({
    //   query: {
    //     organizationId: "org-id",
    //     organizationSlug: "org-slug",
    //     membersLimit: 100,
    //   },
    //   // This endpoint requires session cookies.
    //   headers: await headers(),
    // });
    try {
      const data = await this.db.outline.findMany({
        include: {
          member: {
            select: {
              userId: true,
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })

      const flattened = data.map((row) => {
        const { member, ...rest } = row
        return {
          ...rest,
          reviewerId: member?.userId ?? rest.memberId ?? null, // prefer joined userId, fallback to memberId
          reviewer: member?.user?.name ?? null,
        }
      })
      // this.logger.log(flattened)
      return flattened
    } catch (error) {
      this.logger.error(error)
      throw error
    }

    return await this.db.outline.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} outline`;
  }

  update(id: number, updateOutlineDto: UpdateOutlineDto) {
    return `This action updates a #${id} outline`;
  }

  remove(id: number) {
    return `This action removes a #${id} outline`;
  }
}
