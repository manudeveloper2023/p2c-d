import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreModel } from '../../core/models/store-interface';
import { StoreService } from '../../core/services/store-service';
import { ApiResponse } from '../../core/models/api-response';

@Component({
  selector: 'app-store-list',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './store-list.html',
  styleUrl: './store-list.scss',
})
export class StoreList implements AfterViewInit {
  private storeService = inject(StoreService);
  protected displayedColumns: string[] = ['id', 'code', 'address', 'createdAt', 'openingDate'];
  protected dataSource: MatTableDataSource<StoreModel> = new MatTableDataSource<StoreModel>([]);
  protected paginator = viewChild(MatPaginator);

  constructor() {
    this.storeService.index().subscribe({
      next: (response: ApiResponse<StoreModel[]>) => {
        console.log(response);
        this.dataSource.data = response.data;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator();
  }
}
