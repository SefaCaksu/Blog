export class ArticleParamsModel {
    Id : number;
    CategoryId: number;
    Title: string;
    Body: string;
    Introduction: string;
    TagIds: number[];
    Img: File;
}