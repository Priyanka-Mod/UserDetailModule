import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import {SearchCountryField,CountryISO,PhoneNumberFormat} from "ngx-intl-tel-input";

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrls: ['./user-detail-form.component.css']
})
export class UserDetailFormComponent implements OnInit {
  userAddress;
  userForm;
  min = new Date('01/01/2000');
  max = new Date();

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  // SearchCountryField = SearchCountryField;
  // CountryISO = CountryISO;
  // preferredCountries: CountryISO[] = [CountryISO.Qatar];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userdata: UserDataService) {
  }
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      
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
      this.userdata.getFormData().subscribe(formData => {

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
        const hobby ={}
        for(let key in formData.hobby){
          if(formData.hobby[key]) {
            hobby[key]=formData.hobby[key]
          }
        }
        updateValue['hobby']=hobby;

        for(let a of formData.address){
          this.address.push(this.createAddress(a))
          this.userForm.patchValue(a)
          // const newAddress = this.formBuilder.group({
          //   addedAddress: a.addedAddress,
          // })
          // updateValue['address'].push(newAddress.value);
          // if(formData.address[a]){
          //  console.log(formData.address[a],'/*/*/*');
          // //  updateValue['address'] = formData.address[a];

          //  const editAddressValue = this.formBuilder.array([])
           
          // //  editAddressValue.push.formData.address[a] as FormArray

          // //  updateValue['address'].push(editAddressValue)
          // this.patchValue(editedAddress)
        }
        

        console.log(updateValue,"v");

        this.userForm.patchValue(updateValue);
      })
    }
  }

  createAddress(a) {
    return this.formBuilder.group({
      addedAddress: a.addedAddress
    });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  get address(): FormArray {
    return this.userForm.controls["address"] as FormArray;
  }

  addAddress() {
    const newAddress = this.formBuilder.group({
      addedAddress: ''
    })
    this.address.push(newAddress);
  }

  onSubmit() {
    this.userdata.setFormData(this.userForm.value);
    this.router.navigate(['/details'])
  }

}
