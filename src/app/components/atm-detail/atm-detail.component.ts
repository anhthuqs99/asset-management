import { Component } from '@angular/core';
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

@Component({
  selector: 'app-atm-detail',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './atm-detail.component.html',
  styleUrl: './atm-detail.component.scss',
})
export class AtmDetailComponent {
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

  constructor(private atmService: AtmService, private route: ActivatedRoute) {
    this.initData().catch(console.error);
  }

  public async addOrEditAtm() {}

  public cancel() {
    window.history.back();
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
      }
    }
  }

  private async initData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.atm = await this.atmService.getAtm(id);
      this.atmForm.patchValue(this.atm);
    }
    this.loadedData = true;
  }
}
