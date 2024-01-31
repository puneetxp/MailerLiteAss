import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IStatus } from '../../type';
import { FormDataService } from '../../shared/Service/Form/FormData.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-status',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  providers: [FormDataService],
  templateUrl: './add-status.component.html',
  styleUrl: './add-status.component.scss'
})
export class AddStatusComponent {
  Form = new FormGroup({
    name: new FormControl('', Validators.required)
  });
  url = "/api/ipublic/status";
  submit() {
    this.form.post<IStatus>(this.url, this.Form.value).subscribe(i => {
      this.status.push(i);
    })
  }
  constructor(public router: Router, private form: FormDataService) {
    this.form.get<IStatus[]>("/api/ipublic/status").subscribe(i => {
      this.status = i;
    });
  }
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  status: IStatus[] = [];


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (!this.status.find(i => i.name == value)) {
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(status: IStatus): void {
    const index = this.status.indexOf(status);

    if (index >= 0) {
      this.status.splice(index, 1);
      this.form.delete('');
    }
  }

  edit(fruit: IStatus, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.status.indexOf(fruit);
    if (index >= 0) {
      this.status[index].name = value;
    }
  }
}
