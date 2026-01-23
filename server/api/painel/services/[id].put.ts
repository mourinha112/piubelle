const services = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

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

    const updatedService = {
      ...service,
      ...body,
      id: service.id,
      salonId: service.salonId,
      updatedAt: new Date().toISOString()
    }

    services.set(id, updatedService)

    return {
      success: true,
      message: 'Serviço atualizado com sucesso!',
      data: updatedService
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
