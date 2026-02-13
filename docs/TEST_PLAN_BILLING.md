# Plano de Testes — Billing / Assinaturas

Este documento descreve um checklist de testes para validar o fluxo de assinaturas e cobranças.

1) Testes iniciais
- Verificar `GET /api/billing/plans` retorna planos criados.
- Acessar `pages/painel/plans` e validar exibição dos planos.

2) Trial 14 dias
- Criar assinatura via `POST /api/billing/subscribe` para um salão de teste.
- Verificar que `subscriptions` foi criada com `status = 'trialing'` e `trial_end` = hoje + 14 dias.

3) Webhooks
- Simular evento de webhook (POST para `/api/billing/webhook`) com payload contendo provider subscription id e novo status.
- Verificar atualização do registro local `subscriptions`.

4) Add-on (funcionários adicionais)
- Solicitar `POST /api/billing/charge-addon` (se implementado) ou criar manualmente update em `subscriptions.extra_employees`.
- Validar que a lógica que limita a criação de profissionais respeita `plan.max_employees + extra_employees`.

5) Upgrade / Downgrade
- Testar mudança de plano no DB (simular upgrade) e verificar efeitos (limites de funcionários aumentam).

6) Fluxo Asaas (se configurado)
- Criar customer + subscription no Asaas via endpoints.
- Validar criação de cobranças, pagamento por cartão/boleto e webhook de pagamento aprovado.

7) Cenários de erro
- Testar envio de imagens grandes e confirmar que os endpoints retornam mensagens apropriadas (já tratado).
- Testar assinaturas sem ASAAS_API_KEY e garantir mensagens informativas.

