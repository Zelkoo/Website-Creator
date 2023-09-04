import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {FileUpload} from "../file-upload/file-upload";
import {FileUploadService} from "../file-upload/file-upload.service";

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  public upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
}
