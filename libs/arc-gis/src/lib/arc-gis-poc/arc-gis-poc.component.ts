import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';

import EsriMap from '@arcgis/core/Map';
import EsriMapView from '@arcgis/core/views/MapView';
import Track from '@arcgis/core/widgets/Track';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';

@Component({
  selector: 'lib-arc-gis-poc',
  templateUrl: './arc-gis-poc.component.html',
  styleUrl: './arc-gis-poc.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArcGisPocComponent implements OnInit {
  @ViewChild('eventMap', { static: true }) private mapViewEl: any;
  baseMapInput = ['topo-vector', 'gray-vector', 'streets-vector', 'streets-night-vector', 'satellite' ];
  mapProperties = {
    basemap: 'topo-vector',
  };

  ngOnInit(): void {
    this.changeBaseMap('topo-vector');
  }

  changeBaseMap(baseMap: string) {
    this.mapProperties = {...this.mapProperties, basemap: baseMap};
    this.initializeMap();
  }

  initializeMap() {
    const map = new EsriMap(this.mapProperties);
    const mapViewProperties = {
      map: map,
      container: this.mapViewEl.nativeElement,
      center: [-101.41, 40.78],
      // center: [21.7679, 78.8718],
      navigation: {
        gamepad: {
          enabled: false,
        },
      },
      popup: {
        collapseEnabled: false,
        autoOpenEnabled: false,
        dockEnabled: false,
        dockOptions: {
          // Disables the dock button from the popup
          buttonEnabled: true,
          // Ignore the default sizes that trigger responsive docking
          breakpoint: false,
          position: 'bottom-center',
        },
      },
    };

    const mapView: any = new EsriMapView(mapViewProperties);
    // adding track
    const tracks = new Track({
      view: mapView,
    });
    mapView.ui.add(tracks, 'top-left');

    // reactiveUtils.whenOnce(mapView, "ready"). then() => {};
  }

  // arcgisViewChange(event: CustomEvent) {
  //   const { center, zoom } = event.target;
  //   console.log("Center (lon/lat): ", `${center.longitude}, ${center.latitude}`);
  //   console.log("Zoom: ", zoom);
  // }
}
