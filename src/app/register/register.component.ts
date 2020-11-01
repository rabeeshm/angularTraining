import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from './register.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get f() { return this.form.controls; }
  onSubmit() {
    this.alertService.clear();
    // this.alertService.error("welcome");
    if (this.form.valid && this.form.controls['username'].value) {
      this.registerService.register(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', { keepAfterRouteChange: true });
            this.router.navigate(['../login'], { relativeTo: this.route });
          },
          error => {
            // this.alertService.error(error);
            // this.loading = false;
          });
    }

  }
}
