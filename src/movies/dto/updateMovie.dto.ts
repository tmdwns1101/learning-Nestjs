import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './createMovie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
