import { Textos } from "../config/Textos";

export class alertas {
    constructor(){

    }

    /**
     * Metodo para presentar un dialogo
     * @param alertCtrl AlertController
     * @param mensaje Mensaje a presentar
     * @param botones Botones del dialogo
     */
    public static presentarDialogoGenerico(alertCtrl: any, mensaje: string, botones: (string) []) {

        // Muestro alerta indicando que no se obtuvo la posicion del usuario
        let alert = alertCtrl.create({
            title: Textos.TEXTO_TITULO_PRINCIPAL,
            message: mensaje,
            buttons: botones
        });
        alert.present();
    }
}
