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

  @Get(':SOPNUMBE/:COMPANY')
  async getProformasbysopnumbe(
    @Param('SOPNUMBE') SOPNUMBE: string,
    @Param('COMPANY') COMPANY: string,) {
    
      if(COMPANY==='F5618'){
        return this.proformasCalculatedService.getProformasbysopnumbeChacao(SOPNUMBE);
      }else if(COMPANY==='F0016'){
        return this.proformasCalculatedService.getProformasbysopnumbeManeiro(SOPNUMBE);
      }else if(COMPANY==='F0015'){
        return this.proformasCalculatedService.getProformasbysopnumbeCaroni(SOPNUMBE);
      }else if(COMPANY==='F0004'){
        return this.proformasCalculatedService.getProformasbysopnumbeHatillo(SOPNUMBE);
      }else if(COMPANY==='F1099'){
        return this.proformasCalculatedService.getProformasbysopnumbeBaruta(SOPNUMBE);
      }else if(COMPANY==='S6759'){
        return this.proformasCalculatedService.getProformasbysopnumbeSanDiego(SOPNUMBE);
      }else if(COMPANY==='F7834'){
        return this.proformasCalculatedService.getProformasbysopnumbeElTigre(SOPNUMBE);
      }else if(COMPANY==='F2099'){
        return this.proformasCalculatedService.getProformasbysopnumbeInvBaruta(SOPNUMBE);
      }  

    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformasCalculatedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProformasCalculatedDto: UpdateProformasCalculatedDto) {
    return this.proformasCalculatedService.update(+id, updateProformasCalculatedDto);
  }

  @Delete(':company/:client')
  remove(
    @Param('nombreEmpresa') nombreEmpresa: string, 
    @Param('proforma1') proforma1: string,
    @Param('proforma2') proforma2: string) {
      return this.proformasCalculatedService.deleteproformas(nombreEmpresa,proforma1,proforma2);
  }
}
