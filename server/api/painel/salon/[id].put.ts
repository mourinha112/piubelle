// Importar salões (em produção viria do banco)
const salons = new Map<string, any>()

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID do salão é obrigatório'
      })
    }

    const salon = salons.get(id)

    if (!salon) {
      throw createError({
        statusCode: 404,
        message: 'Salão não encontrado'
      })
    }

    // Atualizar campos
    const updatedSalon = {
      ...salon,
      ...body,
      id: salon.id, // Não permitir alterar ID
      ownerId: salon.ownerId, // Não permitir alterar dono
      updatedAt: new Date().toISOString()
    }

    salons.set(id, updatedSalon)

    return {
      success: true,
      message: 'Salão atualizado com sucesso!',
      data: updatedSalon
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erro interno do servidor'
    })
  }
})
