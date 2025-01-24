import L from "leaflet";

const DEMO = 1;

export interface Zone {
  id: number;
  name: string;
  color: string;
  coords: [number, number][];
}

export const zones: Zone[] = [
  {
    id: 1,
    name: "Zone 1",
    color: "rgba(0, 0, 255, 0.5)",
    coords: [
      [43.5811238216551, 1.4250328278169775],
      [43.5809780635509, 1.4489681355809694],
      [43.60306101867485, 1.4631608574996449],
      [43.621444275172536, 1.4494754947189108],
      [43.62114607566045, 1.4251726517705379],
      [43.60266272644023, 1.4107508942683182],
      [43.5811238216551, 1.4250328278169775],
    ],
  },
  {
    id: 2,
    name: "Zone 2",
    color: "rgba(255, 0, 0, 0.5)",
    coords: [
      [43.62114703051179, 1.4251532026648874],
      [43.63964294760996, 1.4132715658763004],
      [43.63943747697738, 1.3883514404922153],
      [43.62119076378451, 1.3718225485505116],
      [43.60279123167558, 1.3864872885232558],
      [43.60266317528712, 1.4107515898652423],
      [43.62114703051179, 1.4251532026648874],
    ],
  },
  {
    id: 3,
    name: "Zone 3",
    color: "rgba(0, 255, 0, 0.5)",
    coords: [
      [43.60266363589386, 1.4107502368509017],
      [43.602791359501225, 1.386487222801037],
      [43.58352705839286, 1.3713050299759573],
      [43.560303364724376, 1.3853622887221775],
      [43.559683486966804, 1.4097430169655638],
      [43.58112381337148, 1.4250310924862788],
      [43.60266363589386, 1.4107502368509017],
    ],
  },
  {
    id: 4,
    name: "Zone 4",
    color: "rgba(255, 255, 0, 0.5)",
    coords: [
      [43.58112443935008, 1.4250309042998595],
      [43.55968398652348, 1.409743530448452],
      [43.53505623367289, 1.4229114712156274],
      [43.534156635512375, 1.4509751001640439],
      [43.55898262936694, 1.4669566470876703],
      [43.58097672638502, 1.4489204275884333],
      [43.58112443935008, 1.4250309042998595],
    ],
  },
  {
    id: 5,
    name: "Zone 5",
    color: "rgba(255, 165, 0, 0.5)",
    coords: [
      [43.62114774720328, 1.4251545180586618],
      [43.62144845193163, 1.4494725491052805],
      [43.63918431700435, 1.4629169526693317],
      [43.65756669967834, 1.4489669478840597],
      [43.65721056172387, 1.4230543315981947],
      [43.63963528176407, 1.413236630965855],
      [43.62114774720328, 1.4251545180586618],
    ],
  }
];

export const demoPosition = [
  {
    lat: 43.604429,
    lng: 1.443812
  },
  {
    lat: 43.628356,
    lng: 1.412473
  },
  {
    lat: 43.582178,
    lng: 1.408181
  },
  {
    lat: 43.552452,
    lng: 1.439509
  },
  {
    lat: 43.640485,
    lng: 1.443157
  }
]

export const getUserPosition = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if (DEMO) {
      const randomPoint = demoPosition[Math.floor(Math.random() * demoPosition.length)];
      resolve([randomPoint.lat, randomPoint.lng]);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve([latitude, longitude]);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation not supported by the browser."));
    }
  });
};

export const getZoneByCoordinates = (lat: number, lng: number): string | null => {
  const userLatLng = L.latLng(lat, lng);

  const zone = zones.find((zone) => {
    const polygon = L.polygon(zone.coords as L.LatLngTuple[]);
    return polygon.getBounds().contains(userLatLng);
  });

  return zone ? zone.name : null;
};
