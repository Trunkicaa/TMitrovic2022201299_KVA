import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Movie } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-search',
  imports: [MatTableModule, NgIf, NgFor, MatButtonModule, LoadingComponent, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']  // <-- plural
})
export class SearchComponent {
  displayedColumns: string[] = ['movieId', 'title', 'director', 'genre', 'actions', ];
  dataSource: Movie[] | null = null;

  constructor(public utils: UtilsService) {
MovieService.getMovies()
  .then(rsp => {
    this.dataSource = rsp.data.slice(0, 30);
  })
}
}
