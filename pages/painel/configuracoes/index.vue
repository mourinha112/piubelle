<template>
  <div class="space-y-6">
    <!-- Tabs -->
    <div class="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      <button 
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all text-sm flex items-center gap-2',
          activeTab === tab.id 
            ? 'bg-gradient-to-r from-lilac-500 to-rose-500 text-white shadow-glow' 
            : 'bg-white border border-lilac-100 text-gray-600 hover:border-lilac-200'
        ]"
        @click="activeTab = tab.id"
      >
        <Icon :name="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Informações do Salão -->
    <div v-if="activeTab === 'general'" class="space-y-6">
      <!-- Logo e imagens do salão -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Logo e imagens do salão</h2>
        <p class="text-sm text-gray-500 mb-6">Essas imagens aparecem no marketplace, na página do salão e no Link na Bio.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Logo (foto de perfil) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Logo do salão (foto de perfil)</label>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
              <div class="flex-shrink-0 w-24 h-24 rounded-2xl border-2 border-lilac-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                  v-if="settings.logoUrl" 
                  :src="settings.logoUrl" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-center text-gray-400 text-xs p-2">
                  <Icon name="lucide:image" class="w-8 h-8 mx-auto mb-1 opacity-60" />
                  Sem foto
                </div>
              </div>
              <div class="flex-1 min-w-0 space-y-2">
                <input
                  v-model="settings.logoUrl"
                  type="url"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all text-sm"
                  placeholder="https://exemplo.com/logo.jpg"
                />
                <p class="text-xs text-gray-500">Cole a URL de uma imagem quadrada (recomendado: 200x200px)</p>
                <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lilac-50 text-lilac-700 text-sm font-medium cursor-pointer hover:bg-lilac-100 transition-colors">
                  <Icon name="lucide:upload" class="w-4 h-4" />
                  Escolher arquivo
                  <input
                    type="file"
                    accept="image/*"
                    class="sr-only"
                    @change="onLogoFileChange"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- Foto de capa -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Foto de capa</label>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
              <div class="flex-shrink-0 w-full sm:w-32 h-24 rounded-2xl border-2 border-lilac-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                <img 
                  v-if="settings.coverUrl" 
                  :src="settings.coverUrl" 
                  alt="Capa" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-center text-gray-400 text-xs p-2">
                  <Icon name="lucide:image" class="w-8 h-8 mx-auto mb-1 opacity-60" />
                  Sem foto
                </div>
              </div>
              <div class="flex-1 min-w-0 space-y-2">
                <input
                  v-model="settings.coverUrl"
                  type="url"
                  class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all text-sm"
                  placeholder="https://exemplo.com/capa.jpg"
                />
                <p class="text-xs text-gray-500">URL da imagem de capa (recomendado: 800x400px)</p>
                <label class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lilac-50 text-lilac-700 text-sm font-medium cursor-pointer hover:bg-lilac-100 transition-colors">
                  <Icon name="lucide:upload" class="w-4 h-4" />
                  Escolher arquivo
                  <input
                    type="file"
                    accept="image/*"
                    class="sr-only"
                    @change="onCoverFileChange"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button 
            type="button"
            @click="saveGeneral"
            :disabled="saving"
            class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-glow"
          >
            <Icon v-if="saving" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <Icon v-else name="lucide:save" class="w-5 h-5" />
            Salvar imagens
          </button>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Informações do Salão</h2>
        
        <form @submit.prevent="saveGeneral" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Salão *</label>
              <input
                v-model="settings.name"
                type="text"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
              <div class="flex items-center">
                <span class="px-3 py-3 rounded-l-xl bg-gray-100 border border-r-0 border-lilac-100 text-gray-500 text-sm">
                  piubelle.com/
                </span>
                <input
                  v-model="settings.slug"
                  type="text"
                  class="flex-1 px-4 py-3 rounded-r-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea
              v-model="settings.description"
              rows="3"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all resize-none"
              placeholder="Descreva seu salão de beleza..."
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                v-model="settings.phone"
                type="tel"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                placeholder="(00) 0000-0000"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <input
                v-model="settings.whatsapp"
                type="tel"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                v-model="settings.email"
                type="email"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                placeholder="contato@seusalao.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                v-model="settings.website"
                type="url"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                placeholder="https://seusalao.com"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
              <div class="flex items-center">
                <span class="px-3 py-3 rounded-l-xl bg-gray-100 border border-r-0 border-lilac-100 text-gray-500">
                  <Icon name="mdi:instagram" class="w-5 h-5" />
                </span>
                <input
                  v-model="settings.instagram"
                  type="text"
                  class="flex-1 px-4 py-3 rounded-r-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                  placeholder="@seusalao"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
              <div class="flex items-center">
                <span class="px-3 py-3 rounded-l-xl bg-gray-100 border border-r-0 border-lilac-100 text-gray-500">
                  <Icon name="mdi:facebook" class="w-5 h-5" />
                </span>
                <input
                  v-model="settings.facebook"
                  type="text"
                  class="flex-1 px-4 py-3 rounded-r-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
                  placeholder="facebook.com/seusalao"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3">
            <span v-if="saved" class="text-emerald-600 text-sm font-medium flex items-center gap-1">
              <Icon name="lucide:check-circle" class="w-4 h-4" />
              Salvo com sucesso!
            </span>
            <button 
              type="submit"
              :disabled="saving"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center gap-2 shadow-glow"
            >
              <Icon v-if="saving" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:save" class="w-5 h-5" />
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      <!-- Endereço -->
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Endereço</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Rua/Avenida</label>
            <input
              v-model="settings.addressStreet"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Número</label>
            <input
              v-model="settings.addressNumber"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
            <input
              v-model="settings.addressComplement"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
              placeholder="Sala, Bloco..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
            <input
              v-model="settings.addressNeighborhood"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">CEP</label>
            <input
              v-model="settings.addressZipcode"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
              placeholder="00000-000"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <input
              v-model="settings.addressCity"
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              v-model="settings.addressState"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            >
              <option value="">Selecione</option>
              <option v-for="state in states" :key="state.value" :value="state.value">{{ state.label }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Horário de Funcionamento -->
    <div v-if="activeTab === 'hours'" class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Horário de Funcionamento</h2>
      
      <div class="space-y-4">
        <div 
          v-for="day in workingHours" 
          :key="day.dayOfWeek"
          class="flex items-center gap-4 p-4 rounded-xl bg-gray-50"
        >
          <label class="flex items-center gap-3 w-40">
            <input 
              type="checkbox" 
              v-model="day.isOpen" 
              class="w-5 h-5 rounded border-gray-300 text-lilac-500 focus:ring-lilac-400"
            />
            <span class="font-medium text-gray-700">{{ day.label }}</span>
          </label>

          <div v-if="day.isOpen" class="flex items-center gap-3 flex-1">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Abre:</span>
              <input 
                type="time" 
                v-model="day.openTime"
                class="px-3 py-2 rounded-lg bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none"
              />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Fecha:</span>
              <input 
                type="time" 
                v-model="day.closeTime"
                class="px-3 py-2 rounded-lg bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none"
              />
            </div>
            <div class="flex items-center gap-2 ml-4">
              <label class="flex items-center gap-2 text-sm text-gray-500">
                <input type="checkbox" v-model="day.hasBreak" class="w-4 h-4 rounded border-gray-300 text-lilac-500" />
                Intervalo
              </label>
              <template v-if="day.hasBreak">
                <input 
                  type="time" 
                  v-model="day.breakStart"
                  class="px-3 py-2 rounded-lg bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none"
                />
                <span class="text-gray-400">-</span>
                <input 
                  type="time" 
                  v-model="day.breakEnd"
                  class="px-3 py-2 rounded-lg bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none"
                />
              </template>
            </div>
          </div>
          <span v-else class="text-gray-400 text-sm">Fechado</span>
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all flex items-center gap-2 shadow-glow">
          <Icon name="lucide:save" class="w-5 h-5" />
          Salvar Horários
        </button>
      </div>
    </div>

    <!-- Agendamento -->
    <div v-if="activeTab === 'booking'" class="space-y-6">
      <div class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
        <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Configurações de Agendamento</h2>

        <div class="space-y-6">
          <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <h3 class="font-medium text-gray-800">Confirmação automática</h3>
              <p class="text-sm text-gray-500">Confirmar agendamentos automaticamente</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.autoConfirmBooking" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lilac-500"></div>
            </label>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Antecedência máxima (dias)</label>
              <input
                v-model="settings.bookingAdvanceDays"
                type="number"
                min="1"
                max="90"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">Quantos dias no futuro clientes podem agendar</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cancelamento (horas antes)</label>
              <input
                v-model="settings.bookingCancelHours"
                type="number"
                min="1"
                max="48"
                class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
              />
              <p class="text-xs text-gray-400 mt-1">Tempo mínimo para cancelar sem penalidade</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <h3 class="font-medium text-gray-800">Exigir depósito antecipado</h3>
              <p class="text-sm text-gray-500">Cobrar um valor antecipado para confirmar o agendamento</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.requireDeposit" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lilac-500"></div>
            </label>
          </div>

          <div v-if="settings.requireDeposit">
            <label class="block text-sm font-medium text-gray-700 mb-2">Percentual do depósito (%)</label>
            <input
              v-model="settings.depositPercentage"
              type="number"
              min="1"
              max="100"
              class="w-full px-4 py-3 rounded-xl bg-gray-50 border border-lilac-100 text-gray-800 focus:border-lilac-400 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button class="px-6 py-3 rounded-xl bg-gradient-to-r from-lilac-500 to-rose-500 text-white font-semibold hover:from-lilac-600 hover:to-rose-600 transition-all flex items-center gap-2 shadow-glow">
            <Icon name="lucide:save" class="w-5 h-5" />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>

    <!-- Pagamentos -->
    <div v-if="activeTab === 'payments'" class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Formas de Pagamento</h2>

      <div class="space-y-4">
        <div v-for="method in paymentMethods" :key="method.id" class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="method.bgClass">
              <Icon :name="method.icon" class="w-5 h-5" :class="method.iconClass" />
            </div>
            <span class="font-medium text-gray-700">{{ method.label }}</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="method.enabled" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lilac-500"></div>
          </label>
        </div>
      </div>

      <!-- PIX Config -->
      <div class="mt-6 p-4 rounded-xl bg-lilac-50 border border-lilac-200">
        <h3 class="font-medium text-lilac-700 mb-4">Configuração do PIX</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de chave</label>
            <select class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none transition-all">
              <option value="cpf">CPF</option>
              <option value="cnpj">CNPJ</option>
              <option value="email">E-mail</option>
              <option value="phone">Telefone</option>
              <option value="random">Chave aleatória</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Chave PIX</label>
            <input
              type="text"
              class="w-full px-4 py-3 rounded-xl bg-white border border-lilac-100 text-gray-800 focus:border-lilac-400 outline-none transition-all"
              placeholder="Sua chave PIX"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Notificações -->
    <div v-if="activeTab === 'notifications'" class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
      <h2 class="font-display text-xl font-semibold text-gray-800 mb-6">Notificações</h2>

      <div class="space-y-4">
        <div v-for="notification in notificationSettings" :key="notification.id" class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
          <div>
            <h3 class="font-medium text-gray-800">{{ notification.title }}</h3>
            <p class="text-sm text-gray-500">{{ notification.description }}</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notification.enabled" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lilac-500"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'painel'
})

