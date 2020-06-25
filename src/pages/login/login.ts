import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formLogin: FormGroup;
  email:AbstractControl;
  senha:AbstractControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController) {

      this.inicializar();
  }

  inicializar(){
    this.formLogin = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      senha:["",Validators.required]
    });
    this.email =this.formLogin.controls["email"];
    this.senha = this.formLogin.controls["senha"];
  }

  alert(mensagem: string){
    this.alertCtrl.create({
      title:'Aviso',
      subTitle: mensagem,
      buttons:['OK']
    })
    .present();
  }
  
  submitFormLogin(){
   if(!this.formLogin.valid){
    this.alert("Campos em Branco!");
}else{
  this.logar();
}
}


registrarUsuario(){
  this.navCtrl.push("RegistroPage");
}

logar(){
  this.fire.auth.signInWithEmailAndPassword(
    this.formLogin.value.email,
    this.formLogin.value.senha
  )
    .then(data =>{
      console.log(data);
      this.alert("Seja Bem Vindo!");
      this.navCtrl.setRoot(HomePage);
    })
    .catch(error =>{
      console.log(error);
      this.alert(error);
    });
  
}


logarComGoogle(){
  this.fire.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)

  .then(data =>{
    console.log(data);
    this.alert("Seja Bem Vindo!");
    this.navCtrl.setRoot(HomePage);
  })
  .catch(error =>{
    console.log(error);
    this.alert(error);
  });

}

 

}
