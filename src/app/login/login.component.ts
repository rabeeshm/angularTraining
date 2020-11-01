import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import { AlertService } from '../shared/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginResponse } from './auth.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
     private loginService: LoginService,
    private alertService: AlertService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  onSubmit() {
    if (this.form.valid && this.form.controls['username'].value) {
      this.loginService.login(this.form.value)
            .pipe(first())
            .subscribe(
              (loginResponse: LoginResponse) => {
                   if (loginResponse && loginResponse.status) {
                   this.router.navigate(['../dashboard'], { relativeTo: this.route });
                   } else {
                    this.alertService.error(loginResponse.message);
                   }
                },
                error => {
                    this.alertService.error(error);
                });
    }
  }

}
