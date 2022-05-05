import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";

@NgModule({
    declarations: [
        NewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        NewComponent
    ]
})

export class ComponentsModule { }