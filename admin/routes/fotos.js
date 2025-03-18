var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;
const {Op} = require('sequelize')

router.get('/tabla', function (req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: [
      {
        model: Etiqueta,
        attributes: ['texto'],
        through: { attributes: [] },
      },
    ],
  })
    .then((fotos) => {
        console.log(fotos)
      res.render('fotos', { title: 'Fotos', fotos }); // Pass `title` and `fotos`
    })
    .catch((e) => res.status(400).send(e));
});

router.get('/tablaByRange', function (req, res,next){
  res.render('rangeForm')
})

router.get('/findAll/json', function (req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: [
      {
        model: Etiqueta,
        attributes: ['texto'],
        through: { attributes: [] },
      },
    ],
  })
    .then((fotos) => {
      res.json(fotos);
    })
    .catch((e) => res.status(400).send(e));
});
router.get('/tablaByRange/result', function (req, res, next) {
  const lower = parseFloat(req.query.lower);
  const higher = parseFloat(req.query.higher);

  // Validate the input
  if (isNaN(lower) || isNaN(higher) || lower > higher) {
    return res.status(400).send('Invalid range provided');
  }

  // Query the database for photos within the range
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: [
      {
        model: Etiqueta,
        attributes: ['texto'],
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
      res.render('fotos', { title: 'Fotos por Rango', fotos });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send('An error occurred while fetching data');
    });
});
router.get('/findAllByRate/json', function(req, res, next){
  let lower = parseFloat(req.query.lower);
  let higher = parseFloat(req.query.higher);
  console.log(lower);
  console.log(higher);

  Foto.findAll({
    attributes: { exclude:['updatedAt']},
    include: [{
      model: Etiqueta,
      attributes: ['texto'],
      through: { attributes: [] }
    }],
    where: {
      calificacion: {
        [Op.between]: [lower, higher]
      }
    }
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(e => res.status(400).send(e));
});
module.exports = router;