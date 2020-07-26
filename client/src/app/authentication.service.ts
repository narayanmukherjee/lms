import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'


export interface UserDetails {
    _id : String
    name : String
    email : String
    password : String
    username : String
    usertype : String
    contactno : String
    exp : number
    iat:  number
}

interface TokenResponse{
    token : String
}

export interface TokenPayload{
  _id : String
  name : String
  email : String
  password : String
  username : String
  usertype : String
  contactno : String
}

@Injectable()
export class AuthenticationService {
    private token: string

    constructor(private http: HttpClient, private router : Router){}

    private saveToken(token: string): void {
      localStorage.setItem('usertoken', token)
      this.token = token
    }

    private getToken() {
        if(!this.token){
          this.token = localStorage.getItem('usertoken')
        }
        return this.token
    }


}