const { authHeaders } = useAuth()
const currentSalon = inject('currentSalon') as Ref<any>

const activeTab = ref('general')
const saving = ref(false)
const loading = ref(false)
const saved = ref(false)

const tabs = [
  { id: 'general', label: 'Geral', icon: 'lucide:building-2' },
  { id: 'hours', label: 'Horários', icon: 'lucide:clock' },
  { id: 'booking', label: 'Agendamento', icon: 'lucide:calendar' },
  { id: 'payments', label: 'Pagamentos', icon: 'lucide:credit-card' },
  { id: 'notifications', label: 'Notificações', icon: 'lucide:bell' }
]

const settings = ref({
  name: 'Studio Belle Hair',
  slug: 'studio-belle-hair',
  logoUrl: '' as string,
  coverUrl: '' as string,
  description: 'Salão de beleza completo com profissionais especializados em corte, coloração, tratamentos capilares e muito mais.',
  phone: '(79) 3211-0000',
  whatsapp: '(79) 99999-9999',
  email: 'contato@studiobelle.com',
  website: 'https://studiobelle.com',
  instagram: '@studiobellehair',
  facebook: 'studiobellehair',
  addressStreet: 'Av. Beira Mar',
  addressNumber: '1500',
  addressComplement: 'Sala 101',
  addressNeighborhood: 'Centro',
  addressCity: 'Aracaju',
  addressState: 'SE',
  addressZipcode: '49000-000',
  autoConfirmBooking: false,
  bookingAdvanceDays: 30,
  bookingCancelHours: 2,
  requireDeposit: false,
  depositPercentage: 20
})

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const onLogoFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  try {
    settings.value.logoUrl = await readFileAsDataUrl(file)
  } catch (err) {
    console.error(err)
    alert('Erro ao ler a imagem.')
  }
  input.value = ''
}

