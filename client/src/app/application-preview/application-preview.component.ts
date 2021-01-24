import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'console';
import { FileUploader } from 'ng2-file-upload';
import { ApplicationToReturn } from '../_models/applicationToReturn';
import { Attachment } from '../_models/attachment';
import { AlertifyService } from '../_services/alertify.service';
import { ApplicationService } from '../_services/application.service';
import { UserattachmentService } from '../_services/userattachment.service';

@Component({
  selector: 'app-application-preview',
  templateUrl: './application-preview.component.html',
  styleUrls: ['./application-preview.component.css'],
})
export class ApplicationPreviewComponent implements OnInit {
  commentFormControl = new FormControl('');
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  srcResult: any;
  uploader: FileUploader;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  application: ApplicationToReturn;
  panelOpenState = false;
  panelOpenStateAdd = false;
  selectedAttachments: Attachment[];
  comment: string;
  loggedUser = JSON.parse(localStorage.getItem('user'));

  

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder,
    private userAttachmentService: UserattachmentService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.application = data['application'];
    });
    this.initalizeFormGroup();
    this.initializeUploader();
  }

  //Dodawanie załącznika

  initalizeFormGroup() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  download() {
    for (let i = 0; i < this.selectedAttachments.length; i++) {
      window.open(this.selectedAttachments[i].url);
    }
  }

  delete() {
    this.alertify.confirm(
      'Czy na pewno chcesz usunąć następujące załączniki? ',
      () => {
        for (let i = 0; i < this.selectedAttachments.length; i++) {
          if (i !== this.selectedAttachments.length - 1) {
            this.userAttachmentService.delete(this.selectedAttachments[i].id);
          } else {
            this.userAttachmentService
              .delete(this.selectedAttachments[i].id)
              .subscribe((next) => {
                this.get();
              });
          }
        }
      }
    );
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'http://localhost:5000/api/userAttachment/',
      authToken: 'Bearer ' + localStorage.getItem('acc_token'),
      additionalParameter: {
        description: this.secondFormGroup.get('secondCtrl').value,
        name: this.firstFormGroup.get('firstCtrl').value,
        applicationId: this.application.id,
      },
      isHTML5: true,
      allowedFileType: ['pdf', 'doc', 'compress', 'image', 'xls', 'ppt'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onBeforeUploadItem = (file) => {
      this.uploader.options.additionalParameter = {
        description: this.secondFormGroup.get('secondCtrl').value,
        name: this.firstFormGroup.get('firstCtrl').value,
        applicationId: this.application.id,
      };
    };

    this.uploader.onCompleteAll = () => {
      this.alertify.success('Pomyślnie opublikowano 🥳');
      this.applicationService.get(this.application.id).subscribe(
        (data) => {
          this.application = data;
          this.stepper.reset();
          this.uploader.clearQueue();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    };

    this.uploader.onErrorItem = () => {
      this.alertify.error('Wystąpił błąd.');
    };
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }






  addComment() {
    this.applicationService
      .comment(this.application.id, { comment: this.commentFormControl.value })
      .subscribe(
        (data) => {
          this.alertify.message('Dodano komentarz.');
          this.commentFormControl.reset();
          this.get();
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  approve() {
    this.alertify.confirm(
      'Czy na pewno chcesz zatwierdzić ten wniosek? ',
      () => {
        this.applicationService.approve(this.application.id).subscribe(
          (data) => {
            this.alertify.message('Zatwierdzono.');
            this.router.navigateByUrl('/admin');
          },
          (error) => {
            this.alertify.error(error);
          }
        );
      }
    );
  }

  decline() {
    this.alertify.confirm('Czy na pewno chcesz odrzucić ten wniosek? ', () => {
      this.applicationService.delete(this.application.id).subscribe(
        (data) => {
          this.alertify.message('Odrzucono pomyślnie.');
          this.router.navigateByUrl('/admin');
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    });
  }

  get() {
    this.applicationService.get(this.application.id).subscribe((data) => {
      this.application = data;
    });
  }
}
