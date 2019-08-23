export class ArticleModel {
    Id : number;
    CategoryId: number;
    CategoryName: string;
    Title: string;
    Body: string;
    Introduction: string;
    TagIds: number[];
    Img: string;
    Type: number;
    CreatedDate: Date;
}