import { Module } from '@nestjs/common';
import { ClientCalculatedServiceChacao } from './client-calculated-chacao.service';
import { ClientCalculatedHatilloService } from './client-calculated-hatillo.service';
import { ClientCalculatedBarutaService } from './client-calculated-baruta.service';
import { ClientCalculatedCaroniService } from './client-calculated-caroni.service';
import { ClientCalculatedInvbarutaService } from './client-calculated-invbaruta.service';
import { ClientCalculatedManeiroService } from './client-calculated-maneiro.service';
import { ClientCalculatedSanDiegoService } from './client-calculated-san-diego.service';
import { ClientCalculatedTigreService } from './client-calculated-tigre.service';
import { ClientCalculatedController } from './client-calculated.controller';

@Module({
  controllers: [ClientCalculatedController],
  providers: [ClientCalculatedServiceChacao, ClientCalculatedHatilloService,ClientCalculatedBarutaService, ClientCalculatedCaroniService, ClientCalculatedInvbarutaService, ClientCalculatedManeiroService, ClientCalculatedSanDiegoService, ClientCalculatedTigreService], 
})
export class ClientCalculatedModule {}
