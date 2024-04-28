import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BoggleDiceHolderComponent } from './boggle-dice-holder/boggle-dice-holder.component';
import { BoggleHolderComponent } from './boggle-holder.component';
import { BoggleResultHolderComponent } from './boggle-result-holder/boggle-result-holder.component';
import { BoggleService } from '../service/boggle.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BoggleDialogService } from '../boggle-dialog/boggle-dialog.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    BoggleHolderComponent,
    BoggleDiceHolderComponent,
    BoggleResultHolderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    BoggleDiceHolderComponent,
    BoggleHolderComponent,
    BoggleResultHolderComponent,
  ],
  providers: [BoggleService, BoggleDialogService],
})
export class BoggleHolderModule {}
