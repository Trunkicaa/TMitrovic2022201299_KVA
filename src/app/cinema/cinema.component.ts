import { Component } from '@angular/core';
import { CinemaModel } from '../../models/cinema.model';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-cinema',
  imports: [NgIf, MatButtonModule, MatTableModule],
  templateUrl: './cinema.component.html',
  styleUrl: './cinema.component.css'
})
export class CinemaComponent {
  displayedColumns: string[] = ['id', 'name', 'country', 'website', 'actions'];
  dataSource: CinemaModel[] = CinemaService.getCinemas()
}
