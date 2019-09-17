import { TagModel } from './TagModel';
export class ArticleModel {
    Id: number;
    CategoryId: number;
    CategoryName: string;
    CategoryLinkName: string;
    Title: string;
    Body: string;
    Introduction: string;
    TagIds: number[];
    Tags: TagModel;
    Img: string;
    Type: number;
    CreatedDate: Date;
    NextId: number;
    NextTitle: string;
    PreviousId: number;
    PreviousTitle: string;
}