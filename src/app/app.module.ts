//Imported Modules
import { environment } from './../environments/environment.development';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

//Imported Components
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BienvenidaComponent } from './Vistas/bienvenida/bienvenida.component';
import { MenuComponent } from './Vistas/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule, // required animations for toastr
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
