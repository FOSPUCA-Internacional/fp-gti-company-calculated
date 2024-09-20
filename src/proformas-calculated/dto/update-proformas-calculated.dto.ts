import { PartialType } from '@nestjs/mapped-types';
import { CreateProformasCalculatedDto } from './create-proformas-calculated.dto';

export class UpdateProformasCalculatedDto extends PartialType(CreateProformasCalculatedDto) {}
