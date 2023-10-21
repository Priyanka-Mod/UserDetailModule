import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import {SearchCountryField,CountryISO,PhoneNumberFormat} from "ngx-intl-tel-input";
import { User, userDetail } from '../datatype.model';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.css']
})
export class UserDetailFormComponent implements OnInit {
  userForm:FormGroup;
  min = new Date('01/01/2000');
  max = new Date();

  separateDialCode:boolean = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userdata: UserDataService) {
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      
      number: ["", Validators.required],
      education: this.formBuilder.group({
        institute: ['', Validators.required],
        catagory: ['', Validators.required],
        percentage: ['', [Validators.required, Validators.max(100), Validators.min(1)]],
      }),
      hobby: this.formBuilder.group({
        music: [''],
        art: [''],
        dance: [''],
        read: ['']
      }),
      gender: ['', Validators.required],
      address: this.formBuilder.array([]),
      summary: ['']
    });

    if (this.userForm) {
      this.userdata.getUserFormData().subscribe(formData => {

        const updateValue = {
          name: formData.name,
          dob: formData.dob,
          email: formData.email,
          number: formData.number,
          education:{
            institute: formData.education.institute,
            catagory: formData.education.catagory,
            percentage: formData.education.percentage,
          },
          gender: formData.gender,
          summary: formData.summary,
          
        }
        const hobby:object = {}
        for(let key in formData.hobby){
          if(formData.hobby[key]) {
            hobby[key]=formData.hobby[key]
          }
        }
        updateValue['hobby']=hobby;

        for(let a of formData.address){
          this.address.push(this.createAddress(a))
          this.userForm.patchValue(a)
        }
        this.userForm.patchValue(updateValue);
      })
    }
  }

  createAddress(a) : FormGroup {
    return this.formBuilder.group({
      addedAddress: a.addedAddress
    });
  }

  get userFormControl(){
    return this.userForm.controls;
  }

  get address(): FormArray {
    return this.userForm.controls["address"] as FormArray;
  }

  addAddress() : void {
    const newAddress = this.formBuilder.group({
      addedAddress: ''
    })
    this.address.push(newAddress);
  }
  onSubmit() : void {
    this.userdata.setUserFormData(this.userForm.value);
    this.router.navigate(['/details'])
  }
}
