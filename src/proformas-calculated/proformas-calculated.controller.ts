import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProformasCalculatedService } from './proformas-calculated.service';
import { CreateProformasCalculatedDto } from './dto/create-proformas-calculated.dto';
import { UpdateProformasCalculatedDto } from './dto/update-proformas-calculated.dto';

@Controller('proformascalculated')
export class ProformasCalculatedController {
  constructor(private readonly proformasCalculatedService: ProformasCalculatedService) {}

  @Post()
  create(@Body() createProformasCalculatedDto: CreateProformasCalculatedDto) {
    return this.proformasCalculatedService.create(createProformasCalculatedDto);
  }

  @Get(':SOPNUMBE')
  async getProformasbysopnumbe(
    @Param('SOPNUMBE') SOPNUMBE: string) {
    return this.proformasCalculatedService.getProformasbysopnumbe(SOPNUMBE);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformasCalculatedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProformasCalculatedDto: UpdateProformasCalculatedDto) {
    return this.proformasCalculatedService.update(+id, updateProformasCalculatedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proformasCalculatedService.remove(+id);
  }
}
