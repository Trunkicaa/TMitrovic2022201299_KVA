import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Movie, PriceType } from '../../models/movie.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, NgFor, MatButtonModule, LoadingComponent, RouterLink, FormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'shortDescription', 'runTime', 'director', 'actors', 'genre', 'projections', 'actions',];
  allData: Movie[] | null = null
  dataSource: Movie[] | null = null;
  search = ''
  genres: string[] = [];
  userInput: string = ""
  selectedDate: string | null = null
  movieTitle: string | null = null;
  movieTitleList: string[] = [];
  rTime: number | null = null;
  rTimeList: number[] = [];
  director: string | null = null;
  directorList: string[] = [];
  genreList: string[] = [];
  selectedGenre: string | null = null;
  actorList: string[] = [];
  selectedActor: string | null = null;
  selectedStartDate: string | null = null;
  releaseDateList: string[] = [];
  public user: UserModel | null = null;
  public movie: Movie | null = null;
  


  constructor(public utils: UtilsService) {
    this.user = UserService.getActiveUser();
    MovieService.getMovies()
      .then(rsp => {
        rsp.data.forEach((movie: Movie, prices: PriceType) => {
          movie.projection = MovieService.generateProjections();
        });
        this.allData = rsp.data;
        this.dataSource = rsp.data;
        this.searchCriteria(rsp.data);
      });
  }

  public searchCriteria(source: Movie[]) {
    this.movieTitleList = source.map(obj => obj.title)
      .filter((titl: string, i: number, ar: any[]) => ar.indexOf(titl) === i);

    this.directorList = source.map(obj => obj.director.name)
      .filter((name: string, i: number, ar: any[]) => ar.indexOf(name) === i);

    this.rTimeList = source.map(movie => movie.runTime)
      .filter((val, i, arr) => arr.indexOf(val) === i)
      .sort((a, b) => a - b);

    this.genreList = source
      .flatMap(movie => movie.movieGenres?.map(g => g.genre.name) || [])
      .filter((genre, i, arr) => arr.indexOf(genre) === i)
      .sort();

    this.actorList = source
      .flatMap(movie => movie.movieActors?.map(ma => ma.actor.name) || [])
      .filter((actor, i, arr) => arr.indexOf(actor) === i)
      .sort();

    this.releaseDateList = source
      .map(movie => movie.startDate?.split('T')[0] || '') // or movie.startDate
      .filter(date => date !== '')
      .filter((date, i, arr) => arr.indexOf(date) === i)
      .sort();
  }



  public doReset() {
    this.userInput = ''
    this.movieTitle = null
    this.director = null
    this.rTime = null
    this.selectedGenre = null
    this.selectedActor = null
    this.selectedDate = null
    this.dataSource = this.allData
    this.searchCriteria(this.allData!)
  }


  public doFilterChain() {
    if (this.allData == null) return;

    this.dataSource = this.allData!
      .filter(obj => {
        if (this.userInput === '') return true;
        return obj.title.toLowerCase().includes(this.userInput.toLowerCase()) ||
          obj.movieId.toString().includes(this.userInput) ||
          obj.shortDescription.toLowerCase().includes(this.userInput.toLowerCase());
      })
      .filter(obj => {
        if (!this.director) return true;
        return obj.director.name === this.director;
      })
      .filter(movie => {
        if (!this.rTime) return true;
        return movie.runTime === this.rTime;
      })
      .filter(obj => {
        if (!this.movieTitle) return true;
        return obj.title === this.movieTitle;
      })
      .filter(movie => {
        if (!this.selectedGenre) return true;
        return movie.movieGenres?.some(g => g.genre.name === this.selectedGenre);
      })
      .filter(movie => {
        if (!this.selectedActor) return true;
        return movie.movieActors?.some(ma => ma.actor.name === this.selectedActor);
      })
      .filter(movie => {
        if (!this.selectedDate) return true;

        const start = new Date(`${this.selectedDate}T00:00:00`);
        const end = new Date(`${this.selectedDate}T23:59:59`);

        return movie.projection?.some(proj => {
          const projDate = new Date(proj.startTime);
          return projDate >= start && projDate <= end;
        }) ?? false;
      })

      .filter(movie => {
        if (!this.selectedStartDate) return true;
        const movieDate = movie.startDate?.split('T')[0]; // or movie.startDate
        return movieDate === this.selectedStartDate;
      });

    this.searchCriteria(this.dataSource);
  }


  public doSearch(e: any) {
    const search = e.target.value
    if (this.allData == null) return

    if (search == '') {
      this.dataSource = this.allData
      return
    }

    this.dataSource = this.allData
      .filter(obj => {
        return obj.title.toLowerCase().includes(search) || obj.movieId.toString().includes(search)
          || obj.director.name.toLowerCase().includes(search) || obj.movieGenres?.some(g => g.genre.name.toLowerCase().includes(search))
      })
  }


}
