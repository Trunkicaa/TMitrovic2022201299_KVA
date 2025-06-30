import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { CinemaComponent } from './cinema/cinema.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ReserveComponent } from './reserve/reserve.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'search', component: SearchComponent},
    {path: 'cinema', component: CinemaComponent},
    {path: 'details/:id/reserve', component: ReserveComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user', component: UserComponent},
    {path: '**', redirectTo: ''}
]
