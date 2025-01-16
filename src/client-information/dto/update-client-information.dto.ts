import { PartialType } from '@nestjs/mapped-types';
import { CreateClientInformationDto } from './create-client-information.dto';

export class UpdateClientInformationDto extends PartialType(CreateClientInformationDto) {}
