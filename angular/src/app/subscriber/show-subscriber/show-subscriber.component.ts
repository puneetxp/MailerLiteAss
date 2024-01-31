import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { IPaginateSubscriber, IStatus, ISubscriber } from '../../type';
import { Router, provideRouter } from '@angular/router';
import { enviroment } from '../../env';
import { FormDataService } from '../../shared/Service/Form/FormData.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-show-subscriber',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTableModule, MatProgressSpinnerModule],
  providers: [FormDataService],
  templateUrl: './show-subscriber.component.html',
  styleUrl: './show-subscriber.component.scss'
})
export class ShowSubscriberComponent {
  result!: number
  pageNumber!: number
  pageItems!: number
  totalpages!: number
  get!: string;
  dataSource!: MatTableDataSource<ISubscriber, MatPaginator>
  getstatus(id: number) {
    return this.status.find(i => i.id == id)?.name || '';
  }
  status: IStatus[] = []
  isLoadingResults: boolean = true;
  // = new MatTableDataSource<ISubscriber>([]);
  constructor(private route: Router, private form: FormDataService) {
    this.form.get<IStatus[]>(enviroment.url + "/api/ipublic/status").subscribe({
      next: (i) => {
        this.status = i;
      }
    });

    this.form.get<IPaginateSubscriber>(enviroment.url + "/api/ipublic/subscriber").subscribe({
      next: (i: IPaginateSubscriber) => this.setpage(i)
    });
  }
  setpage(i: IPaginateSubscriber) {
    this.result = i.result;
    this.pageNumber = i.pageNumber;
    this.dataSource = new MatTableDataSource(i.item);
    this.totalpages = i.totalpages
    this.get = i.get;
    this.isLoadingResults = false;
  }
  handlePaginate(event: PageEvent) {
    this.form.get<IPaginateSubscriber>(enviroment.url + "/api/ipublic/subscriber", { page: parseInt(this.pageNumber.toString()) + 1 }).subscribe({
      next: (i: IPaginateSubscriber) => this.setpage(i)
    });
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'lastname', 'status_id'];

  //  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  redirect(id: number) {
    this.route.navigateByUrl("/subscriber/" + id)
  }
}
