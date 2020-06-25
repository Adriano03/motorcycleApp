import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MotoProxie } from '../../proxie/moto';
import { MotoProvider } from '../../providers/moto/moto';



@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

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
      this.initialize();

      this.vetorAno = [1988, 1989, 1990 ,1991, 1992, 1993, 1994, 1995, 
        1996, 1997, 1998, 1999, 2000, 2002, 
        2003, 2004, 2005, 2006,2007, 2008,
        2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017, 2018, 2019 
      ];

  }

  initialize(){
     this.form = this.formBuilder.group({
       marca:["",Validators.compose([Validators.maxLength(11),Validators.required])],
       modelo:["",Validators.compose([Validators.maxLength(11),Validators.required])],
       cilindrada:["",Validators.compose([Validators.maxLength(5),Validators.required])],
       potencia:["",Validators.compose([Validators.maxLength(3),Validators.required])],
       preco:["",Validators.compose([Validators.maxLength(8),Validators.required])],
       ano:["",Validators.required]
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
    this.motoProxie.ano =this.form.value["ano"]

    this.motoProvider.salvar(this.motoProxie)

    .then(data=>{
      console.log(data);
      this.alert("Cadastro Efetuado!");
      this.navCtrl.pop();
    })

    .catch(error=>{
      console.log(error);
      this.alert("Erro ao Cadastrar!")
    });

    
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
