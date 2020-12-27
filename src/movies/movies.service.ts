import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/createMovie.dto';
import { UpdateMovieDTO } from './dto/updateMovie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    {
      id: 1,
      title: '겨울왕국',
      year: 2018,
      genres: ['판타지', '애니메이션'],
    },
    {
      id: 2,
      title: '어벤져스',
      year: 2018,
      genres: ['판타지', '액션'],
    },
  ];
  private autoIncId: number;
  constructor() {
    this.autoIncId = 3;
  }

  findAll(): Movie[] {
    return this.movies;
  }
  findById(id: number): Movie {
    const movie = this.movies.find((elem) => elem.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} is Not Found!`);
    }
    return this.movies.find((elem) => elem.id === +id);
  }
  create(data: CreateMovieDTO): Movie {
    const createdData: Movie = {
      id: this.autoIncId,
      ...data,
    };
    this.movies.push(createdData);
    this.autoIncId += 1;
    return createdData;
  }
  delete(id: number): number {
    this.findById(id);
    this.movies = this.movies.filter((elem) => elem.id !== id);
    return id;
  }
  update(id: number, updateData: UpdateMovieDTO): number {
    const movie = this.findById(id);
    this.delete(id);
    this.movies.push({ ...movie, ...updateData });
    return id;
  }
}
