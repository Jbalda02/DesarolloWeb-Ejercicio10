var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Foto = require("../models").foto;
const Etiqueta = require("../models").etiqueta;
const { Op } = require("sequelize");

router.get("/tabla", function (req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
  })
    .then((fotos) => {
      console.log(fotos);
      res.render("fotos", { title: "Fotos", fotos }); // Pass `title` and `fotos`
    })
    .catch((e) => res.status(400).send(e));
});

router.get("/tablaByRange", function (req, res, next) {
  res.render("rangeForm");
});

router.get("/findAll/json", function (req, res, next) {
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((e) => res.status(400).send(e));
});
router.get("/tablaByRange/result", function (req, res, next) {
  const lower = parseFloat(req.query.lower);
  const higher = parseFloat(req.query.higher);

  // Validate the input
  if (isNaN(lower) || isNaN(higher) || lower > higher) {
    return res.status(400).send("Invalid range provided");
  }

  // Query the database for photos within the range
  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
    where: {
      calificacion: {
        [Op.between]: [lower, higher],
      },
    },
  })
    .then((fotos) => {
      // Render the table view with the filtered data
      res.render("fotos", { title: "Fotos por Rango", fotos });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("An error occurred while fetching data");
    });
});

router.get("/tablaById", function (req, res, next) {
  res.render("idForm");
});
router.get("/tablaById/result", function (req, res, next) {
  const id_foto = parseInt(req.query.id_foto);

  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
    where: {
      [Op.and]: [{ id: id_foto }],
    },
  })
    .then((fotos) => {
      console.log(fotos);
      res.render("fotos", { title: "Fotos Por ID", fotos });
    })
    .catch((e) => res.status(400).send(e));
});
router.get("/findAllByRate/json", function (req, res, next) {
  let lower = parseFloat(req.query.lower);
  let higher = parseFloat(req.query.higher);
  console.log(lower);
  console.log(higher);

  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
    where: {
      calificacion: {
        [Op.between]: [lower, higher],
      },
    },
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((e) => res.status(400).send(e));
});

router.get("/findById/:id/json", function (req, res, next) {
  let id = parseInt(req.params.id);

  Foto.findAll({
    attributes: { exclude: ["updatedAt"] },
    include: [
      {
        model: Etiqueta,
        attributes: ["texto"],
        through: { attributes: [] },
      },
    ],
    where: {
      [Op.and]: [{ id: id }],
    },
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((e) => res.status(400).send(e));
});

router.get("/saveForm", function (req, res, next) {
  res.render("postForm");
});

router.put("/test", function (req, res, next) {
  console.log("PUT /test route hit"); // Debugging
  res.send("PUT /test route works");
});

router.post("/saveForm/result", function (req, res, next) {
  const titulo_foto = req.body.titulo_foto;
  const descripcion_foto = req.body.descripcion_foto;
  const calificacion_foto = parseFloat(req.body.calificacion_foto);
  const ruta_foto = req.body.ruta_foto;

  console.log("Form Data:", {
    titulo_foto,
    descripcion_foto,
    calificacion_foto,
    ruta_foto,
  }); // Debug form data

  Foto.create({
    titulo: titulo_foto,
    descripcion: descripcion_foto,
    calificacion: calificacion_foto,
    ruta: ruta_foto,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((foto) => {
      w;
      console.log("Created Foto:", foto); // Debug created foto
      res.render("success");
    })
    .catch((e) => res.status(400).send(e.message)); // Fix error handling
});

router.get("/updateForm", function (req, res, next) {
  res.render("putForm");
});
router.put("/putJsonByID/:id/json", function (req, res, next) {
  console.log("PUT /updateForm/result route hit"); // Debugging
  console.log("Request Body:", req.body); // Log the request body
  const foto_id = req.body.id_foto;
  const titulo_foto = req.body.titulo_foto;
  const descripcion_foto = req.body.descripcion_foto;
  const calificacion_foto = parseFloat(req.body.calificacion_foto);
  const ruta_foto = req.body.ruta_foto;

  Foto.update(
    {
      titulo: titulo_foto,
      descripcion: descripcion_foto,
      calificacion: calificacion_foto,
      ruta: ruta_foto,
      updatedAt: new Date(),
    },
    {
      where: {
        id: parseInt(foto_id),
      },
    }
  )
    .then((respuesta) => {
      res.render("success"); // Render a success page
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error.message);
    });
});

router.post("/updateForm/result", function (req, res, next) {
  console.log("POST /updateForm/result route hit"); // Debugging
  const foto_id = req.body.id_foto;
  const titulo_foto = req.body.titulo_foto;
  const descripcion_foto = req.body.descripcion_foto;
  const calificacion_foto = parseFloat(req.body.calificacion_foto);
  const ruta_foto = req.body.ruta_foto;

  Foto.update(
    {
      titulo: titulo_foto,
      descripcion: descripcion_foto,
      calificacion: calificacion_foto,
      ruta: ruta_foto,
      updatedAt: new Date(),
    },
    {
      where: {
        id: parseInt(foto_id),
      },
    }
  )
    .then((respuesta) => {
      res.render("success"); // Render a success page
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error.message);
    });
});
/**Post Man */
router.put("/putByID/", function (req, res, next) {
  console.log("Request Body:", req.body);
  const titulo_foto = req.body.titulo_foto;
  const descripcion_foto = req.body.descripcion_foto;
  const calificacion_foto = parseFloat(req.body.calificacion_foto);
  const ruta_foto = req.body.ruta_foto;

  Foto.update(
    {
      titulo: titulo_foto,
      descripcion: descripcion_foto,
      calificacion: calificacion_foto,
      ruta: ruta_foto,
      updatedAt: new Date(),
    },
    {
      where: {
        id: parseInt(foto_id),
      },
    }
  )
    .then((respuesta) => {
      res.json(respuesta);
      res.render("success"); // Render a success page
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send(error.message);
    });
});

router.delete("/delete/:id", function (req, res, next) {
  let id = parseInt(req.params.id);
  Foto.destroy({
    where: {
      id: id,
    },
  })
    .then((respuesta) => {
      res.json(respuesta);
    })
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
