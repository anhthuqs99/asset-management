import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageCode, LanguageCodes, languageKey } from './constant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'asset-management';
  constructor(translateService: TranslateService) {
    translateService.addLangs(LanguageCodes);
    translateService.setDefaultLang(LanguageCode.EN);
    // Restore the language from local storage if available
    const storedLanguage = localStorage.getItem(languageKey) ?? LanguageCode.EN;
    translateService.use(storedLanguage);
  }
}
