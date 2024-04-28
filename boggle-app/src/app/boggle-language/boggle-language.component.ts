import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-boggle-language',
  templateUrl: './boggle-language.component.html',
  styleUrl: './boggle-language.component.css',
})
export class BoggleLanguageComponent implements OnInit {
  public lang: string = '';

  constructor(private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
  }

  public changeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    // Keep the selected langauge as it is when page reloaded
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}
