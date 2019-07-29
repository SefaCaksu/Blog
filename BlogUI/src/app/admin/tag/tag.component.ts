import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { TagModel } from 'src/app/models/TagModel';
import { ToastrService } from 'ngx-toastr';
import { TagFilterModel } from 'src/app/models/TagFilterModel';
declare var $: any;

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {

  constructor(private tagService: TagService, private toastr: ToastrService) { }

  tags: TagModel[];
  tag = new TagModel();
  filter = new TagFilterModel();
  submitButton: string;
  deleteId: number;

  ngOnInit() {
      this.submitButton = "Tag Ekle";
      this.filter.filterStatus = 1
      this.List("", true);
  }

  onFilter() {
    if (this.filter != null && this.filter != undefined) {
      if (this.filter.filterName == "undefined" || this.filter.filterName == undefined) {
        this.filter.filterName = "";
      }

      this.List(this.filter.filterName, this.filter.filterStatus == 1);
    }
  }

  onSubmit() {
    if (this.tag.Id > 0) {
      this.tagService.PutTag(this.tag).subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.toastr.success("Tag başarıyla düzenlendi.", 'Başarılı');
            this.List("", this.filter.filterStatus == 1);
          } else {

          }
        },
        (e) => {
          var er = e.error.Error;
          if (er.ValidationErrors != null) {
            er.ValidationErrors.forEach(function (value) {
              this.toastr.error(value.Field, value.Message);
            });
          }
          this.toastr.error(er.Message, er.Details);
        });
    } else {
      this.tagService.PostTag(this.tag.Name).subscribe(
        (res: any) => {
          if (res.IsSuccess == true) {
            this.toastr.success("Tag başarıyla eklendi.", 'Başarılı');

            this.List("", this.filter.filterStatus == 1);
          } else {

          }
        },
        (e) => {
          var er = e.error.Error;
          if (er.ValidationErrors != null) {
            er.ValidationErrors.forEach(function (value) {
              this.toastr.error(value.Field, value.Message);
            });
          }
          this.toastr.error(er.Message, er.Details);
        });
    }
  }

  onEdit(id: number) {
    this.tagService.GetTag(id).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.submitButton = "Tag Düzenle";
          this.tag = res.Result;
        } else { };
      },
      (e) => {
        var er = e.error.Error;
        if (er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      }
    );
  }

  onDeleteConfirm(id) {
    $('#tagDeleteModal').modal('show');
    $(".modal-backdrop").css("z-index", "1");
    this.deleteId = id;
  }

  onDelete() {
    this.tagService.DeleteTag(this.deleteId).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.toastr.success("Tag başarıyla silindi.", 'Başarılı');
          $('#tagDeleteModal').modal('hide');
          this.List("", this.filter.filterStatus == 1);
        } else { };
      },
      (e) => {
        var er = e.error.Error;
        if (er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      }
    );
  }

  onCancel() {
    this.tag.Id = 0;
    this.tag.Name = "";
    this.tag.Active = true;
    this.submitButton = "Tag Ekle";
  }

  List(name: string, active: boolean) {
    this.tagService.GetTags(active, name).subscribe(
      (res: any) => {
        if (res.IsSuccess == true) {
          this.tags = res.Result;
        }
      },
      e => {
        var er = e.error.Error;
        if (er.ValidationErrors != undefined && er.ValidationErrors != null) {
          er.ValidationErrors.forEach(function (value) {
            this.toastr.error(value.Field, value.Message);
          });
        }
        this.toastr.error(er.Message, er.Details);
      }
    )
  }

}
