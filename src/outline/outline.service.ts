import { Injectable } from '@nestjs/common';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';

@Injectable()
export class OutlineService {
  create(createOutlineDto: CreateOutlineDto) {
    return 'This action adds a new outline';
  }

  findAll() {
    return `This action returns all outline`;
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
