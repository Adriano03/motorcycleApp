import { Injectable } from '@angular/core';
import { MotoProxie } from '../../proxie/moto';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from "firebase";



@Injectable()
export class MotoProvider {
  private PATH = "moto/";
  private user: string;
  constructor(private db: AngularFireDatabase) {
     this.user = firebase.auth().currentUser.uid;
     console.log(this.user);
  }

  salvar(moto: MotoProxie){
    return new Promise((resolve,reject)=>{

      if(moto.key){
       //Editar Contado
       this.db.list(this.PATH).update(
         moto.key,{
           marca: moto.marca,
           modelo: moto.modelo,
           cilindrada: moto.cilindrada,
           potencia: moto.potencia,
           preco: moto.preco,
           ano: moto.ano
         })
         .then(()=>resolve())
         .catch((e)=> reject(e))

      }else{
       //CRiar moto
       this.db.list(this.PATH).push({
        
          marca: moto.marca,
          modelo: moto.modelo,
          cilindrada: moto.cilindrada,
          potencia: moto.potencia,
          preco: moto.preco,
          ano: moto.ano,
          responsavel: this.user
       })
        .then(()=>resolve())
        //.catch((e)=> reject(e))
      }

    });
  }

  buscarTodos(){

    return this.db.list(this.PATH, ref => ref.orderByChild("responsavel")
    .equalTo(this.user)
    )
    .snapshotChanges()
    .map(changes=>{
      return changes.map(c=>({
        key:c.payload.key, ...c.payload.val()
      }));
    });

  }

  buscar(key: string){
    return this.db.object(this.PATH+key).snapshotChanges().map(c=>({
        key: c.payload.key, ...c.payload.val()
      }));
  };

  excluir(key:string){
    return this.db.list(this.PATH).remove(key);
  }


  buscarPorNome(marca: string){

    return this.db
    .list(this.PATH, ref => 
      ref.orderByChild("marca")
    .equalTo(marca)
    )
    .snapshotChanges()
    .map(changes=>{
      return changes.map(c=>({
        key:c.payload.key, ...c.payload.val()
      }));
    });

  }

}
