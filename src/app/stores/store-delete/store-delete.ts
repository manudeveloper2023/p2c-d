import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreModel } from '../../core/models/store-interface';
import { StoreService } from '../../core/services/store-service';
import { ApiResponse } from '../../core/models/api-response';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogYesNo } from '../components/dialog-yes-no/dialog-yes-no';

@Component({
  selector: 'app-store-delete',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule],
  templateUrl: './store-delete.html',
  styleUrl: './store-delete.scss',
})
export class StoreDelete implements AfterViewInit {
  private storeService = inject(StoreService);
  private readonly dialog = inject(MatDialog);
  protected displayedColumns: string[] = [
    'id',
    'code',
    'address',
    'createdAt',
    'openingDate',
    'actions',
  ];
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

  onDelete(id: string) {
    const dialogRef = this.dialog.open(DialogYesNo, {
      width: '350px',
      data: {
        title: 'Eliminar tienda',
        message: '¿Deseas eliminar esta tienda? Esta acción no se puede deshacer.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        this.storeService
          .destroy(id)
          .pipe(switchMap(() => this.storeService.index()))
          .subscribe({
            next: (res: ApiResponse<StoreModel[]>) => {
              this.dataSource.data = res.data;
            },
            error: (err) => {
              console.error('Error deleting store or fetching stores:', err);
            },
          });
      }

      console.log('Dialog result:', result);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator();
  }
}
