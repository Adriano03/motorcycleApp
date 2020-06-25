import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Validators, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  formRegistro: FormGroup;
  email:AbstractControl;
  senha:AbstractControl;
  confSenha: AbstractControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private fire: AngularFireAuth,
    private alertCtrl: AlertController) {
      this.inicializar();
  }

  inicializar(){
    this.formRegistro = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      senha:["",Validators.required],
      confSenha:["",Validators.required]
    });
    this.email =this.formRegistro.controls["email"];
    this.senha = this.formRegistro.controls["senha"];
    this.confSenha = this.formRegistro.controls["confSenha"];
  }

  alert(mensagem: string){
    this.alertCtrl.create({
      title:'Aviso',
      subTitle: mensagem,
      buttons:['OK']
    })
    .present();
  }

  submitFormRegistro(){
    if(!this.formRegistro.valid){
     this.alert("Campos em Branco");
 }else if(this.formRegistro.value.senha != this.formRegistro.value.confSenha){
     this.alert("Senhas não Conferem");
 }
 else{
  this.regitrar();
 }

 }

 regitrar(){
    this.fire.auth.createUserWithEmailAndPassword(
      this.formRegistro.value.email,
      this.formRegistro.value.senha
    )
    .then(data =>{
      console.log(data);
      this.alert("Usuário Cadastrado com Sucesso!");
    this.navCtrl.setRoot(LoginPage);
    })
    .catch(error=>{
      console.log(error);
    });
 }
  

}
