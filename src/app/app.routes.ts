import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Pets } from './components/pets/pets';
import { Profile } from './pages/profile/profile';
import { About } from './pages/about/about';

export const routes: Routes = [

{ path: '', component: Home },
  { path: 'pets', component: Pets },
  { path: 'profile', component: Profile }, 
  { path: 'about', component: About },
];
