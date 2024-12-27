import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = '';
  pass = '';
  loginMessage = '';

  constructor() { }

  login() {
    // Logging in to the backend API
    const loginData = {
      name: this.name,
      pass: this.pass
    };
    axios.post('http://localhost:4000/api/v1/user/login', loginData)
      .then((response) => {
        this.loginMessage = 'Login Successful!';
        console.log('Login successful', response.data);
      })
      .catch((error) => {
        this.loginMessage = 'Login Failed!';
        console.error('Login failed', error);
      });

  }
}