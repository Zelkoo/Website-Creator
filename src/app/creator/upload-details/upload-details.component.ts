import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {FileUpload} from "../file-upload/file-upload";
import {FileUploadService} from "../file-upload/file-upload.service";

@Component({
  selector: 'app-file-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadDetailsComponent implements OnInit{
  @Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  public ngOnInit(): void {
  }

  public deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }
}
