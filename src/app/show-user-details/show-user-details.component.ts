import { Component ,OnInit} from '@angular/core';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';
import {User} from '../datatype.model';
import { userDetail } from '../datatype.model';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})

export class ShowUserDetailsComponent implements OnInit{
  formUserData:User;
  hobby:string='';
  userAddress:string='';
  userDetailValues:userDetail[];
  userDetailArray:userDetail[] = [];
  displayColumn =['name','email','dob','number','institute','catagory','percentage','gender']; 

  constructor(private userData:UserDataService,
              private router:Router){}
  ngOnInit(): void {

    this.userData.getUserFormData().subscribe(formData => {
      this.formUserData = formData;
      for(let key in  this.formUserData.hobby ){
        if(this.formUserData.hobby[key]) {
          this.hobby = this.hobby + '  ' + key; + '<br/>'
        }
      }

      for(let a in this.formUserData.address){
        if(this.formUserData.address[a]){
          this.userAddress += `  ${this.formUserData.address[a].addedAddress}\n`;
        }
      }
      
      const userDetail:userDetail= {
        name: this.formUserData.name,
        email:this.formUserData.email,
        dob:this.formUserData.dob,
        number:this.formUserData.number,
        institute:this.formUserData.education.institute,
        catagory:this.formUserData.education.catagory,
        percentage:this.formUserData.education.percentage,
        gender:this.formUserData.gender,
      }
      if(this.formUserData.summary){
        this.displayColumn.push('summary')
        userDetail['summary']=this.formUserData.summary
      }

      if(this.hobby){
        this.displayColumn.push('hobby')
        userDetail['hobby']=this.hobby
      }

    
      if(this.userAddress){
        this.displayColumn.push('address')
        userDetail['address'] = this.userAddress;
      }

      this.displayColumn.push('edit');
      this.userDetailArray.push(userDetail)
      this.userDetailValues=this.userDetailArray
    });
  }
  
  onEditUser():void{
    this.router.navigate(['/form'])
  }
  
} 
