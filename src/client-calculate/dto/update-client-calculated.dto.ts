import { PartialType } from '@nestjs/mapped-types';
import { CreateClientCalculatedDto } from './create-client-calculated.dto';

export class UpdateClientCalculatedDto extends PartialType(CreateClientCalculatedDto) {}
