import { PartialType } from '@nestjs/mapped-types';
import { CreateCountProformClientDto } from './create-count-proform-client.dto';

export class UpdateCountProformClientDto extends PartialType(CreateCountProformClientDto) {}
