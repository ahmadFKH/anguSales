export default class Customer {
    private firstName: string;
    private lastName: string;
    private email: string;
    private phone: number;
    private company_name: string;

    constructor(FirstName: string, LastName: string, Email: string, Phone: number, company_name: string) {
        this.firstName = FirstName;
        this.lastName = LastName;
        this.email = Email;
        this.phone = Phone;
        this.company_name = company_name;
    }
}