const onCoverFileChange = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  try {
    settings.value.coverUrl = await readFileAsDataUrl(file)
  } catch (err) {
    console.error(err)
    alert('Erro ao ler a imagem.')
  }
  input.value = ''
}

const workingHours = ref([
  { dayOfWeek: 0, label: 'Domingo', isOpen: false, openTime: '09:00', closeTime: '18:00', hasBreak: false, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 1, label: 'Segunda', isOpen: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 2, label: 'Terça', isOpen: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 3, label: 'Quarta', isOpen: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 4, label: 'Quinta', isOpen: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 5, label: 'Sexta', isOpen: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
  { dayOfWeek: 6, label: 'Sábado', isOpen: true, openTime: '09:00', closeTime: '17:00', hasBreak: false, breakStart: '12:00', breakEnd: '13:00' }
])

const paymentMethods = ref([
  { id: 'cash', label: 'Dinheiro', icon: 'lucide:banknote', bgClass: 'bg-emerald-100', iconClass: 'text-emerald-600', enabled: true },
  { id: 'pix', label: 'PIX', icon: 'lucide:qr-code', bgClass: 'bg-cyan-100', iconClass: 'text-cyan-600', enabled: true },
  { id: 'credit_card', label: 'Cartão de Crédito', icon: 'lucide:credit-card', bgClass: 'bg-blue-100', iconClass: 'text-blue-600', enabled: true },
  { id: 'debit_card', label: 'Cartão de Débito', icon: 'lucide:wallet', bgClass: 'bg-indigo-100', iconClass: 'text-indigo-600', enabled: true },
  { id: 'transfer', label: 'Transferência', icon: 'lucide:arrow-right-left', bgClass: 'bg-purple-100', iconClass: 'text-purple-600', enabled: false }
])

const notificationSettings = ref([
  { id: 'new_appointment', title: 'Novo agendamento', description: 'Receber notificação quando um cliente agendar', enabled: true },
  { id: 'appointment_cancelled', title: 'Agendamento cancelado', description: 'Receber notificação quando um agendamento for cancelado', enabled: true },
  { id: 'new_review', title: 'Nova avaliação', description: 'Receber notificação quando receber uma nova avaliação', enabled: true },
  { id: 'appointment_reminder', title: 'Lembrete de agendamento', description: 'Enviar lembrete aos clientes antes do horário', enabled: true },
  { id: 'daily_report', title: 'Relatório diário', description: 'Receber resumo do dia por e-mail', enabled: false }
])

const states = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
]

