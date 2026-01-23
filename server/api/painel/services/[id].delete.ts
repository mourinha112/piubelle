const services = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do serviço é obrigatório'
      })
    }

    const service = services.get(id)

    if (!service) {
      throw createError({
        statusCode: 404,
        message: 'Serviço não encontrado'
      })
    }

    services.delete(id)

    return {
      success: true,
      message: 'Serviço removido com sucesso!'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
