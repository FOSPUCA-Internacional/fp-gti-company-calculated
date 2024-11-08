import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountProformClientsService } from './count-proform-clients.service';
import { CreateCountProformClientDto } from './dto/create-count-proform-client.dto';
import { UpdateCountProformClientDto } from './dto/update-count-proform-client.dto';

@Controller('countproformclients')
export class CountProformClientsController {
  constructor(private readonly countProformClientsService: CountProformClientsService) {}

  @Get(':CUSTNMBR')
  async getcountProformasbyclients(
    @Param('CUSTNMBR') CUSTNMBR: string, 
    //@Query('type') type: string
  ) {
    
        return this.countProformClientsService.getcountproformabyclient(CUSTNMBR);
      
  }
}
