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
import Search from '@arcgis/core/widgets/Search';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import ClassBreaksRendererProperties from '@arcgis/core/renderers/ClassBreaksRenderer';
import Legend from '@arcgis/core/widgets/Legend';
import Expand from '@arcgis/core/widgets/Expand';

import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GraphicProperties from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { MAP_INFO } from './map-info';
import MapView from '@arcgis/core/views/MapView';

@Component({
  selector: 'lib-arc-gis-poc',
  templateUrl: './arc-gis-poc.component.html',
  styleUrls: ['./arc-gis-poc.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArcGisPocComponent implements OnInit {
  @ViewChild('eventMap', { static: true }) private mapViewEl: any;
  baseMapInput = [
    'topo-vector',
    'gray-vector',
    'streets-vector',
    'streets-night-vector',
    'satellite',
  ];
  mapProperties = {
    basemap: 'topo-vector',
  };

  ngOnInit(): void {
    this.changeBaseMap('topo-vector');
  }

  changeBaseMap(baseMap: string) {
    this.mapProperties = { ...this.mapProperties, basemap: baseMap };
    this.initializeMap();
  }

  initializeMap() {
    const map = new EsriMap(this.mapProperties);
    const mapViewProperties = {
      map: map,
      container: this.mapViewEl.nativeElement,
      center: [-101.41, 40.78],
      zoom: 7,
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
          buttonEnabled: true,
          breakpoint: false,
          position: 'bottom-center',
        },
      },
    };

    const mapView: MapView = new EsriMapView(mapViewProperties);

    this.addWidgets('Search', mapView, 'bottom-right');
    this.addWidgets('Track', mapView, 'top-left');
    this.addWidgets('Legend', mapView, 'top-right');

    const g = MAP_INFO.map(
      (point) =>
        new Graphic({
          geometry: new Point({
            longitude: point.leakLongitude,
            latitude: point.leakLatitude,
          }),
          attributes: {
            ObjectID: point.accountID, // Account ID as ObjectID
            uV_mLevel: point.uV_mLevel, // UV measurement level
            account: point.account,
            house: point.house,
            area: point.area,
            leakAddress: point.leakAddress,
            level: point.level,
            date_found: point.date_found,
            status: point.status,
            device: point.device,
            details: point.details,
          },
        })
    );

    const clusterConfig: any = {
      type: 'cluster',
      clusterRadius: '100px',
      clusterMinSize: '24px',
      clusterMaxSize: '60px',
    };

    const renderer = new ClassBreaksRenderer({
      legendOptions: {
        title: 'Level of uV_mLevel',
      },
      field: 'uV_mLevel', // Use uV_mLevel field for classification
      defaultSymbol: {
        type: 'simple-marker',
        color: 'gray',
        size: 6,
        outline: {
          color: 'black',
          width: 0.5,
        },
      },
      defaultLabel: 'no data',
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 99,
          label: 'Low',
          symbol: this.addSymbol('simple-marker', 'green', 8, 'black', 0.5),
        },
        {
          minValue: 100,
          maxValue: 199,
          label: 'Moderate',
          symbol: this.addSymbol('simple-marker', 'yellow', 10, 'black', 0.5),
        },
        {
          minValue: 200,
          maxValue: 999,
          label: 'High',
          symbol: this.addSymbol('simple-marker', 'red', 12, 'black', 0.5),
        },
      ],
    } as unknown as ClassBreaksRendererProperties);

    const featureLayer = new FeatureLayer({
      source: g,
      fields: [
        {
          name: 'ObjectID',
          alias: 'ObjectID',
          type: 'oid',
        },
        {
          name: 'uV_mLevel',
          alias: 'uV_mLevel',
          type: 'double',
        },
        {
          name: 'account',
          alias: 'account',
          type: 'string',
        },
        {
          name: 'house',
          alias: 'house',
          type: 'string',
        },
        {
          name: 'area',
          alias: 'area',
          type: 'string',
        },
        {
          name: 'leakAddress',
          alias: 'leakAddress',
          type: 'string',
        },
        {
          name: 'level',
          alias: 'level',
          type: 'string',
        },
        {
          name: 'date_found',
          alias: 'date_found',
          type: 'string',
        },
        {
          name: 'status',
          alias: 'status',
          type: 'string',
        },
        {
          name: 'device',
          alias: 'device',
          type: 'string',
        },
        {
          name: 'details',
          alias: 'details',
          type: 'string',
        },
      ],
      objectIdField: 'ObjectID',
      geometryType: 'point',
      popupTemplate: {
        title: 'Account: {account} | House: {house}', // Display account and house
        content: `
          <strong>Leak Address:</strong> {leakAddress}<br/>
          <strong>UV Level:</strong> {uV_mLevel} uV/m<br/>
          <strong>Date Found:</strong> {date_found}<br/>
          <strong>Device:</strong> <a href="{device}" target="_blank">{device}</a><br/>
          <a href="{details}" target="_blank">Get Details</a>
        `,
      },
      renderer: renderer,
    });

    map.add(featureLayer);

    featureLayer.queryExtent().then((extent) => {
      console.log('Extent: ', extent);
    });
  }

  // Add Widgets
  addWidgets(wType: string, mapView: MapView, position: string) {
    switch (wType) {
      case 'Search': {
        mapView.ui.add(
          new Search({
            view: mapView,
          }),
          position
        );
        break;
      }
      case 'Track': {
        mapView.ui.add(
          new Track({
            view: mapView,
          }),
          position
        );
        break;
      }
      case 'Legend': {
        mapView.ui.add(
          new Legend({
            view: mapView,
          }),
          position
        );
        break;
      }
    }
  }

  addSymbol(
    type: string,
    color: string,
    size: number,
    oColor: string,
    width: number
  ) {
    return {
      type,
      color,
      size,
      outline: {
        color: oColor,
        width,
      },
    };
  }
}
