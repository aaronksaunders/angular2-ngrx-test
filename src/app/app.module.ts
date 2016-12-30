import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { listReducer, ListItem, DataItem, selectedItem } from './listStore';

// ngrx
import { StoreModule} from '@ngrx/store';
import { ListComponent, ListItemComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({listReducer,selectedItem}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
