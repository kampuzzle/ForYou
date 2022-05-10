export class IncomeDebt {
    value: any = '';
    description: string = '';
    category: string = '';
    date: string = '';

    constructor(incomeDebt: any) {
        this.value = incomeDebt.value;
        this.description = incomeDebt.description;
        this.category = incomeDebt.category;
        this.date = incomeDebt.date;
    }
}