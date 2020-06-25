import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { MotoProvider } from '../../providers/moto/moto';
import { MotoProxie } from '../../proxie/moto';
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  moto: Observable<any>;
  usuario: any;
  motoProxie: MotoProxie;

  constructor(public navCtrl: NavController,
    public motoProvider: MotoProvider,
    public alertCtrl: AlertController) {

      this.usuario = firebase.auth().currentUser;
      this.moto = new Observable<any>();
      this.moto = this.motoProvider.buscarTodos();

  }
  irParaCadastro(){
    this.navCtrl.push("CadastroPage");
  }

  editarMoto(moto:any){
    this.navCtrl.push("EditarMotoPage",{moto: moto})
  }

  confirmarExcluir(key: string){
    this.alertCtrl
    .create({
      title:"Excluir",
      subTitle:"Deseja realmente excluir",

      buttons:[
        {
          text:"Sim",
          handler:()=>{
            this.excluirMoto(key);
          }
        },
        {
          text:"Não"
        }
      ]
    })
    .present();
  }

  excluirMoto(key: string){
    console.log(key);
    this.motoProvider.excluir(key)
    .then(()=>{this.alert("Moto Excluida!")})

    .catch(()=>{this.alert("Erro ao Excluir!")});
   
}

alert(mensagem: string){
  this.alertCtrl.create({
    title:'Aviso',
    subTitle: mensagem,
    buttons:['OK']
  })
  .present();
}

mensagem(){
  this.alertCtrl.create({
    title:'Motos',
    subTitle: "Marca",
    buttons:['OK']
  })
  .present();
  }
  

}



