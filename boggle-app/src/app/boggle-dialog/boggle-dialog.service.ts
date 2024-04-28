import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoggleDialogComponent } from './boggle-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class BoggleDialogService {
  constructor(private dialog: MatDialog) {}

  // Service to open dialog
  public openDialog(data: { message: string; button: string }): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { top: '0' };
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(BoggleDialogComponent, dialogConfig);
    if (data.button === 'Close') {
      dialogRef.close;
    } else {
      dialogRef.afterClosed().subscribe(() => {
        location.reload();
      });
    }
  }
}
