export class formulas {

    constructor(){

    }
    calcularIMC(peso: number, talla: number){
        let respuesta = (peso/(talla*talla))*10000;
        return respuesta;
    }
    clasificacionImc(imc: number){
       if(imc < 18.5){
           return "Peso inferior al normal";
       }if(imc > 18.5 && imc < 24.9){
           return "Normal"
       }if(imc > 25 && imc < 29.9){
           return "Peso superior al normal";
       }if(imc > 30){
           return "Obesidad";
       }
    }
}