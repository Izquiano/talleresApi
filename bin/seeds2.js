require("dotenv").config();
require("../config/db.config");
const User = require("../models/User.model");
const Workshop = require("../models/Workshop.model");
const Service = require("../models/Service.model");
const ServiceResume = require("../models/Service.resume.model");
const Car = require("../models/Car.model");

const faker = require("faker");

const workshops = [
  {
    name: "La Laguna",
    email: "danizquiano@gmail.com",
    telephone: "616616616",
    location: {
      lat: 36.5044271,
      lng: -6.2736591,
    },
  },
  {
    name: "Cubimotor",
    email: "danizquiano@gmail.com",
    telephone: "645678904",
    image:
      "https://lh3.ggpht.com/p/AF1QipPjxDVkPlzrJBid7FnC23G_-3zTl4LFxkKB91PJ=s1536",
    location: {
      lat: 36.503989,
      lng: -6.272727,
    },
  },
  {
    name: "Lodamar",
    email: "danizquiano@gmail.com",
    telephone: "622222222",
    image:
      "https://lh3.ggpht.com/p/AF1QipPjxDVkPlzrJBid7FnC23G_-3zTl4LFxkKB91PJ=s1536",
    location: {
      lat: 36.5011722,
      lng: -6.2717083,
    },
  },
  {
    name: "Estéban Guerrero",
    email: "danizquiano@gmail.com",
    telephone: "636000222",
    image:
      "https://lh3.ggpht.com/p/AF1QipPjxDVkPlzrJBid7FnC23G_-3zTl4LFxkKB91PJ=s1536",
    location: {
      lat: 36.5030695,
      lng: -6.273897,
    },
  },
  {
    name: "Asdrúbal",
    email: "danizquiano@gmail.com",
    telephone: "636000222",
    image:
      "https://lh3.ggpht.com/p/AF1QipPjxDVkPlzrJBid7FnC23G_-3zTl4LFxkKB91PJ=s1536",
    location: {
      lat: 36.5049632,
      lng: -6.2680502,
    },
  },
];
const services = [
  {
    name: "Aceite y filtros",
    category: "Mecánica y mantenimiento",
    description:
      "Cambiamos el aceite y los filtros de tu vehículo con componentes de alta calidad.",

    image: "http://lorempixel.com/640/480/sports",
  },
  {
    name: "Ruedas y alineación",
    category: "Mecánica y mantenimiento",
    description: "Neumáticos nuevos y alineación de la dirección de regalo.",

    image: "http://lorempixel.com/640/480/technics",
  },

  {
    name: "Suspensión",
    category: "Mecánica y mantenimiento",
    description: "Reparación o cambio de la suspensión",

    image: "http://lorempixel.com/640/480/technics",
  },

  {
    name: "Discos de freno",
    category: "Mecánica y mantenimiento",
    description:
      "Revisión y cambio de los discos de freno en el caso de que estén erosionados",

    image: "http://lorempixel.com/640/480/technics",
  },

  {
    name: "Pastillas de freno",
    category: "Mecánica y mantenimiento",
    description:
      "Reemplazo de las pastillas de freno con zapatas de alta calidad y durabilidad",

    image: "http://lorempixel.com/640/480/technics",
  },
  {
    name: "Pre-ITV",
    category: "Mecánica y mantenimiento",
    description:
      "Revisión completa de su vehículo para que no tenga problemas al pasar la revisión periódica",

    image: "http://lorempixel.com/640/480/technics",
  },
  {
    name: "Mecánica",
    category: "Mecánica y mantenimiento",
    description:
      "Reparación mecánica de su vehículo. Fallos de motor, elécticos y cambios de piezas en general",

    image: "http://lorempixel.com/640/480/technics",
  },
];
const users = [
  {
    activation: {
      active: true,
      token: "aNmSDVyq8AJsRR1tXxZ69WZyJ",
    },
    rol: "client",
    name: "Daniel Fernández Izquiano",
    email: "izquiano@hotmail.com",
    password: "1234567890",
  },
];
const cars = [
  {
    carBrand: "Opel",
    model: "Vectra",
    year: "2002",
    registration: "1111GTO",
    frameNumber: "1823649213459342342",
  },
];


let workshopIds = [];
Promise.all([
  Workshop.deleteMany(),
  User.deleteMany(),
  Service.deleteMany(),
  ServiceResume.deleteMany(),
  Car.deleteMany(),
])

  .then(() => {
    
    for (let i = 0; i < workshops.length; i++) {
      const workshop = new Workshop(workshops[i]);
      workshop
        .save()
        .then((w) => {
          console.log('workshop._id:', w._id);
          workshopIds.push(w._id);
        })
        .catch((e) => console.log(e));
    }
    
    
  })
  .catch((e) => console.log(e))
  .then(() => {
    console.log('workshopIds:', workshopIds)

    for (let i = 0; i < services.length; i++) {
      const service = new Service({ ...services[i], workshop: workshopIds });
      service
        .save()
        .then((s) => {
          console.log(s.name);
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e));


// .then(() => {
//   for (let i = 0; i < users.length; i++) {
//     const user = new User(
//       users[i]
//     );
//     user
//       .save()
//       .then((u) => {
//         console.log(u.name);
//         for (let i = 0; i < cars.length; i++) {
//           const car = new Car({
//             ...cars[i],
//             user: u._id,
//           });
//           car
//             .save()
//             .then((c) => {
//               console.log(c.model);

//             })
//             .catch((e) => console.log(e));
//         }
//       })
//       .catch((e) => console.log(e));
//   }
// })
// .catch((e) => console.log(e));
