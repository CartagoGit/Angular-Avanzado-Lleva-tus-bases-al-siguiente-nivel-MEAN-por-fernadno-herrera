import { Injector, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//* Injector para cargar servicios en clases
import { ServiceLocator } from './shared/services/injector/locator.service';
// Interceptors
import { ChangeTypeResponseInterceptor } from './shared/interceptors/change-type-response.interceptor';
import { MaintenanceInterceptor } from './shared/interceptors/maintenance.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
// Rutas
import { AppRoutingModule } from './app.routing';
// Modulos

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Componentes
import { AppComponent } from './app.component';
import { ModalsModule } from './modals/modals.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		CoreModule,
		SharedModule,
		ModalsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MaintenanceInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ChangeTypeResponseInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	//? Crea un servicio de inyeccion global
	constructor(private injector: Injector) {
		ServiceLocator.injector = this.injector;
	}
}
