import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';
import { ProfileService } from '../profile/profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private profileService: ProfileService) { }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
    });
    this.getProfileDetails();
  }

  getProfileDetails() {
    let userId = localStorage.getItem('currentUser');
    this.profileService.getProfileDetails(userId)
    .pipe(first())
    .subscribe(
        data => {
            //this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            //this.loading = false;
        });
  }

}
