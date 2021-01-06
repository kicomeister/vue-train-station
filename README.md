# CFF Map
To prepare the development of a future product allowing travelers to quickly find places to withdraw cash, exchange currencies or transfer money, the team has decided to build a MVP displaying all the Swiss railway stations and their respective services on a map.
​
## Specifications
For this MVP, the team agreed on using the CFF (SBB) API and Google maps.
The specifications are as follow:
  - Each station is represented by a marker on the map.
  - For each marker a popup with the station's name and address is available on click.
  - The list of the stations, located below the map, can be clicked to highlight the map's marker and open the associated pop-up.
  - For each station, the list of the stations and the popup show the following information: 
    - `Name`, 
    - `Address`, 
    - `Email`, 
    - `Service` icons _(Only the 3 services "Luggage", "Lounge" and "Money Exchange" should be displayed - if available)_.

A dynamic mock-up has been created by our designer: 
  - https://xd.adobe.com/spec/ce51ed06-d094-4be7-58ca-b14f55664d6f-b860/
  
  The XD mock-up provides access to the graphical assets (images, icons) 
​​

## Resources

### Google Maps

​Documentation: https://developers.google.com/maps/documentation/javascript/tutorial

API Key: `AIzaSyDw_DEMNGJVRHIKYsJkP9ZRBjevr40SpEY`   
(*Note the key is restricted to the Maps JavaScript API*)


### CFF/SBB API
The following information should help you to easily interact with CFF/SBB API.

#### The request

`> GET https://data.sbb.ch/api/records/1.0/search/?dataset=kontaktadressen&facet=service&rows=10&start=0`

Parameters
* `dataset`: dataset id to query (we need information from `kontaktadressen`)
* `facet`: name of facet to enable in the results
* `rows`: how many results you want to fetch
* `start`: pagination offset

#### The response

```
{
  nhits: 1234 // Number: describe how many results this collection contains.
  parameters: { ... } // Object: contains the parameters sent as a querystring in the request
  records: [{ ... }, { ... }, ...] // Array: List of the stations
}
```

`nhits` is the total number of results in the collection. This number could be bigger than the number of results in `records` array. This means that you may have to perform multiple http requests to have all the stations. 


#### The station object
```
    {
      "datasetid": "kontaktadressen",
      "recordid": "e42608030b9f40bf07eccf05fe70a0d456395829",
      "fields": {
        "land": "CH",
        "didok": 26,
        "service": "Geldwechsel",
        "lod": "http://lod.opentransportdata.swiss/didok/8500026",
        "firma": "SBB AG",
        "ort": "Sissach",
        "adresse": "Bahnhof",
        "geopos": [
          47.4627456535,
          7.81201832437
        ],
        "plz": 4450,
        "mail": "sissach@sbb.ch",
        "stationsbezeichnung": "Sissach"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.81201832437,
          47.4627456535
        ]
      },
      "record_timestamp": "2018-09-03T21:17:00+00:00"
    }
```

#### The services

The services are listed in German, here is the mapping for the services to be listed:
- Luggage > `Gepäckaufbewahrung` or `Gepäckausgabe`
- Lounge > `Businesstravel-Service-Center`
- Money Exchange > `Geldwechsel` or `Western Union`

#### Official documentation

CFF API Documentation: https://data.sbb.ch/explore/dataset/kontaktadressen/api/

​
