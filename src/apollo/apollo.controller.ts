import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApolloService } from './apollo.service';
import { CreateApolloDto } from './dto/create-apollo.dto';
import { UpdateApolloDto } from './dto/update-apollo.dto';

@Controller('apollo')
export class ApolloController {
  constructor(private readonly apolloService: ApolloService) {}

  @Post()
  create(@Body() createApolloDto: CreateApolloDto) {
    return this.apolloService.create(createApolloDto);
  }

  @Get()
  findAll() {
    return this.apolloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apolloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApolloDto: UpdateApolloDto) {
    return this.apolloService.update(+id, updateApolloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apolloService.remove(+id);
  }
}
