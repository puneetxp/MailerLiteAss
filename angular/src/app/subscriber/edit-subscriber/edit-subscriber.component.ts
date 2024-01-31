import { Component, Input, OnInit } from '@angular/core';
import { UpdatesubscriberForm } from '../../shared/Form/Validation/Subscriber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enviroment } from '../../env';
import { IStatus, ISubscriber } from '../../type';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormDataService } from '../../shared/Service/Form/FormData.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-subscriber',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  providers: [FormDataService],
  templateUrl: './edit-subscriber.component.html',
  styleUrl: './edit-subscriber.component.scss'
})
export class EditSubscriberComponent implements OnInit {
  url = "/api/ipublic/subscriber/";
  @Input() id!: number
  Form = UpdatesubscriberForm;
  status: IStatus[] = []
  // = new MatTableDataSource<ISubscriber>([]);
  constructor(private router: Router, private form: FormDataService) {
    this.form.get<IStatus[]>(enviroment.url + "/api/ipublic/status").subscribe({
      next: (i) => {
        this.status = i;
      }
    });
  }
  ngOnInit(): void {
    this.form.get<ISubscriber>(enviroment.url + this.url + this.id).subscribe(i => {
      this.Form.setValue(i as any)
    })
  }
  submit() {
    this.form.patch(enviroment.url + this.url + this.id, this.Form.value).subscribe(i => {
      this.router.navigateByUrl('');
    })
  }
}
