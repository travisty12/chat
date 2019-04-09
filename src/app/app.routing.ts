import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { LandingComponent } from './landing/landing.component';
import { SplashComponent } from './splash/splash.component';
import { BoardsComponent } from './boards/boards.component';
import { ChatComponent } from './chat/chat.component';


const appRoutes: Routes = [
  {
    path: '',
    component:SplashComponent
  },
  {
    path: 'landing',
    component:LandingComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  {
    path: 'boards',
    component: BoardsComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
