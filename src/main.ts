import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { DialogService } from './app/services/dialog.service';
import { inject } from '@angular/core';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}