require("dotenv").config();
require("../config/db.config");
const User = require("../models/User.model");
const Workshop = require("../models/Workshop.model");
const Service = require("../models/Service.model");
const ReviewService = require("../models/Review.service.model");
const ServiceResume = require("../models/Service.resume.model");
const Car = require("../models/Car.model");

const faker = require("faker");

const workshopN = 1;
const serviceN = 2;
const userN = 10;
const carN = 1;
const serviceResumeN = 2;
const reviewServiceN = 1;

const userIds = [];

Promise.all([
  Workshop.deleteMany(),
  User.deleteMany(),
  Service.deleteMany(),
  ReviewService.deleteMany(),
  ServiceResume.deleteMany(),
  Car.deleteMany(),
])

  .then(() => {
    for (let i = 0; i < workshopN; i++) {
      const workshop = new Workshop({
        name: "Taller La laguna",
        email: "lalaguna@taller.com",
        telephone: "616616616",
        image:
          "https://lh3.ggpht.com/p/AF1QipPjxDVkPlzrJBid7FnC23G_-3zTl4LFxkKB91PJ=s1536",
        location: {
          lat: 36.5044271,
          lng: -6.2736591,
        },
      });
      workshop
        .save()
        .then((w) => {
          console.log(w._id);
          for (let i = 0; i < serviceN; i++) {
            const service = new Service({
              workshop: w._id,
              name: faker.commerce.productName(),
              category: "Mecánica y mantenimiento",
              description: faker.lorem.paragraph(),
              price: faker.commerce.price(),
              image: faker.image.image(),
              
            });
            service
              .save()
              .then((s) => {
                console.log(s.name);
                for (let i = 0; i < userN; i++) {
                  const user = new User({
                    email: faker.internet.email(),
                    password: "1234567890",
                    name: faker.name.findName(),
                                        
                  });
                  user
                    .save()
                    .then((u) => {
                      console.log(u.name);
                        for (let i = 0; i < carN; i++) {
                        const car = new Car({
                          carBrand: faker.lorem.sentence(),
                          model: "Prius",
                          year: 2010,
                          registration: "1234YPF",
                          frameNumber: "28EJEI9DFM",
                          user: u._id,
                        });
                        car
                          .save()
                          .then((c) => {
                            console.log(c.model);
                            for (let i = 0; i < serviceResumeN; i++) {
                              
                              const serviceResume = new ServiceResume({
                                date: '1987-09-28',
                                car: c._id,
                                services: [s._id, s._id],
                                user: u._id
                              });
                              serviceResume
                                .save()
                                .then((s) => {
                                  for (let i = 0; i < reviewServiceN; i++) {
                                    const reviewService = new ReviewService({
                                      title: faker.lorem.sentence(),
                                      description: faker.lorem.paragraph(),
                                      score: Math.floor(Math.random() * 6) + 1,
                                      serviceResume: s._id,
                                      user: u._id,
                                      car: c._id, 
                                    });
                                    reviewService
                                      .save()
                                      .then((r) => {
                                      
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
                }
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => console.log(e));
    }
  })
  .catch((e) => console.log(e));
