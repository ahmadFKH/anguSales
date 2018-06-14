export default class Comment {
    private comment_id: number;
    private date: Date;
    private text: string;
    constructor(text: string, date: Date) {
        this.text = text;
        this.date = date;
    }
}