import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  LoadingController,
  ToastController,
  AlertController,
} from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
    });
  }

  async register() {
    let loading = await this.loadingCtrl.create({
      message: "Loading ...",
    });
    await loading.present();
    this.auth.signUp(this.registerForm.value).then(
      async (res) => {
        loading.dismiss();
        let toast = await this.toastCtrl.create({
          message: "Sucessfully created new account",
          duration: 3000,
        });
        toast.present();
        this.router.navigateByUrl("/login");
      },
      async (err) => {
        loading.dismiss();
        let toast = await this.alertCtrl.create({
          header: "Error",
          message: err.message,
          buttons: ["OK"],
        });
        toast.present();
        this.router.navigateByUrl("/login");
      }
    );
  }
}
