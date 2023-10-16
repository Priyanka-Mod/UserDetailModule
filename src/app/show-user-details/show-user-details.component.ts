import { Component ,OnDestroy,OnInit} from '@angular/core';
import { UserDataService } from '../user-data.service';
import { User } from '../user-detail.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent implements OnInit{
  formData;
  str:string='';
  userAddress='';
  userDetail;

  userArray = [];
  displayColumn =['name','email','dob','number','institute','catagory','percentage','gender']; 

  constructor(private userData:UserDataService,
              private router:Router){}
  ngOnInit(): void {

    this.userData.getFormData().subscribe(formData => {
      this.formData = formData;
      for(let key in  this.formData.hobby ){
        if(this.formData.hobby[key]) {
          this.str = this.str + ' , ' + key;
        }
      }

      for(let a in this.formData.address){
        if(this.formData.address[a]){
          this.userAddress = this.userAddress + " " + this.formData.address[a].addedAddress
        }
      }
      
      const userDetail = {
        name: this.formData.name,
        email:this.formData.email,
        dob:this.formData.dob,
        number:this.formData.number,
        institute:this.formData.education.institute,
        catagory:this.formData.education.catagory,
        percentage:this.formData.education.percentage,
        // hobby: this.str,
        gender:this.formData.gender,
        // address:{addedAddress:this.formData.addedAddress},
        // summary:this.formData.summary
      }
      if(this.formData.summary){
        this.displayColumn.push('summary')
        userDetail['summary']=this.formData.summary
      }

      if(this.str){
        this.displayColumn.push('hobby')
        userDetail['hobby']=this.str
      }

    
      if(this.userAddress){
        this.displayColumn.push('address')
        userDetail['address'] = this.userAddress;
      }

      this.userArray.push(userDetail)
      console.log(this.userArray)
      console.log(this.displayColumn)
      this.userDetail=this.userArray
    });
  }
  
  onEdit(){
    this.router.navigate(['/form'])
  }
  
} 
