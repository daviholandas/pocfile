import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSave, FileStoreService } from './fileStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pocfile';
  file:any;
  closeResult = '';
  src:any = '';
  vi ="https://docs.google.com/gview?url=%URL%&embedded=true";
  files: (FileSave | undefined)[] = [];

  constructor(private fileService: FileStoreService, private modalService: NgbModal){}
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
    switch (type[1]) {
      case 'png':
        this.transform(file.file).then(r => this.file = r);
        break;

      case 'pdf':
        this.transform(file.file).then(r => this.file = r);

        break;
    }
    console.log(type[1]);
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private transform(file: any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
