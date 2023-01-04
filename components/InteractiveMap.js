import { useEffect, useState, useRef, isValidElement, cloneElement, Children } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Loading from 'components/Loading'
import FeatureDisplay from 'components/FeatureDisplay'
import ReactModal from "react-modal";

import { DEFAULT_MAP_CENTER, MAP_ZOOM_LEVEL, MAP_STYLE, MARKER_SVG, DEFAULT_MARKER_COLOR } from "utils/constants";

const Marker = ({ map, feature, category={}, setPreviewMarker, setSelectedMarker }) => {
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
      marker.addListener("click", () => setSelectedMarker(marker))
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


const MapComponent = ({ children }) => {
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

  return (
    <>
      <div className="h-full w-full" ref={ref} />
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
  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {

  }, [selectedMarker])

  useEffect(() => {
    ReactModal.setAppElement("#interactive-map")
  })

  return(
    <div id="interactive-map" className="w-full h-full">
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} render={render}>
        <MapComponent>
          { features.map(f => {
              const category = categories[f.Category]
              return (
                <Marker 
                  key={f.id} 
                  feature={f} 
                  category={category} 
                  setPreviewMarker={setPreviewMarker} 
                  setSelectedMarker={setSelectedMarker}
                />
              ) 
            })
          }
          <InfoWindow marker={previewMarker} />
        </MapComponent>
      </Wrapper>
      <ReactModal
        isOpen={!!selectedMarker}
        onRequestClose={() => setSelectedMarker(null)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto h-full"
        style={{
          overlay: { padding: "3vw", zIndex: 100 }
        }}
      >
        <FeatureDisplay feature={selectedMarker?.properties} closeModal={() => setSelectedMarker(null)} />
      </ReactModal>
    </div>
  )
}

export default InteractiveMap

