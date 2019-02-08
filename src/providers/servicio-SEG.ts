import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Utils
import * as uuidv1 from 'uuid/v1';


/*
 Generated class for the ServicioMadProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ServicioSEGProvider {

  constructor(public http: HttpClient) { }

  //url = 'http://localhost:8080/MonsterFitnessSEGv1.1/webresources/rutina/'
  // tslint:disable-next-line:max-line-length
  //JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJNaU1vdmlzdGFyX1dlYlZpZXdzIiwiaWF0IjoxNTI3MDA1NDA2LCJleHAiOjE1MjcwMDkwMDYsImFyZ3MiOnsiZG9jdW1lbnRvSWQiOiI5OTgwMDc3NzMiLCJjbGF2ZSI6ImFudGVuYTEwIn19.JDDCNI2GXYfCa9Usbt8j3K4nY6riNGP7kfMi3S74uPI';
  

  uuid = uuidv1();

  getDataSEG_HttpClient(argumentos, uri) {
    console.log(this.uuid);
    const httpOptions = {
      headers: new HttpHeaders({
        'Unique-Identifier': this.uuid,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    //this.JSON = { args: JWT };
    //return this.http.post(uri, JSON.stringify(this.JSON), httpOptions);
    return this.http.post(uri, JSON.stringify(argumentos), httpOptions);

  }

}
/**
 * Created by GvN on 18/7/2018.
 */
