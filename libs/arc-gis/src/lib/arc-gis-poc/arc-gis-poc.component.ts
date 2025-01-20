import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { setAssetPath as setCalciteComponentsAssetPath } from '@esri/calcite-components/dist/components';
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-zoom";
import "@arcgis/map-components/dist/components/arcgis-placement";
import "@arcgis/map-components/dist/components/arcgis-expand";
import "@arcgis/map-components/dist/components/arcgis-legend";

@Component({
  selector: 'lib-arc-gis-poc',
  templateUrl: './arc-gis-poc.component.html',
  styleUrl: './arc-gis-poc.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArcGisPocComponent {
  constructor() {
    setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");
  }

  // arcgisViewChange(event: CustomEvent) {
  //   const { center, zoom } = event.target;
  //   console.log("Center (lon/lat): ", `${center.longitude}, ${center.latitude}`);
  //   console.log("Zoom: ", zoom);
  // }

  handleClick(){
    console.log("Hello Aditi");
  }
}
