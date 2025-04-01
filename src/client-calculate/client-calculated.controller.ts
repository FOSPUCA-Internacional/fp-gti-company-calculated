import { Controller, Get, Query, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientCalculatedServiceChacao } from './client-calculated-chacao.service';
import { ClientCalculatedHatilloService } from './client-calculated-hatillo.service';
import { ClientCalculatedBarutaService } from './client-calculated-baruta.service';
import { ClientCalculatedCaroniService } from './client-calculated-caroni.service';
import { ClientCalculatedInvbarutaService } from './client-calculated-invbaruta.service';
import { ClientCalculatedManeiroService } from './client-calculated-maneiro.service';
import { ClientCalculatedSanDiegoService } from './client-calculated-san-diego.service';
import { ClientCalculatedTigreService } from './client-calculated-tigre.service';
import { CreateClientCalculatedDto } from './dto/create-client-calculated.dto';
import { UpdateClientCalculatedDto } from './dto/update-client-calculated.dto';

@Controller('clientcalculated')
export class ClientCalculatedController {
  constructor(private readonly clientCalculatedServiceChacao: ClientCalculatedServiceChacao,
              private readonly clientCalculatedServiceHatillo: ClientCalculatedHatilloService,
              private readonly clientCalculatedServiceBaruta: ClientCalculatedBarutaService,
              private readonly clientCalculatedServiceCaroni: ClientCalculatedCaroniService,
              private readonly clientCalculatedServiceInvBaruta: ClientCalculatedInvbarutaService,
              private readonly clientCalculatedServiceManeiro: ClientCalculatedManeiroService,
              private readonly clientCalculatedServiceSanDiego: ClientCalculatedSanDiegoService,
              private readonly clientCalculatedServiceTigre: ClientCalculatedTigreService
            ) {}

  @Post('chacao')
  async processDataChacao(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceChacao.getProformasdataChacao(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('hatillo')
  async processDataHatillo(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceHatillo.getProformasdataHatillo(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('baruta')
  async processDataBaruta(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceBaruta.getProformasdataBaruta(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('caroni')
  async processDataCaroni(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceCaroni.getProformasdataCaroni(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('invbaruta')
  async processDataInvBaruta(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceInvBaruta.getProformasdataInvBaruta(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('maneiro')
  async processDataManeiro(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceManeiro.getProformasdataManeiro(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('sandiego')
  async processDataSanDiego(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceSanDiego.getProformasdataSanDiego(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

  @Post('tigre')
  async processDataTigre(@Body() payload: any) {
    const resultados = await this.clientCalculatedServiceTigre.getProformasdataElTigre(payload);
    return resultados;
    //console.log('Datos recibidos:', payload);
    //return { message: 'Datos procesados correctamente', receivedData: payload };
  }

}


