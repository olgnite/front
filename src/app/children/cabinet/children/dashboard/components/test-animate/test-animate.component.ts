import { Component } from "@angular/core";
import { fadeIn, fadeOut } from "./animations";

@Component({
    templateUrl: './test-animate.component.html',
    animations: [fadeIn, fadeOut]
})
export class TestAnimateComponent {

    public isShow: boolean = false;

    toggle(): void {
        this.isShow = !this.isShow;
    }
}