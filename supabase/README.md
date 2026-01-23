# PiuBelle - Configuração do Supabase

## 🚀 Passo a Passo COMPLETO

### 1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Aguarde a criação do banco de dados (pode demorar alguns minutos)

### 2. Executar o Schema SQL
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New query**
3. Cole todo o conteúdo do arquivo `schema.sql`
4. Clique em **Run** (ou Ctrl+Enter)

### 3. Criar o Arquivo .env
Na **raiz do projeto** (pasta `piubelle`), crie um arquivo chamado `.env` com o seguinte conteúdo:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
```

**Onde encontrar essas chaves:**
1. No painel do Supabase, vá em **Settings** (engrenagem)
2. Clique em **API**
3. Copie:
   - **Project URL** → Cole em `SUPABASE_URL`
   - **anon public** → Cole em `SUPABASE_ANON_KEY`
   - **service_role** (clique em "Reveal") → Cole em `SUPABASE_SERVICE_ROLE_KEY`

### 4. Criar Usuário Mockup (OPCIONAL - para testar)
Se quiser usar o usuário de teste:

1. Vá em **Authentication** > **Users**
2. Clique em **Add user** > **Create new user**
3. Preencha:
   - **Email**: `admin@mockup.piubelle.com`
   - **Password**: `Mockup@2024`
4. ✅ Marque **Auto Confirm User**
5. Clique em **Create user**
6. **Copie o UUID** do usuário criado

7. Volte ao **SQL Editor** e execute:
```sql
UPDATE public.salons 
SET owner_id = 'COLE-O-UUID-AQUI' 
WHERE slug = 'studio-belle-hair-mockup';
```

### 5. Reiniciar o Servidor
```bash
# Pare o servidor (Ctrl+C)
# E inicie novamente:
npm run dev
```

---

## ⚠️ IMPORTANTE

Sem o arquivo `.env` configurado, o sistema funciona em **modo local** (dados salvos em memória, perdem-se ao reiniciar).

Com o `.env` configurado, todos os dados são salvos no **Supabase** de forma persistente.

---

## 🔐 Credenciais de Teste

### Modo Local (sem Supabase)
| Email | Senha | Tipo |
|-------|-------|------|
| `demo@piubelle.com` | `123456` | Gestor |
| `admin@mockup.piubelle.com` | `Mockup@2024` | Gestor |

### Modo Supabase
Use as credenciais que você criar no Authentication do Supabase.

---

## 📊 O que o SQL cria

- ✅ 27 tabelas (users, salons, services, appointments, etc.)
- ✅ Triggers automáticos
- ✅ Políticas de segurança (RLS)
- ✅ 1 Salão mockup com dados de exemplo
- ✅ 4 Profissionais
- ✅ 17 Serviços
- ✅ 10 Clientes
- ✅ Agendamentos, avaliações, transações...
