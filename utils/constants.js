export const tagEmojiDict = {
  "Family": "👯",
  "Date idea": "🌹",
  "Free": "🙌",
  "Going out": "😎",
  "Staying in": "😇",
  "Solo": "🚶",
  "Food": "🍩",
  "Shopping": "💸",
  "Culture": "🎤",
  "Sports": "👟",
  "Dog-friendly": "🐶",
  "Self-care": "💖",
  "Group": "👥",
  "Holidays": "🎅"
}

export const eventCategories = {
  "Arts & culture": { bgColor: "bg-lightBlue", textColor: "text-blue", emoji: "🎤" },
  "Learning & personal growth": { bgColor: "bg-lightPurple", textColor: "text-purple", emoji: "🌱" },
  "Festival or market": { bgColor: "bg-lightYellow", textColor: "text-yellow", emoji: "🎪" },
  "Food & drink": { bgColor: "bg-lightRed", textColor: "text-red", emoji: "🍩" },
  "Community action": { bgColor: "bg-blue", textColor: "text-white", emoji: "✌" },
  "Kids & family": { bgColor: "bg-purple", textColor: "text-white", emoji: "👯" },
  "Nightlife": { bgColor: "bg-red", textColor: "text-white", emoji: "💃" },
  "Sports & recreation": { bgColor: "bg-lightGreen", textColor: "text-green", emoji: "👟" },
  "Tech": { bgColor: "bg-green", textColor: "text-white", emoji: "🤖" }
}

export const MAP_ZOOM_LEVEL = 11

export const DEFAULT_MAP_CENTER = {
  lat: 43.454086146097296,
  lng: -80.50884238682171,
}

export const MAP_STYLE = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    }
]

export const MARKER_SVG = "M14.18,27.26c2.8,4.47,5.33-.35,8.89-6.7S26.77,5.77,21.9,2.15C18-.76,5.89,2.17,4.25,7.39,1.56,16,9.48,19.75,14.18,27.26Z"
export const MARKER_CLUSTER_SVG = "M15,1C7.89,1.05,1.05,8.17,1,16,1,22.91,6.2,27.89,13,29c7.29,1.19,14.26-1.57,16-8C31.3,12.5,23.94.94,15,1Z"
export const DEFAULT_MARKER_COLOR = "#ffd166"
