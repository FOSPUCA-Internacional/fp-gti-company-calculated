import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientInformationService } from './client-information.service';
import { CreateClientInformationDto } from './dto/create-client-information.dto';
import { UpdateClientInformationDto } from './dto/update-client-information.dto';

@Controller('clientinformation')
export class ClientInformationController {
  constructor(private readonly clientInformationService: ClientInformationService) {}

  @Get(':PAGE/:COMPANY')
    async getClientInfo(
      @Param('PAGE') PAGE: string,
      @Param('COMPANY') COMPANY: string,
      //@Query('type') type: string
    ) {
        const pageNumber = parseInt(PAGE, 10);
      
        if(COMPANY==='F5618'){
          return this.clientInformationService.getClientInformationByRifChacao(pageNumber);
        }else if(COMPANY==='F0016'){
          return this.clientInformationService.getClientInformationByRifManeiro(pageNumber);
        }else if(COMPANY==='F0015'){
          return this.clientInformationService.getClientInformationByRifCaroni(pageNumber);
        }else if(COMPANY==='F0004'){
          return this.clientInformationService.getClientInformationByRifHatillo(pageNumber);
        }else if(COMPANY==='F1099'){
          return this.clientInformationService.getClientInformationByRifBaruta(pageNumber);
        }else if(COMPANY==='S6759'){
          return this.clientInformationService.getClientInformationByRifSanDiego(pageNumber);
        }else if(COMPANY==='F7834'){
          return this.clientInformationService.getClientInformationByRifElTigre(pageNumber);
        }else if(COMPANY==='F2099'){
          return this.clientInformationService.getClientInformationByRifInvBaruta(pageNumber);
        }
    }

    @Get(':CUSTNMBR/:COMPANY')
    async getClientInfobyRif(
      @Param('CUSTNMBR') CUSTNMBR: string,
      @Param('COMPANY') COMPANY: string,
      //@Query('type') type: string
    ) {
      
        if(COMPANY==='F5618'){
          return this.clientInformationService.getClientInformationByRifChacao(CUSTNMBR);
        }else if(COMPANY==='F0016'){
          return this.clientInformationService.getClientInformationByRifManeiro(CUSTNMBR);
        }else if(COMPANY==='F0015'){
          return this.clientInformationService.getClientInformationByRifCaroni(CUSTNMBR);
        }else if(COMPANY==='F0004'){
          return this.clientInformationService.getClientInformationByRifHatillo(CUSTNMBR);
        }else if(COMPANY==='F1099'){
          return this.clientInformationService.getClientInformationByRifBaruta(CUSTNMBR);
        }else if(COMPANY==='S6759'){
          return this.clientInformationService.getClientInformationByRifSanDiego(CUSTNMBR);
        }else if(COMPANY==='F7834'){
          return this.clientInformationService.getClientInformationByRifElTigre(CUSTNMBR);
        }else if(COMPANY==='F2099'){
          return this.clientInformationService.getClientInformationByRifInvBaruta(CUSTNMBR);
        }
    }
}
