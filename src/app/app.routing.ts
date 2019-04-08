import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
