'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('foto_etiquetas', {
      fields: ['foto_id'],
      name: 'foto_id_fk',
      type: 'foreign key',
      references: {
      table: 'fotos',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
      });
      await queryInterface.addConstraint('foto_etiquetas', {
      fields: ['etiqueta_id'],
      name: 'etiqueta_id_fk',
      type: 'foreign key',
      references: {
      table: 'etiquetas',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
      });
      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('foto_etiquetas', 'foto_id_fk')
    await queryInterface.removeConstraint('foto_etiquetas', 'etiqueta_id_fk')
      
  }
};
