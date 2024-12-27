import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <nav class="navbar">
            <button routerLink="/login" class="nav-button">Login</button>
            <button routerLink="/register" class="nav-button">Register</button>
        </nav>
    `,
    imports: [RouterLink],
    styleUrls: ['./header.component.css']  // Link to the CSS file
})
export class Header { }
