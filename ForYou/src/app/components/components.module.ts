import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NewComponent } from "./new/new.component";
import { CurrencyMaskModule } from "ng2-currency-mask"; 
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        NewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CurrencyMaskModule,
        HttpClientModule
    ],
    exports: [
        NewComponent
    ]
})

export class ComponentsModule {

}