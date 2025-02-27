import { Component } from '@angular/core';
import { AtmService } from '../../services/atm.service';
import { Atm } from '../../model/atm.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Paging } from '../../logic/paging.logic';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public atms: Atm[] = [];
  public showConfirmationDeleteMessage: boolean = false;
  public atmToDelete: Atm | null = null;
  public loadedData: boolean = false;
  public paging = new Paging();
  public currentPage: number = 1;
  constructor(private atmService: AtmService) {
    this.initData().catch(console.error);
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
      this.atmToDelete = null;
      this.showConfirmationDeleteMessage = false;
    } catch (error) {
      console.error(error);
    }
  }

  private async initData() {
    try {
      await this.getAtms();
    } catch (error) {
      console.error(error);
    }
  }

  private async getAtms() {
    if (this.paging.getCanLoadMore()) {
      try {
        const atmsData = await this.atmService.getAtms(
          this.paging.getPagingParameters()
        );
        this.atms.push(...atmsData);
        this.paging.nextPage(atmsData.length);
        this.loadedData = true;
        await this.getAtms();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
