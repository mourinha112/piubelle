<template>
  <section class="py-6">
    <div class="container-app">
      <!-- Promo Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lilac-500 via-lilac-600 to-rose-500 p-8 md:p-10">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div class="relative flex flex-col md:flex-row items-center gap-6">
          <!-- Content -->
          <div class="flex-1 text-center md:text-left">
            <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              🎉 Oferta Especial
            </span>
            <h3 class="font-display text-3xl md:text-4xl font-semibold text-white mb-3">
              Primeira visita com <span class="text-rose-200">30% OFF</span>
            </h3>
            <p class="text-white/80 mb-6 max-w-md">
              Use o cupom <strong class="text-white">PIUBELLE30</strong> e ganhe desconto em qualquer serviço do seu primeiro agendamento!
            </p>
            <button class="px-8 py-4 rounded-xl bg-white text-lilac-600 font-semibold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl">
              Resgatar cupom
            </button>
          </div>

          <!-- Illustration -->
          <div class="flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
            <div class="w-full h-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div class="text-center">
                <span class="text-6xl md:text-7xl font-display font-bold text-white">30%</span>
                <p class="text-white/80 text-sm mt-1">de desconto</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-4 mt-8">
        <div class="text-center p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
            <Icon name="lucide:sparkles" class="w-6 h-6 text-lilac-500" />
          </div>
          <p class="text-2xl font-display font-bold text-gray-800">500+</p>
          <p class="text-sm text-gray-500">Salões parceiros</p>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
            <Icon name="lucide:users" class="w-6 h-6 text-rose-500" />
          </div>
          <p class="text-2xl font-display font-bold text-gray-800">10k+</p>
          <p class="text-sm text-gray-500">Clientes felizes</p>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-lilac-100 to-rose-100 flex items-center justify-center">
            <Icon name="lucide:calendar-check" class="w-6 h-6 text-lilac-500" />
          </div>
          <p class="text-2xl font-display font-bold text-gray-800">50k+</p>
          <p class="text-sm text-gray-500">Agendamentos</p>
        </div>
      </div>
    </div>
  </section>
</template>
