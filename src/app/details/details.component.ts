import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule,MatListModule, MatButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie: Movie | null = null

  public constructor (private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params=>{
      console.log(params)
      MovieService.getMovieById(params['id'])
      .then(rsp=> {
        this.movie = rsp.data
      })
    })
  }
}
