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
        <h1 class="text-3xl md:text-4xl font-display font-semibold text-gray-800">Politica de Privacidade</h1>
        <p class="text-gray-500 mt-2">Ultima atualizacao: 01 de abril de 2026</p>
      </div>

      <div class="space-y-8">
        <!-- Section 1 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">1. Introducao</h2>
          <p class="text-gray-600 leading-relaxed">
            A PiuBelle respeita a sua privacidade e esta comprometida com a protecao dos seus dados pessoais. Esta Politica de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informacoes pessoais em conformidade com a Lei Geral de Protecao de Dados (LGPD - Lei n. 13.709/2018) e demais legislacoes aplicaveis. Ao utilizar nossa plataforma, voce consente com as praticas descritas nesta politica.
          </p>
        </section>

        <!-- Section 2 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">2. Dados Coletados</h2>
          <p class="text-gray-600 leading-relaxed mb-3">Coletamos os seguintes tipos de dados pessoais:</p>

          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700 mb-1">Dados de Cadastro</h3>
              <p class="text-gray-600 text-sm">Nome completo, e-mail, numero de telefone/WhatsApp, senha (armazenada de forma criptografada) e tipo de perfil (cliente ou gestor de salao).</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 mb-1">Dados de Saloes e Profissionais</h3>
              <p class="text-gray-600 text-sm">Nome do estabelecimento, CNPJ/CPF, endereco, fotos, descricao dos servicos, precos, horarios de funcionamento e dados bancarios para recebimento (PIX).</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 mb-1">Dados de Uso</h3>
              <p class="text-gray-600 text-sm">Historico de agendamentos, avaliacoes, favoritos, preferencias de servicos, dados de navegacao na plataforma e interacoes com saloes.</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-700 mb-1">Dados Tecnicos</h3>
              <p class="text-gray-600 text-sm">Endereco IP, tipo de navegador, sistema operacional, dados de geolocalizacao (quando autorizado) e cookies.</p>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">3. Finalidade do Tratamento</h2>
          <p class="text-gray-600 leading-relaxed mb-3">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Criar e gerenciar sua conta na plataforma</li>
            <li>Conectar clientes a saloes de beleza e profissionais</li>
            <li>Processar agendamentos e pagamentos</li>
            <li>Enviar notificacoes sobre agendamentos, lembretes e confirmacoes</li>
            <li>Exibir avaliacoes e recomendacoes personalizadas</li>
            <li>Melhorar nossos servicos e experiencia do usuario</li>
            <li>Prevenir fraudes e garantir a seguranca da plataforma</li>
            <li>Cumprir obrigacoes legais e regulatorias</li>
            <li>Enviar comunicacoes de marketing (com seu consentimento)</li>
          </ul>
        </section>

        <!-- Section 4 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">4. Base Legal para o Tratamento</h2>
          <p class="text-gray-600 leading-relaxed mb-3">O tratamento dos seus dados pessoais e realizado com base nas seguintes hipoteses legais da LGPD:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Consentimento</strong> (Art. 7, I): para envio de comunicacoes de marketing e coleta de dados de geolocalizacao</li>
            <li><strong>Execucao de contrato</strong> (Art. 7, V): para prestacao dos servicos contratados na plataforma</li>
            <li><strong>Legitimo interesse</strong> (Art. 7, IX): para melhoria dos servicos, prevencao de fraudes e seguranca</li>
            <li><strong>Cumprimento de obrigacao legal</strong> (Art. 7, II): para atender exigencias fiscais e regulatorias</li>
          </ul>
        </section>

        <!-- Section 5 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">5. Compartilhamento de Dados</h2>
          <p class="text-gray-600 leading-relaxed mb-3">Seus dados podem ser compartilhados com:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Saloes e profissionais:</strong> dados necessarios para a prestacao do servico agendado (nome, telefone, historico de agendamentos)</li>
            <li><strong>Processadores de pagamento:</strong> dados financeiros para processamento de transacoes via PIX, cartao de credito ou debito</li>
            <li><strong>Servicos de hospedagem e infraestrutura:</strong> para armazenamento seguro dos dados</li>
            <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-3">
            Nao vendemos, alugamos ou comercializamos seus dados pessoais a terceiros para fins de marketing.
          </p>
        </section>

        <!-- Section 6 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">6. Seus Direitos (LGPD)</h2>
          <p class="text-gray-600 leading-relaxed mb-3">Como titular dos dados, voce tem direito a:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Confirmacao e acesso:</strong> saber se tratamos seus dados e acessar uma copia deles</li>
            <li><strong>Correcao:</strong> solicitar a correcao de dados incompletos, inexatos ou desatualizados</li>
            <li><strong>Anonimizacao ou eliminacao:</strong> solicitar a anonimizacao ou exclusao de dados desnecessarios</li>
            <li><strong>Portabilidade:</strong> solicitar a transferencia de seus dados a outro fornecedor de servico</li>
            <li><strong>Revogacao do consentimento:</strong> revogar consentimento a qualquer momento</li>
            <li><strong>Oposicao:</strong> se opor ao tratamento de dados quando baseado em hipoteses que nao exijam consentimento</li>
            <li><strong>Informacao:</strong> saber com quem compartilhamos seus dados</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-3">
            Para exercer seus direitos, envie um e-mail para <strong class="text-lilac-600">privacidade@piubelle.com</strong>.
          </p>
        </section>

        <!-- Section 7 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">7. Seguranca dos Dados</h2>
          <p class="text-gray-600 leading-relaxed">
            Adotamos medidas tecnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso nao autorizado, perda, destruicao ou alteracao. Isso inclui: criptografia de dados em transito (HTTPS/TLS) e em repouso, senhas armazenadas com hash seguro (bcrypt), controle de acesso baseado em funcoes, backups regulares, monitoramento de seguranca e auditorias periodicas. Em caso de incidente de seguranca que possa gerar risco ou dano relevante, notificaremos voce e a Autoridade Nacional de Protecao de Dados (ANPD) conforme previsto na LGPD.
          </p>
        </section>

        <!-- Section 8 -->
        <section class="p-6 rounded-2xl bg-white border border-lilac-100 shadow-soft">
          <h2 class="text-xl font-display font-semibold text-gray-800 mb-3">8. Retencao e Exclusao de Dados</h2>
          <p class="text-gray-600 leading-relaxed mb-3">
            Seus dados pessoais serao mantidos enquanto sua conta estiver ativa ou conforme necessario para os fins descritos nesta politica. Apos a exclusao da conta:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Dados de perfil serao excluidos em ate 30 dias</li>
            <li>Dados financeiros e fiscais serao retidos por 5 anos conforme legislacao fiscal brasileira</li>
            <li>Avaliacoes podem ser mantidas de forma anonimizada</li>
            <li>Backups serao eliminados no ciclo regular de rotacao (ate 90 dias)</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-4">
            Para solicitar a exclusao de sua conta e dados, acesse as configuracoes do perfil ou envie um e-mail para <strong class="text-lilac-600">privacidade@piubelle.com</strong>.
          </p>

          <div class="mt-6 p-4 rounded-xl bg-gradient-to-r from-lilac-50 to-rose-50 border border-lilac-200">
            <p class="text-sm text-gray-700">
              <strong>Encarregado de Dados (DPO):</strong> Para questoes relacionadas a protecao de dados, entre em contato com nosso Encarregado atraves do e-mail <strong class="text-lilac-600">dpo@piubelle.com</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
