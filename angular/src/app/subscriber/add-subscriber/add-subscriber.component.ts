import { Component, Input } from '@angular/core';
import { CreatesubscriberForm } from '../../shared/Form/Validation/Subscriber';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormDataService } from '../../shared/Service/Form/FormData.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { enviroment } from '../../env';
import { Router } from '@angular/router';
import { IStatus } from '../../type';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-subscriber',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  providers: [FormDataService],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent {
  status: IStatus[] = []
  // = new MatTableDataSource<ISubscriber>([]);
  constructor(public router: Router, private form: FormDataService) {
    this.form.get<IStatus[]>(enviroment.url + "/api/ipublic/status").subscribe({
      next: (i) => {
        this.status = i;
      }
    });
  }
  @Input() id !: number
  Form = CreatesubscriberForm;

  url = "/api/ipublic/subscriber/";
  submit() {
    if (this.Form.valid) {
      this.form.post(enviroment.url + this.url, this.Form.value).subscribe(i => {
        this.router.navigateByUrl('');
      })
    }
  }

}
