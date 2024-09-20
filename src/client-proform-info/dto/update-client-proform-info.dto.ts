import { PartialType } from '@nestjs/mapped-types';
import { CreateClientCalculatedDto } from './create-client-proform-info.dto';

export class UpdateClientCalculatedDto extends PartialType(CreateClientCalculatedDto) {}
