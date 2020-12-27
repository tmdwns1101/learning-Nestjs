import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/createMovie.dto';
import { UpdateMovieDTO } from './dto/updateMovie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.findAll();
  }
  @Get('search')
  search(@Query('year') year: string, @Query('title') title: string) {
    console.log(year, title);
    return 'search Movie...';
  }
  @Get(':id')
  getOne(@Param('id') movieId: number) {
    return this.moviesService.findById(movieId);
  }
  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }
  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.delete(movieId);
  }
  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }
}
