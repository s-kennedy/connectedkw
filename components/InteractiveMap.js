import { useEffect, useState, useRef, isValidElement, cloneElement, Children } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Loading from 'components/Loading'
import Section from 'components/Section'
import FeatureDisplay from 'components/FeatureDisplay'
import FeatureList from 'components/FeatureList'
import FeatureGrid from 'components/FeatureGrid'
import ReactModal from "react-modal";

import { DEFAULT_MAP_CENTER, MAP_ZOOM_LEVEL, MAP_STYLE, MARKER_SVG, MARKER_CLUSTER_SVG, DEFAULT_MARKER_COLOR } from "utils/constants";

const Legend = ({ map, categories }) => {
  const ref = useRef(null);
  const [legend, setLegend] = useState()

  useEffect(() => {
    if (ref.current && !legend) {
      setLegend(ref.current)
    }
  }, [ref]);

  useEffect(() => {
    if (legend && map) {
      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    }
  }, [legend])

  const categoryNames = Object.keys(categories)

  return (
    <div ref={ref} className="ml-2 bg-white border-2 border-black p-2 font-body text-xs rounded-lg flex flex-col w-fit">
      {categoryNames.map(category => {
        return (
          <div className="mb-1 space-x-1 flex flex-nowrap items-center" key={category}>
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: `${categories[category]["color"]}`}}>
            </div>
            <div>
              {category}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Marker = ({ map, feature, category={}, setPreviewMarker, setSelectedFeature }) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      const position = new google.maps.LatLng(feature.Latitude, feature.Longitude)
      const color = category.color || DEFAULT_MARKER_COLOR
      const icon = {
        path: MARKER_SVG,
        fillColor: color,
        fillOpacity: 1,
        anchor: new google.maps.Point(30, 30),
        scaledSize: new google.maps.Size(30, 30),
        strokeWeight: 2,
        scale: 1,
      }
      const title = feature.Title
      const options = {
        icon,
        position,
        title,
        properties: feature
      }

      marker.setOptions({map, ...options});
      marker.addListener("mouseover", () => setPreviewMarker(marker))
      marker.addListener("mouseout", () => setPreviewMarker(null))
      marker.addListener("click", () => setSelectedFeature(marker.properties))
    }
  }, [marker, feature]);

  return null;
};

const generatePreview = (feature) => {
  if (feature.Images) {
    const image = feature.Images[0]
    const imageSrc = image.thumbnails.large.url
    return (`<div class="map-infowindow"><div class="image"><img src="${imageSrc}" alt="Photo of artwork" /></div></div>`)
  }

  const title = feature.Title || "Untitled"
  const artist = feature.Artist || "Artist unknown"
  const date = feature.Year || "ND"
  return (`<div class="map-infowindow"><p class="title">${title}</p><p class="artist">${artist}, ${date}</p></div>`)
}

const InfoWindow = ({ map, marker }) => {
  const [infoWindow, setInfoWindow] = useState();

  useEffect(() => { 
    if (!infoWindow) {
      setInfoWindow(new google.maps.InfoWindow({ maxWidth: 240 }));
    }

    // remove infowindow from map on unmount
    return () => {
      if (infoWindow) {
        infoWindow.setMap(null);
      }
    };
  }, [infoWindow]);

  useEffect(() => {
    if (infoWindow && marker) {
      const feature = marker.properties
      const content = generatePreview(feature)

      infoWindow.setContent(content)
      infoWindow.open({
        anchor: marker,
        map
      });
    }

    if (infoWindow && !marker) {
      infoWindow.close()
    }
  }, [infoWindow, marker]);

  return null;
};


