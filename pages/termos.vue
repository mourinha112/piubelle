<template>
  <div class="min-h-screen py-8">
    <div class="container-app max-w-3xl">
      <!-- Back Button -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-lilac-100 text-gray-600 font-medium hover:border-lilac-200 transition-all shadow-soft mb-6"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Voltar
      </NuxtLink>

      <!-- Header -->
      <div class="mb-10">
        <h1 class="text-3xl md:text-4xl font-display font-semibold text-gray-800">Termos de Uso</h1>
        <p class="text-gray-500 mt-2">Ultima atualizacao: 01 de abril de 2026</p>
      </div>

      <div class="space-y-8">
        <!-- Section 1 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">1. Aceitacao dos Termos</h2>
          <p class="text-gray-600 leading-relaxed">
            Ao acessar ou utilizar a plataforma PiuBelle, voce concorda com estes Termos de Uso. A plataforma PiuBelle e um servico de tecnologia que conecta saloes de beleza, clinicas de estetica e profissionais da area de beleza a clientes que buscam agendar servicos. Se voce nao concordar com qualquer parte destes termos, nao utilize nossos servicos.
          </p>
        </section>

        <!-- Section 2 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">2. Descricao do Servico</h2>
          <p class="text-gray-600 leading-relaxed">
            A PiuBelle disponibiliza uma plataforma digital que permite: (a) saloes de beleza e profissionais gerenciarem seus agendamentos, servicos, equipes e clientes; (b) clientes buscarem, compararem e agendarem servicos de beleza como cortes, coloracao, tratamentos capilares, manicure, pedicure, maquiagem, design de sobrancelhas, depilacao, massagens e outros servicos de beleza e bem-estar; (c) processamento de pagamentos entre clientes e estabelecimentos.
          </p>
        </section>

        <!-- Section 3 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">3. Cadastro e Conta</h2>
          <p class="text-gray-600 leading-relaxed mb-3">
            Para utilizar determinados recursos da plataforma, voce devera criar uma conta fornecendo informacoes precisas e atualizadas. Voce e responsavel por:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Manter a confidencialidade de suas credenciais de acesso</li>
            <li>Todas as atividades realizadas em sua conta</li>
            <li>Notificar imediatamente a PiuBelle sobre qualquer uso nao autorizado</li>
            <li>Fornecer informacoes verdadeiras e completas durante o cadastro</li>
          </ul>
        </section>

        <!-- Section 4 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">4. Obrigacoes dos Saloes e Profissionais</h2>
          <p class="text-gray-600 leading-relaxed mb-3">
            Os saloes de beleza e profissionais cadastrados na plataforma comprometem-se a:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Manter informacoes atualizadas sobre servicos, precos e horarios de funcionamento</li>
            <li>Cumprir os agendamentos confirmados pela plataforma</li>
            <li>Prestar servicos com qualidade e profissionalismo</li>
            <li>Manter as licencas e alvaras necessarios para operacao</li>
            <li>Respeitar o Codigo de Defesa do Consumidor</li>
            <li>Utilizar produtos regularizados pela ANVISA</li>
          </ul>
        </section>

        <!-- Section 5 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">5. Obrigacoes dos Clientes</h2>
          <p class="text-gray-600 leading-relaxed mb-3">
            Os clientes da plataforma comprometem-se a:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Comparecer aos agendamentos no horario marcado</li>
            <li>Cancelar agendamentos com antecedencia minima definida pelo estabelecimento</li>
            <li>Fornecer informacoes relevantes sobre alergias ou condicoes de saude que possam afetar a prestacao do servico</li>
            <li>Realizar pagamentos conforme acordado</li>
            <li>Tratar profissionais e equipe com respeito</li>
          </ul>
        </section>

        <!-- Section 6 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">6. Agendamentos e Cancelamentos</h2>
          <p class="text-gray-600 leading-relaxed">
            Os agendamentos realizados atraves da plataforma estao sujeitos a disponibilidade do profissional e do estabelecimento. Cancelamentos devem respeitar o prazo minimo estabelecido por cada salao. Cancelamentos fora do prazo podem estar sujeitos a cobranca de taxa, conforme politica do estabelecimento. A PiuBelle nao se responsabiliza por cancelamentos realizados pelo estabelecimento, mas trabalhara para facilitar o reagendamento.
          </p>
        </section>

        <!-- Section 7 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">7. Pagamentos</h2>
          <p class="text-gray-600 leading-relaxed">
            A PiuBelle pode intermediar pagamentos entre clientes e estabelecimentos atraves de parceiros de pagamento (como PIX, cartao de credito e debito). Os valores cobrados sao definidos pelos proprios estabelecimentos. A PiuBelle pode cobrar taxas de servico dos estabelecimentos conforme o plano contratado. Depositos antecipados, quando exigidos pelo salao, serao processados de forma segura pela plataforma.
          </p>
        </section>

        <!-- Section 8 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">8. Avaliacoes e Comentarios</h2>
          <p class="text-gray-600 leading-relaxed">
            Os clientes podem avaliar e comentar sobre os servicos recebidos. As avaliacoes devem ser honestas, respeitosas e baseadas em experiencias reais. A PiuBelle reserva-se o direito de remover avaliacoes que contenham conteudo ofensivo, difamatorio, falso ou que violem estes termos. Estabelecimentos podem responder publicamente as avaliacoes de forma profissional.
          </p>
        </section>

        <!-- Section 9 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">9. Propriedade Intelectual</h2>
          <p class="text-gray-600 leading-relaxed">
            Todo o conteudo da plataforma PiuBelle, incluindo mas nao se limitando a textos, graficos, logotipos, icones, imagens, software e compilacao de dados, e de propriedade da PiuBelle ou de seus licenciadores e esta protegido por leis de propriedade intelectual brasileiras e internacionais. E proibida a reproducao, distribuicao ou modificacao de qualquer conteudo sem autorizacao previa por escrito.
          </p>
        </section>

        <!-- Section 10 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">10. Limitacao de Responsabilidade</h2>
          <p class="text-gray-600 leading-relaxed mb-3">
            A PiuBelle atua como intermediaria tecnologica e nao e responsavel por:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>A qualidade dos servicos prestados pelos saloes e profissionais</li>
            <li>Danos decorrentes de servicos de beleza mal executados</li>
            <li>Indisponibilidade temporaria da plataforma por motivos tecnicos</li>
            <li>Disputas entre clientes e estabelecimentos</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-3">
            Em caso de duvidas ou problemas, entre em contato conosco pelo e-mail contato@piubelle.com. Estes termos sao regidos pelas leis da Republica Federativa do Brasil, sendo eleito o foro da comarca de Aracaju/SE para dirimir quaisquer controversias.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
