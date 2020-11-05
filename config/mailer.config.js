const nodemailer = require("nodemailer");

const host = process.env.HOST || "http://localhost:3011";
const user = process.env.NM_USER;

function FormatDate(dateString) {
  let date = new Date(dateString);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    return `${day}/0${month}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: process.env.NM_PASS,
  },
});
// console.log(transport.auth)
module.exports.sendValidationEmail = (name, email, id, activationToken) => {
  transport.sendMail({
    to: email,
    sender: `App Talleres`,
    subject: "Activa tu cuenta!",
    html: `
			<h1>Hola ${name}</h1>
			<p>Haz click en el botón para activar la cuenta</p>
			<a href="${host}/users/${id}/activate/${activationToken}" style="padding: 10px 20px; color: white; background-color: #FF7900; border-radius: 50px;">Activar</a>
		`,
  });
};

module.exports.sendCreatedServiceResumeToWorkshop = (user, resumeService) => {
  transport.sendMail({
    to: resumeService.workshop.email,
    sender: `App Talleres`,
    subject: "Acaban de hacerte una reserva!",
    html: `
			<h1>Hola ${resumeService.workshop.name}</h1>
            <p>El usuario <b>${
              user.name
            }</b> te ha hecho una reserva con las siguientes peticiones:</p>
            <p>${resumeService.workshop.name}</p>
            <p><b>Fecha:</b></p>
        <p>${FormatDate(resumeService.date)}</p>
        
            <p><b>Servicios:</b></p>
        ${resumeService.services.map((el) => {
          return `<p>· ${el.name}</p>`;
        })}
        <p><b>Partes dañadas:</b></p>
${resumeService.damagedParts.map((el) => {
  return `<p>· ${el}</p>`;
})}
        <p><b>Coche:</b></p>
        <p>Marca: ${resumeService.car.carBrand}</p>
        <p>Modelo: ${resumeService.car.model}</p>
        <p>Año: ${resumeService.car.year}</p>
        <p>Matrícula: ${resumeService.car.year}</p>
        <p>Nº Bastidor: ${resumeService.car.frameNumber}</p>
        <p><b>Datos del usuario:</b></p>
        <p>Nombre: ${user.name}</p>
        <p>Email: ${user.email}</p>
       
        
        
			
		`,
  });
};
module.exports.sendCreatedServiceResumeToUser = (user, resumeService) => {
  transport.sendMail({
    to: user.email,
    sender: `App Talleres`,
    subject: "Confirmación de Reserva en App Talleres",
    html: `
    <h1>Hola ${user.name}</h1>
    <p>Has hecho una reserva en <b>${
      resumeService.workshop.name
    }</b> con estos detalles:</p>
    
    <p><b>Fecha:</b></p>
<p>${FormatDate(resumeService.date)}</p>

    <p><b>Servicios:</b></p>
${resumeService.services.map((el) => {
  return `<p>· ${el.name}</p>`;
})}

<p><b>Partes dañadas:</b></p>
${resumeService.damagedParts.map((el) => {
  return `<p>· ${el}</p>`;
})}
<p><b>Coche para reparar:</b></p>
<p>Marca: ${resumeService.car.carBrand}</p>
<p>Modelo: ${resumeService.car.model}</p>
<p>Año: ${resumeService.car.year}</p>
<p>Matrícula: ${resumeService.car.year}</p>
<p>Nº Bastidor: ${resumeService.car.frameNumber}</p>
<p><b>Datos del taller:</b></p>
<p>Nombre: ${resumeService.workshop.name}</p>
<p>Email: ${resumeService.workshop.email}</p>
<p>Teléfono: 
<a href="tel:${resumeService.workshop.telephone}">${
      resumeService.workshop.telephone
    }</a>
</p>
              
          `,
  });
};

module.exports.sendDeleteCarEmail = (name, email) => {
  transport.sendMail({
    to: email,
    sender: `App Talleres`,
    subject: "Coche Eliminado!",
    html: `
			<h1>Hola ${name}</h1>
			<p>Se ha eliminado uno de tus coches</p>
			
		`,
  });
};
