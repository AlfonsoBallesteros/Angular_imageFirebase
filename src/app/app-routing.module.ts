import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadfileComponent } from './uploadfile/uploadfile.component';


const routes: Routes = [
  { path:'', component: UploadfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
