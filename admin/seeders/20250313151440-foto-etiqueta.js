'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let [fotos] = await queryInterface.sequelize.query('SELECT id FROM fotos');
    let [etiquetas] = await queryInterface.sequelize.query('SELECT id FROM etiquetas');

    if (fotos.length === 0 || etiquetas.length === 0) {
      return;
    }

    let fotoEtiquetas = [];

    fotos.forEach(foto => {
      let numEtiquetas = Math.floor(Math.random() * 3) + 1; // 1 to 3 etiquetas
      let etiquetasSeleccionadas = etiquetas
        .sort(() => Math.random() - 0.5) // Shuffle etiquetas array
        .slice(0, numEtiquetas); // Pick first `numEtiquetas` elements

      etiquetasSeleccionadas.forEach(etiqueta => {
        fotoEtiquetas.push({
          foto_id: foto.id,
          etiqueta_id: etiqueta.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });

    await queryInterface.bulkInsert('foto_etiquetas', fotoEtiquetas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foto_etiquetas', null, {});
  }
};