const saveGeneral = async () => {
  if (!currentSalon.value?.id) return
  
  saving.value = true
  saved.value = false
  
  try {
    await $fetch(`/api/painel/salon/${currentSalon.value.id}`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: {
        name: settings.value.name,
        slug: settings.value.slug,
        logoUrl: settings.value.logoUrl || undefined,
        coverUrl: settings.value.coverUrl || undefined,
        description: settings.value.description,
        phone: settings.value.phone,
        whatsapp: settings.value.whatsapp,
        email: settings.value.email,
        website: settings.value.website,
        instagram: settings.value.instagram,
        facebook: settings.value.facebook,
        addressStreet: settings.value.addressStreet,
        addressNumber: settings.value.addressNumber,
        addressComplement: settings.value.addressComplement,
        addressNeighborhood: settings.value.addressNeighborhood,
        addressCity: settings.value.addressCity,
        addressState: settings.value.addressState,
        addressZipcode: settings.value.addressZipcode,
        autoConfirmBooking: settings.value.autoConfirmBooking,
        bookingAdvanceDays: settings.value.bookingAdvanceDays,
        bookingCancelHours: settings.value.bookingCancelHours,
        requireDeposit: settings.value.requireDeposit,
        depositPercentage: settings.value.depositPercentage
      }
    })
    
    // Update currentSalon with new data
    if (currentSalon.value) {
      currentSalon.value.name = settings.value.name
      currentSalon.value.slug = settings.value.slug
      currentSalon.value.logo_url = settings.value.logoUrl
      currentSalon.value.logoUrl = settings.value.logoUrl
      currentSalon.value.cover_url = settings.value.coverUrl
      currentSalon.value.coverUrl = settings.value.coverUrl
    }
    
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  } catch (error) {
    console.error('Erro ao salvar configurações:', error)
    alert('Erro ao salvar configurações')
  } finally {
    saving.value = false
  }
}

