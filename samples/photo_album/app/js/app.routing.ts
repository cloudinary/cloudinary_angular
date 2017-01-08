import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PhotoListComponent} from './photo-list/photo-list.component';
import {PhotoUploadComponent} from './photo-album/photo-upload.component';

const appRoutes: Routes = [
    {
        path: 'photos',
        component: PhotoListComponent
    },
    {
        path: 'photos/new',
        component: PhotoUploadComponent
    },
    {
        path: '',
        redirectTo: '/photos',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
