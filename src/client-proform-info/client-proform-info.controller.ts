import { Controller, Get, Query, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientInfoService } from './client-proform-info.service';
import { CreateClientCalculatedDto } from './dto/create-client-proform-info.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-proform-info.dto';

@Controller('clientinfo')
export class ClientInfoController {
  constructor(private readonly clientInfoService: ClientInfoService) {}

  @Get(':CUSTNMBR/:PAGE/:COMPANY')
  async getProformas(
    @Param('CUSTNMBR') CUSTNMBR: string, 
    @Param('PAGE') PAGE: string,
    @Param('COMPANY') COMPANY: string,
    //@Query('type') type: string
  ) {
      // Convertir PAGE a un número entero
      const pageNumber = parseInt(PAGE, 10);
      const usdnow=0;
      const eurnow=0;
      const ptrnow=0;
      const fecha_emision_original=0;
      const basebs=0;
    // Asegúrate de que PAGE sea un número entero
    if (!Number.isInteger(pageNumber)) {
      throw new BadRequestException('PAGE must be an integer');
    }
      if(COMPANY==='F5618'){
        return this.clientInfoService.getProformasChacao(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0016'){
        return this.clientInfoService.getProformasManeiro(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0015'){
        return this.clientInfoService.getProformasCaroni(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0004'){
        return this.clientInfoService.getProformasHatillo(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F1099'){
        return this.clientInfoService.getProformasBaruta(CUSTNMBR, pageNumber);
      }else if(COMPANY==='S6759'){
        return this.clientInfoService.getProformasSanDiego(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F7834'){
        return this.clientInfoService.getProformasElTigre(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F2099'){
        return this.clientInfoService.getProformasInvBaruta(CUSTNMBR, pageNumber);
      }
  }

  /*@Get(':CUSTNMBR/:PAGE')
  async getProformascalculated(
    @Param('CUSTNMBR') CUSTNMBR: string, 
    @Param('PAGE') PAGE: string) {
      // Convertir PAGE a un número entero
      const pageNumber = parseInt(PAGE, 10);
      const usdnow=0;
      const eurnow=0;
      const ptrnow=0;
      const fecha_emision_original=0;
      const basebs=0;
    // Asegúrate de que PAGE sea un número entero
    if (!Number.isInteger(pageNumber)) {
      throw new BadRequestException('PAGE must be an integer');
    }

    return this.clientCalculatedService.getProformascalculated(CUSTNMBR, pageNumber);
     
  }*/
}


