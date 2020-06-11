import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
//import {storage} from 'firebase'
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.sass']
})
export class UploadfileComponent implements OnInit {

  constructor(private storage: AngularFireStorage) { }

  urlImage: Observable<String>;
  show_photo: boolean = false;
  new_image: string = "https://firebasestorage.googleapis.com/v0/b/tcusco-77d95.appspot.com/o/img_perfil%2Fusers1.jpg?alt=media&token=c8ba3ce6-601f-4c12-8cab-ebd9ce1fbd15";
  porcentaje = 0;
  ngOnInit() {
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0]; 
    const size = (e.target.files[0].size)/ 1024;
    const tipe = e.target.files[0].type;
    const base64 = btoa(file);
    console.log(base64, tipe, Date.now())
    //const image = `data:image/jpeg;base64,${file}`;
   
    const filepath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filepath);
    const metadata = {
      contentType: tipe,
      size: size,
      md5Hash: base64,
      name: `${Date.now()}profile_${id}${base64}`
    }
    const task = this.storage.upload(filepath, file, metadata);
    task.snapshotChanges().pipe( finalize(()=> this.urlImage = ref.getDownloadURL())).subscribe();
    this.show_photo = true;
    task.percentageChanges().subscribe((porc)=>{
      this.porcentaje = Math.round(porc);
      if (this.porcentaje == 100) {
        ref.getDownloadURL().subscribe((url)=>{
          this.new_image = url;
          console.log(this.new_image);
        });
      }
    })
    console.log(metadata);
    //Mostrar
    
     /*
    console.log("imprime", e);
    ref.putString(image, 'data_url').then( (result) => {
      ref.getDownloadURL().then( url =>{ 
        this.new_image = url
        console.log(url)
      }).catch( e => {
        console.log('error', e)
      })
      
    }).catch(e => {
      console.log('error', e)
    })
    */
  }

  addPhotoprofile(){

  }

}
