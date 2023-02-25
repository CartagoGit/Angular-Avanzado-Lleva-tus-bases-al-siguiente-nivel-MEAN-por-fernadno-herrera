import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Rutas
import { AppRoutingModule } from './app.routing';
// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
// Componentes
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, PagesModule, AuthModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
