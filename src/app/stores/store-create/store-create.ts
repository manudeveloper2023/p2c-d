import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
  FormsModule,
} from '@angular/forms';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { raw } from 'express';
import { StoreCreateModel, StoreModel } from '../../core/models/store-interface';
import { StoreService } from '../../core/services/store-service';
import { ApiResponse } from '../../core/models/api-response';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface StoreForm {
  code: FormControl<string>;
  address: FormControl<string>;
  openingDate: FormControl<Date>;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-store-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatAnchor,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './store-create.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './store-create.scss',
})
export class StoreCreate {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private storeService = inject(StoreService);
  private snackBar = inject(MatSnackBar);
  protected matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  protected formGroup!: FormGroup<StoreForm>;

  constructor() {
    this.formGroup = this.fb.group({
      code: this.fb.control('', {
        validators: [Validators.required, Validators.pattern('^[A-Z]{3}-\\d{4}$')],
      }),
      address: this.fb.control('', {
        validators: [Validators.required],
      }),
      openingDate: this.fb.control(new Date(), {
        validators: [Validators.required],
      }),
    });
  }

  protected onSubmit(): void {
    if (this.formGroup.invalid) {
      console.log('Form is invalid. Please correct the errors and try again.');
      return;
    }

    const rawValue = this.formGroup.value;

    const payload: StoreCreateModel = {
      code: rawValue.code ?? '',
      address: rawValue.address ?? '',
      openingDate: rawValue.openingDate ? new Date(rawValue.openingDate) : null,
    };

    this.storeService.store(payload).subscribe({
      next: (response: ApiResponse<StoreModel>) => {
        console.log('Store created successfully:', response);
        this.formGroup.reset();
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
