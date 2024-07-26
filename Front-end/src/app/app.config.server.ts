import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient } from '@angular/common/http';


const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient() // Proveer HttpClient
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
