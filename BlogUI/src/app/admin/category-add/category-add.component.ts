import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styles: ['./category-add.component.css']
})

export class CategoryAddComponent implements OnInit {
    constructor(private activeRoute: ActivatedRoute, private categoryService: CategoryService, private toastr: ToastrService) { }

    category = new CategoryModel();
    title: string;
    ngOnInit() {
        const routeParams = this.activeRoute.snapshot.params;
        let id = routeParams['Id'];

        if (id) { // Güncelleme
            this.title = "Kategori Güncelle";
            this.categoryService.GetCategory(id).subscribe(
                (res: any) => {
                    if (res.IsSuccess == true) {
                        console.log(res);
                        this.category = res.Result;
                    }
                }
            );
        }
        else {
            this.title = "Kategori Ekle";
        }
    }

    onSubmit(id: number) {

        if (id) {
            this.categoryService.PutCategory(this.category).subscribe(
                (res: any) => {
                    if (res.IsSuccess == true) {
                        this.toastr.success("Kategori başarıyla güncellendi.", "Başarılı");
                        console.log(res);
                    }
                    else {
                        console.log('Başarısız', JSON.stringify(res));
                    }
                },
                (e) => {
                    console.log("e" + e.message);
                }
            )
        }
        else {
            this.categoryService.PostCategory(this.category.Name).subscribe(
                (res: any) => {
                    if (res.IsSuccess == true) {
                        this.toastr.success("Profil başarıyla düzenlendi.", 'Başarılı');
                        console.log(res)
                    } else {
                        console.log('sucFalse ' + JSON.stringify(res))
                    }
                },
                (e) => {
                    console.log("e " + e.message);
                });
        }
    }


    // onSubmit(){
    //     this.categoryService.PostCategory(this.category).subscribe(
    //         (res :any) => {
    //             if(res.Success == true){
    //                 this.toastr.success("Kayıt başarı ile eklendi");
    //             }
    //         },
    //         (e)=>{
    //             console.log(e);
    //         }
    //     );
    // }    
}
