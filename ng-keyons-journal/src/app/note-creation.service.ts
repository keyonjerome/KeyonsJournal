import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CreatenotedialogComponent } from './createnotedialog/createnotedialog.component';

@Injectable({
  providedIn: 'root'
})
export class NoteCreationService {

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }

  openDialog(data?: {EntryID: string, Header: string, Content: string}, firstEntry?: boolean): void {
    if (this.dialog.openDialogs.length > 0) { return; }
    console.log('Data:' + data);
    if (data !== undefined) {
      console.log('Wow!');
      console.log(data);
      const dialogRef = this.dialog.open(CreatenotedialogComponent, {
      width: '90vw',
      data: {EntryID: data.EntryID, Header: data.Header, Content: data.Content, FirstEntry: firstEntry},
    });
      dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar();

    });
    } else if (firstEntry !== undefined) {
      const dialogRef = this.dialog.open(CreatenotedialogComponent, {
        width: '90vw',
        data: {FirstEntry: firstEntry},
      });
      dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar();

      });
    } else {

      const dialogRef = this.dialog.open(CreatenotedialogComponent, {
        width: '90vw',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.openSnackBar();

      });
    }

}


openSnackBar() {
  // this.snackBar.openFromComponent(AddNoteButtonComponent,
  //    {horizontalPosition: 'right',
  // verticalPosition: 'bottom',
  // panelClass: 'snackBarInfo',});
  const snackBarRef = this.snackBar.open('Create a note', 'NEW NOTE', {horizontalPosition: 'right',
  verticalPosition: 'bottom',
  panelClass: 'snackBarInfo', });
  snackBarRef.onAction().subscribe(() => this.openDialog());

}
}
