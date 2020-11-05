require("dotenv").config();
require("../config/db.config");
const User = require("../models/User.model");
const Workshop = require("../models/Workshop.model");
const Service = require("../models/Service.model");
const ReviewService = require("../models/Review.service.model");
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
    createdAt: ISODate("2020-10-22T08:20:20.815Z"),
    updatedAt: ISODate("2020-10-22T08:20:20.815Z"),
    __v: 0,
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
    workshop: [
      ObjectId("5f9140c40777322dba2ac758"),
      ObjectId("5f9140c40777322dba2ac753"),
    ],
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
const serviceResumes = [
  {
    services: [
      ObjectId("5f9140c40777322dba2ac759"),
      ObjectId("5f9140c40777322dba2ac75a"),
    ],
    active: true,
    date: ISODate("2020-11-05T11:00:00.000Z"),
    user: ObjectId("5fa2c66c7bdaaf29c4f746e0"),
    car: ObjectId("5fa2c6a57bdaaf29c4f746e1"),
    workshop: ObjectId("5f9140c40777322dba2ac758"),
    confirmation: false
  },

  {
    services: [ObjectId("5f9140c40777322dba2ac39b")],
    active: true,
    date: ISODate("2020-11-05T11:00:00.000Z"),
    user: ObjectId("5fa2c66c7bdaaf29c4f746e0"),
    car: ObjectId("5fa2c6a57bdaaf29c4f746e1"),
    workshop: ObjectId("5f9140c40777322dba2ac753"),
    confirmation: false
  },

  {
    services: [
      ObjectId("5f9140c40777322dba2ac759"),
      ObjectId("5f9140c40777322dba2ac75a"),
      ObjectId("5f9140c40777322dba2ac45b"),
      ObjectId("5f9140c40777322dba2ac12b"),
      ObjectId("5f9140c40777322dba2ac34b"),
      ObjectId("5f9140c40777322dba2ac39b"),
      ObjectId("5f9140c40777322dba2ac74b"),
    ],
    active: true,
    date: ISODate("2020-11-09T11:00:00.000Z"),
    user: ObjectId("5fa2c66c7bdaaf29c4f746e0"),
    car: ObjectId("5fa2c6a57bdaaf29c4f746e1"),
    workshop: ObjectId("5f9140c40777322dba2ac753"),
    confirmation: false
  },
];

const workshopIds = [];
const servicesIds = [];

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
          console.log(w._id);
          workshopIds.push(w._id);
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e))
  .then(() => {
    for (let i = 0; i < services.length; i++) {
      const service = new Service({ ...services[i], workshop: workshopIds });
      service
        .save()
        .then((s) => {
          console.log(s.name);
          servicesIds.push(s._id);
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e))
  .then(() => {
    for (let i = 0; i < users.length; i++) {
      const user = new User(
        users[i]
      );
      user
        .save()
        .then((u) => {
          console.log(u.name);
          for (let i = 0; i < cars.length; i++) {
            const car = new Car({
              ...cars[i],
              user: u._id,
            });
            car
              .save()
              .then((c) => {
                console.log(c.model);
                for (let i = 0; i < serviceResumes.length; i++) {
                  const serviceResume = new ServiceResume({
                    date: "2020-11-09T11:00:00.000Z",
                    car: c._id,
                    services: servicesIds,
                    user: u._id,
                    workshop:
                      workshopIds[
                        Math.floor(Math.random() * workshopIds.length)
                      ],
                    active: true,
                  });
                  serviceResume
                    .save()
                    .then((s) => {
                      console.log(s);
                    })
                    .catch((e) => console.log(e));
                }
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e));
