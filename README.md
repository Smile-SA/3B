# ThreeXBabylon

This project is a converter that takes a scene as a JSON file and converts it between Three.js and Babylon.js, or vice versa.

***Disclaimer***: this is an experimental project containing a limited functional coverage and / or bugs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. 

### Setup

1. Clone this repository

2. Install the dependencies

 ```bash 
 yarn install
 ``` 

 3. Start the project
 
 ```bash 
 yarn run start
 ```

## Usage

The project is not designed to be generic for all scenes and currently supports the following components:
- Box
- Hemispheric Light
- Camera

Conversion from Babylon.js to Three.js can handle different types of meshes. However, conversion from Three.js to Babylon.js supports only one type of mesh: Box.

Please use the JSON files provided in the public folder. You can modify the scene to be transformed by changing the path to the JSON file in the App.tsx file.


## Credits 
- Ibrahim Talbi @ibrahim
- Jonathan Rivalan @JonRiv
- Rnd Team @ SMILE

## License
Licensed under the Apache 2.0 license

