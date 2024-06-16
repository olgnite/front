import { Component } from "@angular/core";
import { fadeInOut } from "./animations";

@Component({
    templateUrl: './test-animate.component.html',
    animations: [fadeInOut]
})
export class TestAnimateComponent {

    public isShow: boolean = false;

    toggle(): void {
        this.isShow = !this.isShow;
    }
}