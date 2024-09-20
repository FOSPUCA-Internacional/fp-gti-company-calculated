import { PartialType } from '@nestjs/mapped-types';
import { CreateApolloDto } from './create-apollo.dto';

export class UpdateApolloDto extends PartialType(CreateApolloDto) {}
