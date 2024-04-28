import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-boggle-dialog',
  templateUrl: './boggle-dialog.component.html',
  styleUrls: ['./boggle-dialog.component.css'],
})
export class BoggleDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<BoggleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; button: string }
  ) {}
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
