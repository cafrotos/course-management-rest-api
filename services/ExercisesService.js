const
  { exercises, sequelize, attachments } = require('models'),
  createErrors = require('libs/CreateErrors'),
  ExerciseInterface = require('./interfaces/ExerciseInterface'),
  AttachmentsService = require('./AttachmentsService');

async function createExercise(user, classInfo, exercise, files) {
  let transaction = await sequelize.transaction();
  let exerciseParams = { user, classInfo: classInfo.dataValues, files, exercise }
  let exerciseInterface = new ExerciseInterface(exerciseParams);
  let exerciseEntity, results;
  try {
    exerciseEntity = exerciseInterface.getEntity();
    results = await Promise.all([
      exercises.create(exerciseEntity, { transaction }),
      AttachmentsService.saveAttachment(files, exerciseEntity.attachmentBatchId, { transaction, hasAttachment: exerciseInterface.hasAttachment })
    ])
    if (!results) throw createErrors(500, "Data error")
  } catch (error) {
    transaction.rollback();
    throw error;
  }

  transaction.commit();
  let response = results[0];
  response.dataValues.attachments = results[1];
  return response;
}

async function getExercises(classInfo) {
  return await exercises.findAll({
    where: {
      classId: classInfo.dataValues.id
    },
    include: [
      {model: attachments, as: 'attachments'}
    ]
  })
}

async function getExercise(exerciseId) {
  return await exercises.findOne({
    where: {
      id: exerciseId
    },
    include: [
      {model: attachments, as: 'attachments'}
    ]
  })
}

module.exports = {
  createExercise,
  getExercises,
  getExercise
}