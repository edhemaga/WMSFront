import { Component, OnInit } from '@angular/core';
import { Map } from '../../models/map.model';
import { FieldDTO } from '../../models/fieldDTO.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-pathfinding',
  templateUrl: './pathfinding.component.html',
  styleUrls: ['./pathfinding.component.css']
})
export class PathfindingComponent implements OnInit {

  maps: Map[];
  fields: Array<Array<HTMLElement>>;
  y_Cords: Array<HTMLElement>;
  selectedFields: Array<HTMLElement>;

  constructor(public HomeService: HomeService) { }

  ngOnInit(): void {
    this.getAllMaps();
  }

  getAllMaps() {
    this.HomeService.getMaps().subscribe(data => {
      this.maps = data as Map[];
    });
  }

  generatePreview(map: Map) {

    this.HomeService.getMaps().subscribe(data => {
      this.maps = data as Map[];
    });

    this.fields = new Array<Array<HTMLElement>>();
    this.selectedFields = new Array<HTMLElement>();

    var widthProp: string = "";
    var heightProp: string = "";

    var maxWidth = map.width * 50;
    var maxHeight = map.height * 50;

    var previewSelect = document.getElementById("preview");

    previewSelect.innerHTML = "";

    for (var i = 0; i < map.height; i++) {

      this.y_Cords = new Array<HTMLElement>();

      for (var j = 0; j < map.width; j++) {

        var field = document.createElement("DIV");

        field = this.assignFields(field, i, j);
        previewSelect.appendChild(field);

        field.addEventListener("click", (field) => {
          if (!this.selectedFields.includes(field.target as HTMLElement))
            this.selectedFields.push(field.target as HTMLElement);
        })
      }

      this.fields.push(this.y_Cords);
    }

    previewSelect.style.width = (maxWidth + "px");
    previewSelect.style.height = (maxHeight + "px");

    console.log(heightProp);
    console.log(widthProp);

    for (var i = 0; i < map.height; i++) {
      heightProp = heightProp + "1fr ";
    }

    for (var j = 0; j < map.width; j++) {
      widthProp = widthProp + "1fr ";
    }

    previewSelect.style.setProperty("grid-template-columns", widthProp);
    previewSelect.style.setProperty("grid-template-rows", heightProp);

    for (var j = 0; j < map.fields.length; j++) {
      this.setWallColor(previewSelect, j, map);
    }

  }

  addWall(width: number, height: number, id: string) {

    var wallFields: FieldDTO[] = this.selectFields(width, height);

    this.HomeService.addWallFields(id, wallFields);

    this.getAllMaps();
  }

  removeWall(width: number, height: number, id: string) {

    var wallFields: FieldDTO[] = this.selectFields(width, height);

    this.HomeService.removeWallFields(id, wallFields);

    this.getAllMaps();

  }


  private selectFields(width: number, height: number) {
    var wallFields: FieldDTO[] = [];

    for (var i = 0; i < this.selectedFields.length; i++) {
      for (var j = 0; j < this.fields.length; j++) {
        if (this.fields[j].includes(this.selectedFields[i])) {
          var wallField: FieldDTO = {
            x_Cord: this.fields[j].indexOf(this.selectedFields[i]),
            y_Cord: j,
            walkable: false,
            item: null
          };
          wallFields.push(wallField);
        }
      }
    }
    return wallFields;
  }

  private assignFields(field: HTMLElement, i: number, j: number) {

    field.setAttribute("id", (i + "" + j));
    field.innerHTML = (j + "" + i);

    field.style.setProperty("transform", "rotateX(180deg)");

    field.style.setProperty("border", "1px solid white");
    field.style.background = "rgba(103, 255, 60, 0.2)";

    // field.style.width = "50px";
    // field.style.height = "50px";

    this.y_Cords.push(field);

    return field;
  }

  private setWallColor(previewSelect: HTMLElement, j: number, map: any) {
    var index = map.fields[j].x_Cord + map.fields[j].y_Cord * map.height;
    var field = previewSelect.childNodes[index] as HTMLElement;
    field.style.background = "#d9d9d9"
  }

  deleteMap(id: string) {
    this.HomeService.deleteMap(id).subscribe();
  }

}