// Load current salon data into settings
const loadSalonSettings = () => {
  if (!currentSalon.value) return
  
  const s = currentSalon.value
  settings.value = {
    name: s.name || '',
    slug: s.slug || '',
    logoUrl: s.logo_url ?? s.logoUrl ?? '',
    coverUrl: s.cover_url ?? s.coverUrl ?? '',
    description: s.description || '',
    phone: s.phone || '',
    whatsapp: s.whatsapp || '',
    email: s.email || '',
    website: s.website || '',
    instagram: s.instagram || '',
    facebook: s.facebook || '',
    addressStreet: s.address_street || s.addressStreet || '',
    addressNumber: s.address_number || s.addressNumber || '',
    addressComplement: s.address_complement || s.addressComplement || '',
    addressNeighborhood: s.address_neighborhood || s.addressNeighborhood || '',
    addressCity: s.address_city || s.addressCity || '',
    addressState: s.address_state || s.addressState || '',
    addressZipcode: s.address_zipcode || s.addressZipcode || '',
    autoConfirmBooking: s.auto_confirm_booking ?? s.autoConfirmBooking ?? false,
    bookingAdvanceDays: s.booking_advance_days ?? s.bookingAdvanceDays ?? 30,
    bookingCancelHours: s.booking_cancel_hours ?? s.bookingCancelHours ?? 2,
    requireDeposit: s.require_deposit ?? s.requireDeposit ?? false,
    depositPercentage: s.deposit_percentage ?? s.depositPercentage ?? 20
  }
}

// Watch for salon changes
watch(() => currentSalon.value?.id, () => {
  loadSalonSettings()
}, { immediate: true })

onMounted(() => {
  loadSalonSettings()
})
</script>
