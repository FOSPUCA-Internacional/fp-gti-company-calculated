import { Controller, Get, Query, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientCalculatedService } from './client-calculated.service';
import { CreateClientCalculatedDto } from './dto/create-client-calculated.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-calculated.dto';

@Controller('clientcalculated')
export class ClientCalculatedController {
  constructor(private readonly clientCalculatedService: ClientCalculatedService) {}

  @Get(':CUSTNMBR/:PAGE/:COMPANY')
  async getProformas(
    @Param('CUSTNMBR') CUSTNMBR: string, 
    @Param('PAGE') PAGE: string,
    @Param('COMPANY') COMPANY: string,
    //@Query('type') type: string
  ) {
      const pageNumber = parseInt(PAGE, 10);
      const usdnow=0;
      const eurnow=0;
      const ptrnow=0;
      const fecha_emision_original=0;
      const basebs=0;
    if (!Number.isInteger(pageNumber)) {
      throw new BadRequestException('PAGE must be an integer');
    }
    
      if(COMPANY==='F5618'){
        return this.clientCalculatedService.getProformascalculatedChacao(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0016'){
        return this.clientCalculatedService.getProformascalculatedManeiro(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0015'){
        return this.clientCalculatedService.getProformascalculatedCaroni(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F0004'){
        return this.clientCalculatedService.getProformascalculatedHatillo(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F1099'){
        return this.clientCalculatedService.getProformascalculatedBaruta(CUSTNMBR, pageNumber);
      }else if(COMPANY==='S6759'){
        return this.clientCalculatedService.getProformascalculatedSanDiego(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F7834'){
        return this.clientCalculatedService.getProformascalculatedElTigre(CUSTNMBR, pageNumber);
      }else if(COMPANY==='F2099'){
        return this.clientCalculatedService.getProformascalculatedInvBaruta(CUSTNMBR, pageNumber);
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


