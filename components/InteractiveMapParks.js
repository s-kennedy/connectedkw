import { useEffect, useState, useRef, isValidElement, cloneElement, Children } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import Loading from 'components/Loading'
import Section from 'components/Section'
import FeatureDisplay from 'components/FeatureDisplay'
import FeatureList from 'components/FeatureList'
import FeatureGrid from 'components/FeatureGrid'
import ReactModal from "react-modal";
import MapFilter from 'components/MapFilter'

import { DEFAULT_MAP_CENTER, MAP_STYLE, MARKER_SVG, MARKER_CLUSTER_SVG, DEFAULT_MARKER_COLOR } from "utils/constants";
const MAP_ZOOM_LEVEL = 14

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
      {categoryNames.map(catName => {
        const category = categories[catName]
        return (
          <div className="mb-1 space-x-1 flex flex-nowrap items-center" key={catName}>
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: `${category.color}`}}>
            </div>
            <div>
              {category.label ? category.label : catName}
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

const generatePreview = (feature, previewConfig={}) => {
  const title = feature.Title || ""

  if (feature.Images) {
    const image = feature.Images[0]
    const imageSrc = image.thumbnails.large.url
    return (`<div class="map-infowindow"><div class="image"><img src="${imageSrc}" alt="Photo of park" /></div><p class="title">${title}</p></div>`)
  }

  return (`<div class="map-infowindow"><p class="title">${title}</p></div>`)
}

const InfoWindow = ({ map, marker, previewConfig }) => {
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
      const content = generatePreview(feature, previewConfig)

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
  const [markers, setMarkers] = useState([])
  const [clusterer, setClusterer] = useState(null)
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
      markers.forEach(m => {
        m.setMap(null)
        m = null
      })

      if (clusterer) {
        clusterer.clearMarkers()
      }

      setMarkers([])

      const gmapMarkers = features.map(feature => {
        if (!feature?.location?.coordinates?.coordinates) return null
        const [longitude, latitude] = feature.location.coordinates.coordinates
        const position = new google.maps.LatLng(latitude, longitude)
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
      }).filter(i => i)

      setMarkers(gmapMarkers)

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

      if (clusterer) {
        clusterer.addMarkers(gmapMarkers)
      } else {
        const gClusterer = new MarkerClusterer({ markers: gmapMarkers, map, ...options });
        setClusterer(gClusterer)
      }

      resizeMapBounds()
    }
  }, [map, features])

  const resizeMapBounds = () => {
    if (!map) return null;

    if (!features || features.length === 0) {
      return resetMap()
    }

    const bounds = new google.maps.LatLngBounds();
    features.forEach(feature => {
      if (feature?.location?.coordinates?.coordinates) {
        const [longitude, latitude] = feature.location.coordinates.coordinates
        const position = new google.maps.LatLng(latitude, longitude)
        // const pos = { lat: feat.Latitude, lng: feat.Longitude }
        bounds.extend(position);
      }
    })

    map.fitBounds(bounds)
  }

  const resetMap = () => {
    if (map) {
      map.panTo(DEFAULT_MAP_CENTER);
      map.setZoom(MAP_ZOOM_LEVEL);
    }
  }

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

const InteractiveMapParks = ({ features, mapConfig }) => {
  const { categories, categoriesName, tags, tagsName, mapId, featureDisplayFields } = mapConfig
  const [previewMarker, setPreviewMarker] = useState(null)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [view, setView] = useState("map")
  const [filteredFeatures, setFilteredFeatures] = useState(features)

  const setMapView = () => {
    setView("map")
  }

  const setGridView = () => {
    setView("grid")
  }

  const filterFeatures = () => {
    let newSetOfFeatures = features

    if (selectedCategories.length > 0) {
      newSetOfFeatures = newSetOfFeatures.filter(feature => {
        return selectedCategories.includes(feature.Category)
      })
    }

    if (selectedTags.length > 0) {
      newSetOfFeatures = newSetOfFeatures.filter(feature => {
        const featureTags = feature.tags.map(t => t.name)
        const matches = selectedTags.map(tag => featureTags.includes(tag))

        // only allow events that match ALL the selected filters.
        // use .some() to keep the events that match ANY of the selected filters.
        return matches.some(m => m)
      })
    }

    setFilteredFeatures(newSetOfFeatures)
  }

  const reset = () => {
    setSelectedTags([])
    setSelectedCategories([])
  }

  const toggleFilter = (tagName) => {
    const alreadySelected = selectedTags.includes(tagName)

    if (alreadySelected) {
      const filteredTags = selectedTags.filter(item => item != tagName)
      setSelectedTags(filteredTags)
    } else {
      const newTags = [...selectedTags, tagName]
      setSelectedTags(newTags)
    }
  }

  const toggleCategory = (categoryName) => {
    const alreadySelected = selectedCategories.includes(categoryName)

    if (alreadySelected) {
      const filteredCategories = selectedCategories.filter(item => item != categoryName)
      setSelectedCategories(filteredCategories)
    } else {
      const newCategories = [...selectedCategories, categoryName]
      setSelectedCategories(newCategories)
    }
  }

  useEffect(() => {
    ReactModal.setAppElement(`#${mapId}`)
  })

  useEffect(() => {
    filterFeatures()
  }, [selectedTags, selectedCategories])

  return(
    <div id={mapId} className="w-full h-full">
    <div className="w-full flex justify-end space-x-1">
      <MapFilter 
        categories={categories}
        categoriesName={categoriesName}
        tags={tags}
        tagsName={tagsName}
        toggleFilter={toggleFilter}
        toggleCategory={toggleCategory}
        selectedTags={selectedTags}
        selectedCategories={selectedCategories}
        reset={reset}
      />
      <div className="border-black border-2 rounded-lg mb-2">
        <button onClick={setMapView} className={`btn text-sm border-0 rounded-r-none ${view === "map" ? 'bg-green' : 'bg-white'}`}>Map</button>
        <button onClick={setGridView} className={`btn text-sm border-0 rounded-l-none ${view === "grid" ? 'bg-green' : 'bg-white'}`}>Grid</button>
      </div>
    </div>
    { view === "map" &&
      <div className="h-visibleScreen">
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} render={render}>
          <MapComponent 
            features={filteredFeatures} 
            categories={categories}
            setPreviewMarker={setPreviewMarker} 
            setSelectedFeature={setSelectedFeature}
            previewMarker={previewMarker}
          >
            <InfoWindow marker={previewMarker} previewConfig={mapConfig.preview} />
            <Legend categories={categories} />
          </MapComponent>
        </Wrapper>
      </div>
    }
    {
      view === "grid" && 
      <FeatureGrid 
        features={filteredFeatures} 
        categories={categories}
        setSelectedFeature={setSelectedFeature}
        displayFields={featureDisplayFields}
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
      <FeatureDisplay 
        feature={selectedFeature} 
        closeModal={() => setSelectedFeature(null)} 
      />
    </ReactModal>
    </div>
  )
}

export default InteractiveMapParks

