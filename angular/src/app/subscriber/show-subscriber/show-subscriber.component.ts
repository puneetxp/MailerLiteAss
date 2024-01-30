import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { IPaginateSubscriber, IStatus, ISubscriber } from '../../type';
import { Route, Router } from '@angular/router';
import { enviroment } from '../../env';

@Component({
  selector: 'app-show-subscriber',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatTableModule],
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
  status: IStatus[] = []
  getstatus(id: number) {
    return this.status.find(i => i.id == id);
  }
  // = new MatTableDataSource<ISubscriber>([]);
  constructor(private route: Router, private http: HttpClient) {
    this.http.get<IStatus[]>(enviroment.url + "/api/ipublic/status").subscribe({
      next: (i) => {
        this.status = i;
      }
    });

    this.http.get<IPaginateSubscriber>(enviroment.url + "/api/ipublic/subscriber").subscribe({
      next: (i: IPaginateSubscriber) => {
        this.dataSource = new MatTableDataSource(i.item);
        this.result = i.result;
        this.pageNumber = i.pageNumber;
        this.totalpages = i.totalpages
        this.get = i.get;
      }
    });
  }
  handlePaginate(event: PageEvent) {
    console.log(event);
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
