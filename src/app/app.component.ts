import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSave, FileStoreService } from './fileStore.service';
import { IMAGEVIEWER_CONFIG, ImageViewerConfig } from '@hallysonh/ngx-imageviewer';


const MY_IMAGEVIEWER_CONFIG: ImageViewerConfig = {
  width: 800, // component default width
  height: 600, // component default height
  bgStyle: '#ECEFF1', // component background style
  scaleStep: 0.1, // zoom scale step (using the zoom in/out buttons)
  rotateStepper: false, // touch rotate should rotate only 90 to 90 degrees
  loadingMessage: 'Loading...',
  buttonStyle: {
    iconFontFamily: 'Material Icons', // font used to render the button icons
    alpha: 0.5, // buttons' transparence value
    hoverAlpha: 0.7, // buttons' transparence value when mouse is over
    bgStyle: '#000000', //  buttons' background style
    iconStyle: '#ffffff', // buttons' icon colors
    borderStyle: '#000000', // buttons' border style
    borderWidth: 0, // buttons' border width (0 == disabled)
  },
  tooltips: {
    enabled: true, // enable or disable tooltips for buttons
    bgStyle: '#000000', // tooltip background style
    bgAlpha: 0.5, // tooltip background transparence
    textStyle: '#ffffff', // tooltip's text style
    textAlpha: 0.9, // tooltip's text transparence
    padding: 15, // tooltip padding
    radius: 20, // tooltip border radius
  },
  zoomOutButton: {
    // zoomOut button config
    icon: 'zoom_out', // icon text
    tooltip: 'Zoom out', // button tooltip
    sortId: 0, // number used to determine the order of the buttons
    show: true, // used to show/hide the button
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: IMAGEVIEWER_CONFIG,
      useValue: MY_IMAGEVIEWER_CONFIG
    }
  ]
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'pocfile';
  file:any;
  closeResult = '';
  src:any = '';
  vi ="https://docs.google.com/gview?url=%URL%&embedded=true";
  files: (FileSave | undefined)[] = [];
  fileType ='';

  constructor(private fileService: FileStoreService, private modalService: NgbModal){}
  ngOnDestroy(): void {
    this.fileService.deleteAll();
  }
  ngOnInit(): void {
    this.getAllFiles();
  }

  saveFile(event:any){
    let file = event.target.files[0];
    console.log(file);
    this.fileService.save({name: file.name, file: file, type: file.type})
    .then(i => console.log(i));
  }

  getAllFiles(){
    this.fileService.getFiles()
      .then(f => this.files = f);
  }

  delete(){
    this.fileService.deleteAll()
    .then(s => console.log(s))
  }

  open(content: any, file?: FileSave) {
    let type: string[] = [];
    type = file?.name.split('.');
    this.fileType = type[1];
    switch (this.fileType) {
      case 'jpeg':
        this.transform(file.file).then(r =>{
          this.file = r
          console.log(r)
        } );
        break;

      case 'pdf':
        this.transform(file.file).then(r =>{
          this.file = r
          console.log(r)
        } );
        break;

      case 'xlsx':
        this.file = file.file;
        break;

      case 'docx':
        this.file = file.file;
        break;
    }
    console.log(type[1]);
    this.modalService.open(content, {size:'xl' });
  }



  private transform(file: any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  downloadFile(){
    let url = window.URL.createObjectURL(this.file);
    window.open(url);
  }
}
