export class IncomeDebt {
    value: any = '';
    description: string = '';
    category: string = '';
    id: string = '';

    constructor(incomeDebt: any) {
        this.value = incomeDebt.value;
        this.description = incomeDebt.description;
        this.category = incomeDebt.category;
        this.id = incomeDebt.id;
    }
}
