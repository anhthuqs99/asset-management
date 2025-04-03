import { Component, OnInit } from '@angular/core';
import { AtmService } from '../../services/atm.service';
import { Atm } from '../../model/atm.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Paging } from '../../logic/paging.logic';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AtmStoreService } from '../../services/atm-store.service';
import { LanguageCode, languageKey, LanguageOptions } from '../../constant';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public atms: Atm[] = [];
  public filteredAtms: Atm[] = [];
  public searchTerm: string = '';
  public showConfirmationDeleteMessage: boolean = false;
  public atmToDelete: Atm | null = null;
  public loadedData: boolean = false;
  public paging = new Paging();
  public currentPage: number = 1;

  // Language selection
  public languageOptions = LanguageOptions;
  public selectedLanguage = this.languageOptions[0].code;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  constructor(
    private atmService: AtmService,
    private atmStoreService: AtmStoreService,
    private translateService: TranslateService
  ) {
    // this.initData().catch(console.error);
    this.selectedLanguage = this.translateService.currentLang as LanguageCode;
  }

  ngOnInit() {
    this.atmStoreService.fetchAtms();
    this.atmStoreService.getAtms().subscribe((atms) => {
      this.atms = atms;
      this.filteredAtms = atms;
    });

    this.atmStoreService.getSuccess().subscribe((success) => {
      this.loadedData = success;
    });

    this.searchSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.search(searchTerm);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSearchTermChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  private search(searchTerm: string) {
    this.filteredAtms = this.atms.filter(
      (atm) =>
        atm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atm.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atm.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  public showConfirmationDelete(atm: Atm) {
    this.atmToDelete = atm;
    this.showConfirmationDeleteMessage = true;
  }

  public hideConfirmationDelete() {
    this.showConfirmationDeleteMessage = false;
    this.atmToDelete = null;
  }

  public async deleteAtm() {
    try {
      if (!this.atmToDelete) {
        return;
      }

      await this.atmService.deleteAtm(this.atmToDelete?.id);
      this.atms = this.atms.filter((atm) => atm.id !== this.atmToDelete?.id);
      this.filteredAtms = this.filteredAtms.filter(
        (atm) => atm.id !== this.atmToDelete?.id
      );
      this.atmToDelete = null;
      this.showConfirmationDeleteMessage = false;
    } catch (error) {
      console.error(error);
    }
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredAtms);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(data, 'data.xlsx');
  }

  public onLanguageChange(languageCode: LanguageCode) {
    this.selectedLanguage = languageCode;
    this.translateService.use(languageCode);
    localStorage.setItem(languageKey, languageCode);
  }

  // private async initData() {
  //   try {
  //     await this.getAtms();
  //     this.filteredAtms = this.atms;
  //     this.loadedData = true;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // private async getAtms() {
  //   if (this.paging.getCanLoadMore()) {
  //     try {
  //       const atmsData = await this.atmService.getAtms(
  //         this.paging.getPagingParameters()
  //       );
  //       this.atms.push(...atmsData);
  //       this.paging.nextPage(atmsData.length);
  //       await this.getAtms();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }
}
