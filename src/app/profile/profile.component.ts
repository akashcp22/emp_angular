import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
formStatus:any=false

profileImage:any="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.1243464686.1711299309&semt=ais_hybrid"
adminProfile:any={
  image:"",email:"",password:""
}

@Output() adminEvent=new EventEmitter()
toggleStatus(){
  this.formStatus=!this.formStatus
}
constructor(private admin:AdminService,private toastr:ToastrService,private router:Router){

}
ngOnInit(): void {
  this.admin.getAdmin().subscribe({
    next:(res:any)=>{
      this.adminProfile=res
      if(res.image){
        this.adminProfile.image=res.image
        this.profileImage=res.image
      }
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
getFile(e:any){
  const file=e.target.files[0]
  const fr=new FileReader()
  fr.readAsDataURL(file)
  fr.onload=(event:any)=>{
console.log(event)
this.profileImage=event.target.result
this.adminProfile.image=event.target.result


  }
}

handleSubmit(){
console.log(this.adminProfile);
const headerObj=new HttpHeaders()
headerObj.set('content-type','multipart/form-data')
this.admin.updateAdmin(this.adminProfile,headerObj).subscribe({
  next:(res:any)=>{
console.log(res);
this.toastr.success("profile updated")
this.toggleStatus()
sessionStorage.setItem('admin',JSON.stringify(res))
this.adminEvent.emit(res.email)
// this.router.navigateByUrl('/')



  },
  error:(err:any)=>{
    console.log(err);
    this.toastr.error(err)
    
  }
})

}

}
