import { Component, Input } from '@angular/core';
import { CreatesubscriberForm } from '../../shared/Form/Validation/Subscriber';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-add-subscriber',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent {

  constructor(private http: HttpClient) { }
  @Input() id !: number
  AddForm = CreatesubscriberForm;
}
