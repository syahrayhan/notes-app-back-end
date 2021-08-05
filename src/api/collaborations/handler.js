class CollaborationsHandler {
  constructor (collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService
    this._notesService = notesService
    this._validator = validator
  }

  async postCollaborationHandler (request, h) {
    try {
      this._validator.validateCollaborationPayload(request.payload)
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        })
        response.code(error.statusCode)
        return response
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}
