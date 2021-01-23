import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ApplicationToAdd } from '../_models/applicationToAdd';
import { ApplicationToReturn } from '../_models/applicationToReturn';
import { Attachment } from '../_models/attachment';
import { Pattern } from '../_models/pattern';
import { UserToRegister } from '../_models/userToRegister';
import { UserToReturn } from '../_models/userToReturn';
import { AccreditationPatternService } from '../_services/accreditation-pattern.service';
import { AlertifyService } from '../_services/alertify.service';
import { ApplicationService } from '../_services/application.service';
import { AttachmentService } from '../_services/attachment.service';

@Component({
  selector: 'app-pattern-preview',
  templateUrl: './pattern-preview.component.html',
  styleUrls: ['./pattern-preview.component.css'],
})
export class PatternPreviewComponent implements OnInit {
  selectedAttachments: Attachment[];
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  pattern: Pattern;
  panelOpenState = false;
  panelOpenStateAdd = false;
  uploader: FileUploader;
  name: string;
  desc: string;
  srcResult: any;
  loggedUser: UserToReturn;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  application = null;

  constructor(
    private route: ActivatedRoute,
    private attachmentService: AttachmentService,
    private patternService: AccreditationPatternService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      debugger;
      this.pattern = data['pattern'];
    });
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.initalizeFormGroup();
    this.initializeUploader();
    this.didApplicate();
  }

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
            this.attachmentService.delete(this.selectedAttachments[i].id);
          } else {
            this.attachmentService
              .delete(this.selectedAttachments[i].id)
              .subscribe((next) => {
                this.patternService.get(this.pattern.id).subscribe(
                  (data) => {
                    this.pattern = data;
                  },
                  (error) => {
                    this.alertify.error(error);
                  }
                );
              });
          }
        }
      }
    );
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: 'http://localhost:5000/api/attachment/',
      authToken: 'Bearer ' + localStorage.getItem('acc_token'),
      additionalParameter: {
        description: this.secondFormGroup.get('secondCtrl').value,
        name: this.firstFormGroup.get('firstCtrl').value,
        patternId: this.pattern.id,
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
        patternId: this.pattern.id,
      };
    };

    this.uploader.onCompleteAll = () => {
      this.alertify.success('Pomyślnie opublikowano 🥳');
      this.patternService.get(this.pattern.id).subscribe(
        (data) => {
          this.pattern = data;
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

  deletePattern() {
    this.alertify.confirm('Czy na pewno chcesz usunąć ten wzór? ', () => {
      this.patternService.delete(this.pattern.id).subscribe(
        (next) => {
          this.alertify.message('Pomyślnie usunięto.');
          this.router.navigateByUrl('/admin');
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    });
  }

  applicate() {
    const app: ApplicationToAdd = {
      patternId: this.pattern.id,
      userId: this.loggedUser.id,
    };

    this.applicationService.add(app).subscribe(
      (next) => {
        this.alertify.success('Dodano!');
        this.didApplicate();
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  didApplicate() {
    this.applicationService.getSingle(this.pattern.id, this.loggedUser.id).subscribe((data) => {
      debugger;
      this.application = data;
    });
  }

  isNull() {
    return this.application === null;
  }
}
