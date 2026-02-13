# Integração Asaas (configuração rápida)

Este documento descreve os passos básicos para configurar a integração do PiuBelle com o Asaas.

1) Criar conta Asaas
- Acesse https://www.asaas.com/ e crie sua conta (crie conta de testes/sandbox se disponível).

2) Obter API Key
- No painel Asaas, localize a seção de API / integrações e copie a chave de API (access_token).
- Copie essa chave para o arquivo `.env` do projeto:

```
ASAAS_API_KEY=sk_test_xxx
```

3) Webhooks
- Configure um webhook no painel Asaas apontando para: `https://SEU-DOMINIO/api/billing/webhook`
- Garanta que seu servidor aceite requisições POST públicas (no dev, use ngrok para testar).

4) Testes
- Use as rotas de teste adicionadas em `server/api/billing/*`:
  - `GET /api/billing/plans` — lista planos do banco
  - `POST /api/billing/subscribe` — cria um registro local de assinatura (trial 14 dias) e tenta criar na Asaas se a chave estiver configurada
  - `POST /api/billing/customers` — cria cliente no Asaas (usado internamente)
  - `POST /api/billing/webhook` — webhook para receber eventos

5) Observações
- Dependendo das políticas do Asaas, endpoints e campos podem variar. Se houver erro 401/403, verifique `ASAAS_API_KEY`.
- Para pagamentos com cartão, siga o fluxo de tokenização/recomendação oficial do Asaas para não trafegar dados sensíveis pelo servidor.

