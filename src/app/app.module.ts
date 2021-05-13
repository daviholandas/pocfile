import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { DocumentViewerModule } from '@txtextcontrol/tx-ng-document-viewer';
import "file-viewer";
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxDocViewerModule,
    DocumentViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
