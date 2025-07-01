import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Movie } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, NgFor, MatButtonModule, LoadingComponent, RouterLink, FormsModule, MatCardModule, MatFormFieldModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'shortDescription', 'runTime', 'director', 'actors','genre', 'actions',];
  allData: Movie[] | null = null
  dataSource: Movie[] | null = null;
  search = ''
  genres: string[] = [];
  selectedGenres: { [key: string]: boolean } = {};


  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => {
        this.allData = rsp.data
        this.dataSource = rsp.data
      })
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
