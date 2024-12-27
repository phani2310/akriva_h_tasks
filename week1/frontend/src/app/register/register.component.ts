import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'app-register',

  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  pass = '';
  registerMessage: string = '';
  register() {
    console.log('Register:', { name: this.name, pass: this.pass });
    const registerData = {
      name: this.name,
      pass: this.pass

    };


    axios.post('http://localhost:4000/api/v1/user/register', registerData)
      .then((response) => {
        this.registerMessage = 'Registration Successful!';
        console.log('Registration successful', response.data);
      })
      .catch((error) => {
        this.registerMessage = 'Registration Failed!';
        console.error('Registration failed', error);
      });
  }
}