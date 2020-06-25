import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MotoProxie } from '../../proxie/moto';
import { MotoProvider } from '../../providers/moto/moto';

/**
 * Generated class for the EditarMotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-moto',
  templateUrl: 'editar-moto.html',
})
export class EditarMotoPage {

  form: FormGroup;
  marca:AbstractControl;
  modelo:AbstractControl;
  cilindrada:AbstractControl;
  potencia:AbstractControl;
  preco:AbstractControl;
  ano:AbstractControl;
  motoProxie: MotoProxie;
  vetorAno: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl:ToastController, 
    public formBuilder: FormBuilder, 
    public motoProvider: MotoProvider,
    private alertCtrl: AlertController) {

      this.motoProxie = new MotoProxie();

      this.vetorAno = [1992, 1993, 1994, 1995, 
        1996, 1997, 1998, 1999, 2000, 2002, 
        2003, 2004, 2005, 2006,2007, 2008,
        2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017, 2018, 2019 
      ];
      
      this.motoProxie = this.navParams.get("moto");
      this.initialize();

  }

  initialize(){

    this.form = this.formBuilder.group({
      marca:[this.motoProxie.marca,Validators.required],
      modelo:[this.motoProxie.modelo,Validators.required],
      cilindrada:[this.motoProxie.cilindrada,Validators.required],
      potencia:[this.motoProxie.potencia,Validators.required],
      preco:[this.motoProxie.preco,Validators.required],
      ano:[this.motoProxie.ano,Validators.required]

    });
    this.marca = this.form.controls["marca"];
    this.modelo = this.form.controls["modelo"];
    this.cilindrada = this.form.controls["cilindrada"];
    this.potencia = this.form.controls["potencia"];
    this.preco = this.form.controls["preco"];
    this.ano = this.form.controls["ano"];
 }

 submitForm(){
  if(!this.form.valid){
     let toast = this.toastCtrl.create({
          message: "Campos em Branco!",
          duration: 3000,
          position: "top"
     });
     toast.present();
  }else{
    this.cadastrar();
  }
}

cadastrar(){
  this.motoProxie.marca = this.form.value["marca"];
  this.motoProxie.modelo = this.form.value["modelo"];
  this.motoProxie.cilindrada = this.form.value["cilindrada"];
  this.motoProxie.potencia = this.form.value["potencia"];
  this.motoProxie.preco = this.form.value["preco"];
  this.motoProxie.ano = this.form.value["ano"];

  this.motoProvider.salvar(this.motoProxie)

  .then(data=>{
    console.log(data);
    this.alert("Alteração Efetuada!");
    this.navCtrl.pop();
  })

  .catch(error=>{
    console.log(error);
    this.alert("Erro ao efetuar Alteração!")
  });




}

cancelar(){
  this.navCtrl.pop();
}

alert(mensagem: string){
  this.alertCtrl.create({
    title:'Aviso',
    subTitle: mensagem,
    buttons:['OK']
  })
  .present();
}




}