const MapComponent = ({ features, categories, setPreviewMarker, setSelectedFeature, previewMarker, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [zoom, setZoom] = useState(MAP_ZOOM_LEVEL);
  const [center, setCenter] = useState(DEFAULT_MAP_CENTER);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions({ 
        zoom: MAP_ZOOM_LEVEL,
        center: DEFAULT_MAP_CENTER,
        styles: MAP_STYLE 
      });
    }
  }, [map]);

  useEffect(() => {
    if (map && features) {
      const markers = features.map(feature => {
        const position = new google.maps.LatLng(feature.Latitude, feature.Longitude)
        const category = categories[feature.Category] || {}
        const color = category.color || DEFAULT_MARKER_COLOR
        const icon = {
          path: MARKER_SVG,
          fillColor: color,
          fillOpacity: 1,
          size: new google.maps.Size(30,30),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(15,30),
          strokeWeight: 2,
          scale: 1,
        }
        const title = feature.Title
        const options = {
          icon,
          position,
          title,
          properties: feature
        }

        const marker = new google.maps.Marker(options)

        // marker.setOptions({map, ...options});
        marker.addListener("mouseover", () => setPreviewMarker(marker))
        marker.addListener("mouseout", () => setPreviewMarker(null))
        marker.addListener("click", () => setSelectedFeature(marker.properties))

        return marker
      })

      const options = {
        renderer: { render: ({ count, position }) => new google.maps.Marker({
          label: { 
            text: String(count), 
            color: "#ffffff", 
            fontSize: "11px",
            fontFamily: "'Fredoka', sans-serif",
          },
          position,
          // adjust zIndex to be above other markers
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
          icon: {
            path: MARKER_CLUSTER_SVG,
            fillColor: "#51355a",
            fillOpacity: 1,
            size: new google.maps.Size(30,30),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(15,30),
            labelOrigin: new google.maps.Point(15,15),
            strokeWeight: 3,
            strokeColor: "#d7d1d8",
            scale: 1,
          }
        })}
      }

      new MarkerClusterer({ markers, map, ...options });
    }
  }, [map, features])

  return (
    <>
      <div className="h-full w-full bg-white rounded-xl border-black border-3 overflow-hidden" ref={ref} />
      { 
        Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { map });
          }
        })
      }
    </>
  )
}

const render = ({ status }) => {
  if (status === Status.FAILURE) return <div className="w-full h-full flex justify-center items-center">This map is not available.</div>;
  return <Loading />;
};

const InteractiveMap = ({ features, categories }) => {
  const [previewMarker, setPreviewMarker] = useState(null)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [view, setView] = useState("map")

  const setMapView = () => {
    setView("map")
  }

  const setGridView = () => {
    setView("grid")
  }

  useEffect(() => {
    ReactModal.setAppElement("#interactive-map")
  })

  return(
    <div id="interactive-map" className="w-full h-full">
    <div className="w-full flex justify-end">
      <div className="border-black border-2 rounded-lg mb-2">
        <button onClick={setMapView} className={`text-sm border-0 rounded-r-none ${view === "map" ? 'bg-green' : 'bg-white'}`}>Map</button>
        <button onClick={setGridView} className={`text-sm border-0 rounded-l-none ${view === "grid" ? 'bg-green' : 'bg-white'}`}>Grid</button>
      </div>
    </div>
    { view === "map" &&
      <div className="h-visibleScreen">
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} render={render}>
          <MapComponent 
            features={features} 
            categories={categories}
            setPreviewMarker={setPreviewMarker} 
            setSelectedFeature={setSelectedFeature}
            previewMarker={previewMarker}
          >
            <InfoWindow marker={previewMarker} />
            <Legend categories={categories} />
          </MapComponent>
        </Wrapper>
      </div>
    }
    {
      view === "grid" && 
      <FeatureGrid 
        features={features} 
        categories={categories}
        setSelectedFeature={setSelectedFeature}
      />
    }
    <ReactModal
      isOpen={!!selectedFeature}
      onRequestClose={() => setSelectedFeature(null)}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="max-w-md mx-auto h-full"
      style={{
        overlay: { padding: "3vw", zIndex: 100 }
      }}
    >
      <FeatureDisplay feature={selectedFeature} closeModal={() => setSelectedFeature(null)} />
    </ReactModal>
    </div>
  )
}

export default InteractiveMap

