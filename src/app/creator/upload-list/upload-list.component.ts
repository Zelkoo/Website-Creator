import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FileUploadService} from "../file-upload/file-upload.service";
import {map} from "rxjs";

@Component({
  selector: 'app-file-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadListComponent implements OnInit{
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
      this.uploadService.getFiles(6).snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(fileUploads => {
        console.log(fileUploads)
        this.fileUploads = fileUploads;
      });
  }
}
