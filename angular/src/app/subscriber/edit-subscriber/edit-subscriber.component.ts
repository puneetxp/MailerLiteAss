import { Component, Input, OnInit } from '@angular/core';
import { UpdatesubscriberForm } from '../../shared/Form/Validation/Subscriber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { enviroment } from '../../env';
import { ISubscriber } from '../../type';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormDataService } from '../../shared/Service/Form/FormData.service';

@Component({
  selector: 'app-edit-subscriber',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [FormDataService],
  templateUrl: './edit-subscriber.component.html',
  styleUrl: './edit-subscriber.component.scss'
})
export class EditSubscriberComponent implements OnInit {
   url = "/api/ipublic/subscriber/";
  @Input() id!: number
  Form = UpdatesubscriberForm;
  ngOnInit(): void {
    this.http.get<ISubscriber>(enviroment.url + this.url + this.id).subscribe(i => {
      this.Form.setValue(i as any)
    })
  }
  constructor(private formData: FormDataService, private router: Router, private http: HttpClient) { }
  submit() {
    this.formData.patch(enviroment.url + this.url + this.id, this.Form.value).subscribe(i => {
      this.router.navigateByUrl('');
    })
  }
}
