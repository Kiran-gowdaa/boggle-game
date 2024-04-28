import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoggleHeaderComponent } from './boggle-header/boggle-header.component';
import { BoggleHolderModule } from './boggle-holder/boggle-holder.module';
import { BoggleTimerComponent } from './boggle-timer/boggle-timer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BoggleLanguageComponent } from './boggle-language/boggle-language.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    BoggleHeaderComponent,
    BoggleTimerComponent,
    BoggleLanguageComponent,
  ],
  imports: [
    BrowserModule,
    BoggleHolderModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync('noop'), HttpClient],
})
export class AppModule {}
