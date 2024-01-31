import { Component, Input } from '@angular/core';
import { CreatesubscriberForm } from '../../shared/Form/Validation/Subscriber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormDataService } from '../../shared/Service/Form/FormData.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { enviroment } from '../../env';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subscriber',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [FormDataService],

  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent {

  constructor(private formData: FormDataService, private router: Router) { }
  @Input() id !: number
  Form = CreatesubscriberForm;

  url = "/api/ipublic/subscriber/";
  submit() {
    this.formData.post(enviroment.url + this.url, this.Form.value).subscribe(i => {
      this.router.navigateByUrl('');
    })
  }
}
