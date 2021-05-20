import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSave, FileStoreService } from './fileStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pocfile';
  file = '';
  closeResult = '';
  src:any = '';
  vi ="https://docs.google.com/gview?url=%URL%&embedded=true";

  constructor(private fileService: FileStoreService, private modalService: NgbModal){}

  saveFile(event:any){
    let file = event.target.files[0];
    this.fileService.save({name: 'dass', file: file})
    .then(i => console.log(i));
  }

  open(content: any) {
    this.modalService.open(content);
    this.fileService.getFile(5)
    .then(f =>{
     this.transform(f?.file).then(x => this.src = x)

    } );
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
