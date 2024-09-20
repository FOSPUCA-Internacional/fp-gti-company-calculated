import { Injectable } from '@nestjs/common';
import { CreateApolloDto } from './dto/create-apollo.dto';
import { UpdateApolloDto } from './dto/update-apollo.dto';

@Injectable()
export class ApolloService {
  create(createApolloDto: CreateApolloDto) {
    return 'This action adds a new apollo';
  }

  findAll() {
    return `This action returns all apollo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apollo`;
  }

  update(id: number, updateApolloDto: UpdateApolloDto) {
    return `This action updates a #${id} apollo`;
  }

  remove(id: number) {
    return `This action removes a #${id} apollo`;
  }
}
