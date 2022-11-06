import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
const httpOptions1 = {
  headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    userid: ['', Validators.required],
    password: ['', [Validators.required]]
  })
  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    var logo = document.querySelector('svg path');
    // for (let i = 0; i < logo.length; i++){
    //   console.log(`logo ${i} is ${logo[i]}`)
    // }
  }
  login(el: NgForm) {
    console.log(el);
    this.auth.login(el).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/post']);

      }
    })
  }

  getPDF(filename :string) {
    this.http.get('http://localhost:3003/Practice/PDF/' + filename, { responseType: 'blob' }).subscribe((data: any) => {
      console.log(data);
      // saveAs(data,'O.pdf');
      var file = new Blob([data], { type: 'application/pdf'});
      console.log(file);
      var fileURL = URL.createObjectURL(file);
      console.log(fileURL);
      window.open(fileURL);
      
    })
  }
}
