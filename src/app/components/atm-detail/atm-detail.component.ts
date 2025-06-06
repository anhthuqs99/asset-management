import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AtmService } from '../../services/atm.service';
import { Atm, AtmEditData } from '../../model/atm.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AtmStoreService } from '../../services/atm-store.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-atm-detail',
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './atm-detail.component.html',
  styleUrl: './atm-detail.component.scss',
})
export class AtmDetailComponent implements OnInit {
  public atmID!: string;
  public atm: Atm | null = null;
  public atmForm = new FormGroup({
    name: new FormControl('', Validators.required),
    manufacturer: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    serial_number: new FormControl('', Validators.required),
  });
  public loadedData: boolean = false;
  public errorMessage: string = '';
  public successMessage: string = '';
  public savingMessage: string = '';
  public isSavingData: boolean = false;

  constructor(
    private atmService: AtmService,
    private route: ActivatedRoute,
    private atmStoreService: AtmStoreService
  ) {
    // this.initData().catch(console.error);
  }

  ngOnInit(): void {
    this.atmID = this.route.snapshot.paramMap.get('id') ?? '';
    this.atmStoreService.fetchAtm(this.atmID);
    this.atmStoreService.getAtm().subscribe((atm) => {
      this.atm = atm;
      this.atmForm.patchValue(atm);
    });
    this.atmStoreService.getDetailSuccess().subscribe((success) => {
      this.loadedData = success;
    });
    this.atmStoreService.getDetailLoading().subscribe((loading) => {
      this.isSavingData = loading;
    });
  }

  public async addOrEditAtm() {
    if (!this.atmForm.valid) {
      return;
    }

    const atmData = this.atmForm.getRawValue() as AtmEditData;
    if (this.atmID) {
      this.atmStoreService.updateAtm(this.atmID, atmData);
    } else {
      this.atmStoreService.createAtm(atmData);
    }

    // this.savingMessage = 'Saving...';
    // if (this.atm) {
    //   await this.editAtm();
    // } else {
    //   await this.addAtm();
    // }
    // this.savingMessage = '';
  }

  public cancel() {
    window.history.back();
  }

  public isDataChanged() {
    if (!this.atm) {
      return false;
    }

    const atmData = this.atmForm.getRawValue() as AtmEditData;
    return (
      atmData.name !== this.atm.name ||
      atmData.manufacturer !== this.atm.manufacturer ||
      atmData.type !== this.atm.type ||
      atmData.serial_number !== this.atm.serial_number
    );
  }

  public async addAtm() {
    if (this.atmForm.valid) {
      const atmData = this.atmForm.getRawValue() as AtmEditData;

      try {
        const newAtm = await this.atmService.addAtm(atmData);
        this.atm = newAtm;
        this.successMessage = 'ATM added successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Something went wrong, cannot add atm';
        this.savingMessage = '';
      }
    }
  }

  public async editAtm() {
    if (this.atm && this.atmForm.valid) {
      const atmData = this.atmForm.getRawValue() as AtmEditData;
      try {
        await this.atmService.editAtm(this.atm && this.atm.id, atmData);
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Something went wrong, cannot edit atm';
        this.savingMessage = '';
      }
    }
  }

  // private async initData() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.atm = await this.atmService.getAtm(id);
  //     this.atmForm.patchValue(this.atm);
  //   }
  //   this.loadedData = true;
  // }
}
