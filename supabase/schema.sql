-- =====================================================
-- PIUBELLE - Schema Completo para Supabase
-- Sistema de Gestão para Instituto de Beleza
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELAS PRINCIPAIS
-- =====================================================

-- Tabela de Usuários (complementa auth.users do Supabase)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'manager', 'professional', 'client')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Salões
CREATE TABLE IF NOT EXISTS public.salons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  
  -- Endereço
  address_street TEXT,
  address_number TEXT,
  address_complement TEXT,
  address_neighborhood TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zipcode TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Configurações
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  currency TEXT DEFAULT 'BRL',
  booking_advance_days INTEGER DEFAULT 30,
  booking_cancel_hours INTEGER DEFAULT 2,
  auto_confirm_booking BOOLEAN DEFAULT false,
  require_deposit BOOLEAN DEFAULT false,
  deposit_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PLANS / SUBSCRIPTIONS / ADDONS (Billing)
-- =====================================================

-- Plans table: defines available subscription plans
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL, -- eg: 'profissional', 'pro'
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL, -- price in cents (e.g. 9990)
  currency TEXT NOT NULL DEFAULT 'BRL',
  billing_interval TEXT NOT NULL DEFAULT 'monthly', -- monthly, yearly
  max_employees INTEGER, -- maximum number of employees included
  features JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table: maps a salon to an active subscription
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES public.plans(id) ON DELETE SET NULL,
  provider_subscription_id TEXT, -- external provider id (Asaas)
  status TEXT NOT NULL DEFAULT 'active', -- active, past_due, cancelled, trialing
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  extra_employees INTEGER DEFAULT 0, -- count of additional employees purchased
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plan addons: pricing for extras like additional employees
CREATE TABLE IF NOT EXISTS public.plan_addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES public.plans(id) ON DELETE CASCADE,
  addon_key TEXT NOT NULL, -- ex: 'extra_employee'
  price_cents INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Horários de funcionamento
CREATE TABLE IF NOT EXISTS public.salon_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profissionais
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  specialties TEXT[],
  commission_percentage DECIMAL(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categorias de Serviços
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Serviços
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL DEFAULT 30, -- minutos
  price DECIMAL(10,2) NOT NULL,
  promotional_price DECIMAL(10,2),
  icon TEXT,
  color TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  requires_deposit BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Relação Profissional-Serviço
CREATE TABLE IF NOT EXISTS public.professional_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  custom_price DECIMAL(10,2),
  custom_duration INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(professional_id, service_id)
);

-- Clientes do Salão
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  cpf TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('female', 'male', 'other', 'not_informed')),
  avatar_url TEXT,
  notes TEXT,
  tags TEXT[],
  loyalty_points INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  visit_count INTEGER DEFAULT 0,
  last_visit_at TIMESTAMPTZ,
  is_vip BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agendamentos
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  
  price DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  final_price DECIMAL(10,2) NOT NULL,
  
  notes TEXT,
  internal_notes TEXT,
  cancellation_reason TEXT,
  
  confirmed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  reminder_sent BOOLEAN DEFAULT false,
  confirmation_sent BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fila Virtual
CREATE TABLE IF NOT EXISTS public.queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  
  client_name TEXT NOT NULL,
  client_phone TEXT,
  
  position INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'called', 'in_service', 'completed', 'cancelled', 'no_show')),
  
  estimated_wait INTEGER, -- minutos
  called_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transações Financeiras
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  description TEXT,
  
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('cash', 'credit_card', 'debit_card', 'pix', 'transfer', 'other')),
  
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  is_paid BOOLEAN DEFAULT true,
  paid_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Avaliações
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  
  is_public BOOLEAN DEFAULT true,
  owner_response TEXT,
  responded_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link Bio - Links personalizados
CREATE TABLE IF NOT EXISTS public.link_bio_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notificações
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  salon_id UUID REFERENCES public.salons(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB,
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ÍNDICES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_salons_slug ON public.salons(slug);
CREATE INDEX IF NOT EXISTS idx_salons_owner ON public.salons(owner_id);
CREATE INDEX IF NOT EXISTS idx_salons_active ON public.salons(is_active);

CREATE INDEX IF NOT EXISTS idx_professionals_salon ON public.professionals(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_salon ON public.services(salon_id);
CREATE INDEX IF NOT EXISTS idx_clients_salon ON public.clients(salon_id);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON public.clients(phone);

CREATE INDEX IF NOT EXISTS idx_appointments_salon ON public.appointments(salon_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_client ON public.appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_professional ON public.appointments(professional_id);

CREATE INDEX IF NOT EXISTS idx_transactions_salon ON public.transactions(salon_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);

CREATE INDEX IF NOT EXISTS idx_reviews_salon ON public.reviews(salon_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas com updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN 
    SELECT table_name 
    FROM information_schema.columns 
    WHERE column_name = 'updated_at' 
    AND table_schema = 'public'
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS update_%I_updated_at ON public.%I;
      CREATE TRIGGER update_%I_updated_at
        BEFORE UPDATE ON public.%I
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', t, t, t, t);
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para salões (público pode ver salões ativos)
CREATE POLICY "Anyone can view active salons" ON public.salons
  FOR SELECT USING (is_active = true);

CREATE POLICY "Owners can manage their salons" ON public.salons
  FOR ALL USING (auth.uid() = owner_id);

-- Políticas para serviços (público pode ver)
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);

-- Políticas para profissionais (público pode ver ativos)
CREATE POLICY "Anyone can view active professionals" ON public.professionals
  FOR SELECT USING (is_active = true);

-- Políticas para avaliações (público pode ver públicas)
CREATE POLICY "Anyone can view public reviews" ON public.reviews
  FOR SELECT USING (is_public = true);

-- =====================================================
-- TRIGGER PARA CRIAR USUÁRIO AUTOMATICAMENTE
-- =====================================================

-- Quando um usuário é criado no Supabase Auth, copia para public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    true
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.users.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que dispara quando usuário é criado no auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- DADOS DE EXEMPLO - SALÃO MOCKUP
-- =====================================================

-- ⚠️ PASSO 1: Primeiro crie o usuário no Supabase Auth:
-- 
--    Vá em Authentication > Users > Add User
--    📧 Email: admin@mockup.piubelle.com
--    🔑 Senha: Mockup@2024
--    ✅ Marque "Auto Confirm User"
--
-- ⚠️ PASSO 2: Depois de criar, copie o UUID e substitua abaixo:
--    UPDATE public.salons SET owner_id = 'SEU-UUID-AQUI' WHERE slug = 'studio-belle-hair-mockup';

-- Salão Mockup (owner_id será atualizado depois de criar o usuário no Auth)
INSERT INTO public.salons (
  id,
  name,
  slug,
  description,
  logo_url,
  cover_url,
  phone,
  whatsapp,
  email,
  instagram,
  address_street,
  address_number,
  address_neighborhood,
  address_city,
  address_state,
  address_zipcode,
  latitude,
  longitude,
  is_active,
  is_featured,
  rating,
  review_count
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Studio Belle Hair [MOCKUP]',
  'studio-belle-hair-mockup',
  'Salão de beleza completo especializado em cortes modernos, coloração, tratamentos capilares, manicure, pedicure e design de sobrancelhas. Ambiente aconchegante e profissionais qualificados para realçar sua beleza.',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&h=400&fit=crop',
  '(79) 3333-4444',
  '(79) 99999-8888',
  'contato@studiobellehair.com.br',
  '@studiobellehair',
  'Av. Beira Mar',
  '1500',
  'Atalaia',
  'Aracaju',
  'SE',
  '49035-000',
  -10.9472,
  -37.0731,
  true,
  true,
  4.8,
  127
);

-- Horários de funcionamento
INSERT INTO public.salon_hours (salon_id, day_of_week, open_time, close_time, is_closed) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 0, NULL, NULL, true), -- Domingo fechado
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, '09:00', '19:00', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, '09:00', '19:00', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, '09:00', '19:00', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, '09:00', '19:00', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, '09:00', '19:00', false),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, '09:00', '17:00', false); -- Sábado

-- =====================================================
-- SEED: Plans & Addons
-- =====================================================
-- Plans (prices in cents)
INSERT INTO public.plans (id, key, name, price_cents, currency, billing_interval, max_employees, features) VALUES
  ('70000001-0001-0001-0001-000000000000', 'free', 'Gratuito', 0, 'BRL', 'monthly', 1, '{"description":"Plano Gratuito - recursos básicos"}'),
  ('70000001-0001-0001-0001-000000000001', 'profissional', 'Profissional', 9990, 'BRL', 'monthly', 2, '{"description":"Plano Profissional - recursos básicos"}'),
  ('70000001-0001-0001-0001-000000000002', 'pro', 'Pro', 19990, 'BRL', 'monthly', 5, '{"description":"Plano Pro - todas as funções"}');

-- Add-on: extra employee
INSERT INTO public.plan_addons (id, plan_id, addon_key, price_cents, description) VALUES
  ('71000001-0001-0001-0001-000000000001', '70000001-0001-0001-0001-000000000001', 'extra_employee', 2990, 'Funcionário adicional por mês'),
  ('71000001-0001-0001-0001-000000000002', '70000001-0001-0001-0001-000000000002', 'extra_employee', 2990, 'Funcionário adicional por mês');


-- Categorias de Serviços
INSERT INTO public.service_categories (id, salon_id, name, icon, color, sort_order) VALUES
('20000001-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Cabelo', 'lucide:scissors', '#8b5cf6', 1),
('20000001-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Unhas', 'lucide:hand', '#ec4899', 2),
('20000001-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Maquiagem', 'lucide:palette', '#f59e0b', 3),
('20000001-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Estética', 'lucide:sparkles', '#06b6d4', 4),
('20000001-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sobrancelha', 'lucide:eye', '#84cc16', 5);

-- Profissionais
INSERT INTO public.professionals (id, salon_id, name, email, phone, avatar_url, bio, specialties, commission_percentage, rating, review_count) VALUES
('10000001-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Ana Paula', 'ana@studiobelle.com', '(79) 99999-1111', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 'Especialista em coloração e mechas. 10 anos de experiência.', ARRAY['Coloração', 'Mechas', 'Corte'], 40.00, 4.9, 89),
('10000001-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Maria Clara', 'maria@studiobelle.com', '(79) 99999-2222', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', 'Nail designer premiada. Especialista em unhas de gel.', ARRAY['Manicure', 'Pedicure', 'Unhas de Gel'], 35.00, 4.8, 76),
('10000001-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Júlia Santos', 'julia@studiobelle.com', '(79) 99999-3333', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', 'Maquiadora profissional para eventos e noivas.', ARRAY['Maquiagem', 'Design de Sobrancelhas'], 45.00, 4.7, 52),
('10000001-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Carla Oliveira', 'carla@studiobelle.com', '(79) 99999-4444', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', 'Esteticista facial e corporal. Tratamentos de pele.', ARRAY['Limpeza de Pele', 'Massagem', 'Tratamentos Faciais'], 40.00, 4.9, 68);

-- Serviços
INSERT INTO public.services (id, salon_id, category_id, name, description, duration, price, icon, color, is_featured) VALUES
-- Cabelo
('30000001-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Corte Feminino', 'Corte moderno com lavagem e finalização', 45, 80.00, 'lucide:scissors', '#8b5cf6', true),
('30000001-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Escova', 'Escova modeladora com produtos profissionais', 40, 50.00, 'lucide:wind', '#8b5cf6', false),
('30000001-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Coloração', 'Coloração completa com produtos importados', 120, 180.00, 'lucide:palette', '#8b5cf6', true),
('30000001-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Mechas', 'Mechas e luzes com técnica balayage', 150, 250.00, 'lucide:sun', '#8b5cf6', true),
('30000001-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Hidratação', 'Tratamento intensivo de hidratação', 60, 90.00, 'lucide:droplets', '#8b5cf6', false),
('30000001-0001-0001-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000001', 'Progressiva', 'Escova progressiva sem formol', 180, 350.00, 'lucide:waves', '#8b5cf6', false),
-- Unhas
('30000001-0001-0001-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000002', 'Manicure', 'Manicure completa com esmaltação', 45, 35.00, 'lucide:hand', '#ec4899', true),
('30000001-0001-0001-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000002', 'Pedicure', 'Pedicure completa com hidratação', 50, 45.00, 'lucide:footprints', '#ec4899', true),
('30000001-0001-0001-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000002', 'Unhas de Gel', 'Alongamento em gel com design', 90, 150.00, 'lucide:sparkles', '#ec4899', true),
('30000001-0001-0001-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000002', 'Nail Art', 'Decoração artística nas unhas', 30, 25.00, 'lucide:brush', '#ec4899', false),
-- Maquiagem
('30000001-0001-0001-0001-000000000011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000003', 'Maquiagem Social', 'Maquiagem para eventos e festas', 60, 120.00, 'lucide:palette', '#f59e0b', true),
('30000001-0001-0001-0001-000000000012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000003', 'Maquiagem Noiva', 'Maquiagem completa para noivas', 90, 300.00, 'lucide:heart', '#f59e0b', true),
-- Estética
('30000001-0001-0001-0001-000000000013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000004', 'Limpeza de Pele', 'Limpeza profunda com extração', 75, 150.00, 'lucide:sparkles', '#06b6d4', true),
('30000001-0001-0001-0001-000000000014', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000004', 'Peeling', 'Peeling químico renovador', 45, 180.00, 'lucide:refresh-cw', '#06b6d4', false),
('30000001-0001-0001-0001-000000000015', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000004', 'Massagem Relaxante', 'Massagem corporal relaxante', 60, 120.00, 'lucide:flower-2', '#06b6d4', false),
-- Sobrancelha
('30000001-0001-0001-0001-000000000016', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000005', 'Design de Sobrancelha', 'Design com pinça e henna', 30, 45.00, 'lucide:eye', '#84cc16', true),
('30000001-0001-0001-0001-000000000017', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '20000001-0001-0001-0001-000000000005', 'Micropigmentação', 'Micropigmentação fio a fio', 120, 450.00, 'lucide:pen-tool', '#84cc16', true);

-- Relação Profissional-Serviço
INSERT INTO public.professional_services (professional_id, service_id) VALUES
-- Ana (Cabelo)
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000001'),
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000002'),
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000003'),
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000004'),
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000005'),
('10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000006'),
-- Maria (Unhas)
('10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000007'),
('10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000008'),
('10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000009'),
('10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000010'),
-- Júlia (Maquiagem e Sobrancelha)
('10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000011'),
('10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000012'),
('10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000016'),
('10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000017'),
-- Carla (Estética)
('10000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000013'),
('10000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000014'),
('10000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000015');

-- Clientes
INSERT INTO public.clients (id, salon_id, name, email, phone, gender, loyalty_points, total_spent, visit_count, is_vip, last_visit_at) VALUES
('40000001-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Fernanda Costa', 'fernanda@email.com', '(79) 99888-1111', 'female', 250, 1580.00, 18, true, NOW() - INTERVAL '2 days'),
('40000001-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Patrícia Lima', 'patricia@email.com', '(79) 99888-2222', 'female', 180, 980.00, 12, false, NOW() - INTERVAL '5 days'),
('40000001-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Camila Souza', 'camila@email.com', '(79) 99888-3333', 'female', 320, 2150.00, 24, true, NOW() - INTERVAL '1 day'),
('40000001-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amanda Silva', 'amanda@email.com', '(79) 99888-4444', 'female', 90, 450.00, 6, false, NOW() - INTERVAL '10 days'),
('40000001-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Juliana Alves', 'juliana@email.com', '(79) 99888-5555', 'female', 150, 780.00, 9, false, NOW() - INTERVAL '3 days'),
('40000001-0001-0001-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Beatriz Santos', 'beatriz@email.com', '(79) 99888-6666', 'female', 420, 3200.00, 32, true, NOW()),
('40000001-0001-0001-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Larissa Mendes', 'larissa@email.com', '(79) 99888-7777', 'female', 85, 380.00, 5, false, NOW() - INTERVAL '7 days'),
('40000001-0001-0001-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Gabriela Rocha', 'gabriela@email.com', '(79) 99888-8888', 'female', 200, 1100.00, 14, false, NOW() - INTERVAL '4 days'),
('40000001-0001-0001-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Mariana Dias', 'mariana@email.com', '(79) 99888-9999', 'female', 110, 620.00, 8, false, NOW() - INTERVAL '6 days'),
('40000001-0001-0001-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Carolina Martins', 'carolina@email.com', '(79) 99777-0000', 'female', 280, 1890.00, 20, true, NOW() - INTERVAL '1 day');

-- Agendamentos de Hoje
INSERT INTO public.appointments (id, salon_id, client_id, professional_id, service_id, date, start_time, end_time, status, price, discount, final_price, notes) VALUES
('50000001-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000001', '10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000001', CURRENT_DATE, '09:00', '09:45', 'completed', 80.00, 0, 80.00, NULL),
('50000001-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000003', '10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000007', CURRENT_DATE, '09:30', '10:15', 'completed', 35.00, 0, 35.00, NULL),
('50000001-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000006', '10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000003', CURRENT_DATE, '10:00', '12:00', 'in_progress', 180.00, 0, 180.00, 'Retoque de raiz'),
('50000001-0001-0001-0001-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000002', '10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000016', CURRENT_DATE, '10:30', '11:00', 'confirmed', 45.00, 0, 45.00, NULL),
('50000001-0001-0001-0001-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000005', '10000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000013', CURRENT_DATE, '11:00', '12:15', 'confirmed', 150.00, 0, 150.00, 'Primeira sessão'),
('50000001-0001-0001-0001-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000008', '10000001-0001-0001-0001-000000000002', '30000001-0001-0001-0001-000000000009', CURRENT_DATE, '14:00', '15:30', 'pending', 150.00, 0, 150.00, 'Alongamento em gel'),
('50000001-0001-0001-0001-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000004', '10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000002', CURRENT_DATE, '14:30', '15:10', 'pending', 50.00, 0, 50.00, NULL),
('50000001-0001-0001-0001-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000010', '10000001-0001-0001-0001-000000000003', '30000001-0001-0001-0001-000000000011', CURRENT_DATE, '15:00', '16:00', 'confirmed', 120.00, 0, 120.00, 'Festa de aniversário'),
('50000001-0001-0001-0001-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000007', '10000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000015', CURRENT_DATE, '16:00', '17:00', 'pending', 120.00, 0, 120.00, NULL),
('50000001-0001-0001-0001-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000009', '10000001-0001-0001-0001-000000000001', '30000001-0001-0001-0001-000000000005', CURRENT_DATE, '17:00', '18:00', 'confirmed', 90.00, 0, 90.00, 'Hidratação profunda');

-- Agendamentos dos últimos 30 dias (para estatísticas)
INSERT INTO public.appointments (salon_id, client_id, professional_id, service_id, date, start_time, end_time, status, price, discount, final_price, completed_at) 
SELECT 
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890'::uuid,
  (ARRAY['40000001-0001-0001-0001-000000000001','40000001-0001-0001-0001-000000000002','40000001-0001-0001-0001-000000000003','40000001-0001-0001-0001-000000000004','40000001-0001-0001-0001-000000000005','40000001-0001-0001-0001-000000000006','40000001-0001-0001-0001-000000000007','40000001-0001-0001-0001-000000000008','40000001-0001-0001-0001-000000000009','40000001-0001-0001-0001-000000000010'])[1 + (random() * 9)::int]::uuid,
  (ARRAY['10000001-0001-0001-0001-000000000001','10000001-0001-0001-0001-000000000002','10000001-0001-0001-0001-000000000003','10000001-0001-0001-0001-000000000004'])[1 + (random() * 3)::int]::uuid,
  (ARRAY['30000001-0001-0001-0001-000000000001','30000001-0001-0001-0001-000000000002','30000001-0001-0001-0001-000000000003','30000001-0001-0001-0001-000000000004','30000001-0001-0001-0001-000000000005','30000001-0001-0001-0001-000000000006','30000001-0001-0001-0001-000000000007','30000001-0001-0001-0001-000000000008','30000001-0001-0001-0001-000000000009'])[1 + (random() * 8)::int]::uuid,
  CURRENT_DATE - (i || ' days')::interval,
  '10:00'::time,
  '11:00'::time,
  'completed',
  (50 + random() * 200)::decimal(10,2),
  0,
  (50 + random() * 200)::decimal(10,2),
  (CURRENT_DATE - (i || ' days')::interval)::timestamptz
FROM generate_series(1, 30) AS i;

-- Transações (receitas do mês)
INSERT INTO public.transactions (salon_id, appointment_id, client_id, professional_id, type, category, description, amount, payment_method, date, is_paid, paid_at)
SELECT 
  a.salon_id,
  a.id,
  a.client_id,
  a.professional_id,
  'income',
  'Serviço',
  'Pagamento de serviço',
  a.final_price,
  CASE (random() * 3)::int 
    WHEN 0 THEN 'pix'
    WHEN 1 THEN 'credit_card'
    WHEN 2 THEN 'debit_card'
    ELSE 'cash'
  END,
  a.date,
  true,
  a.completed_at
FROM public.appointments a
WHERE a.status = 'completed';

-- Algumas despesas do mês
INSERT INTO public.transactions (salon_id, type, category, description, amount, payment_method, date, is_paid) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'expense', 'Produtos', 'Compra de produtos de coloração', 850.00, 'pix', CURRENT_DATE - INTERVAL '5 days', true),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'expense', 'Aluguel', 'Aluguel do mês', 2500.00, 'transfer', CURRENT_DATE - INTERVAL '10 days', true),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'expense', 'Água/Luz', 'Conta de energia', 380.00, 'pix', CURRENT_DATE - INTERVAL '8 days', true),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'expense', 'Produtos', 'Esmaltes e materiais de manicure', 420.00, 'credit_card', CURRENT_DATE - INTERVAL '3 days', true),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'expense', 'Marketing', 'Impulsionamento Instagram', 150.00, 'credit_card', CURRENT_DATE - INTERVAL '7 days', true);

-- Avaliações
INSERT INTO public.reviews (salon_id, client_id, professional_id, rating, comment, is_public, created_at) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000001', '10000001-0001-0001-0001-000000000001', 5, 'Amei o corte! Ana é uma profissional incrível, super atenciosa e o resultado ficou melhor do que eu esperava. Recomendo demais! 💜', true, NOW() - INTERVAL '2 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000003', '10000001-0001-0001-0001-000000000002', 5, 'Minhas unhas ficaram perfeitas! A Maria é muito cuidadosa e caprichosa. Sempre saio feliz daqui.', true, NOW() - INTERVAL '5 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000006', '10000001-0001-0001-0001-000000000001', 5, 'Melhor salão de Aracaju! A coloração ficou exatamente como eu queria. Ambiente super agradável.', true, NOW() - INTERVAL '1 day'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000002', '10000001-0001-0001-0001-000000000003', 4, 'Gostei muito do design de sobrancelha, ficou bem natural. O ambiente é muito bonito também!', true, NOW() - INTERVAL '10 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000005', '10000001-0001-0001-0001-000000000004', 5, 'A limpeza de pele foi maravilhosa! Minha pele está radiante. Carla é uma excelente profissional.', true, NOW() - INTERVAL '3 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000008', '10000001-0001-0001-0001-000000000002', 5, 'As unhas de gel ficaram lindas! Durou mais de 3 semanas sem descolar. Melhor nail designer!', true, NOW() - INTERVAL '7 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000010', '10000001-0001-0001-0001-000000000003', 5, 'A maquiagem para meu casamento ficou perfeita! Júlia é uma artista. Chorei de emoção!', true, NOW() - INTERVAL '15 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000004', '10000001-0001-0001-0001-000000000001', 4, 'Bom atendimento, corte ficou bonito. Só achei um pouco de espera, mas valeu a pena.', true, NOW() - INTERVAL '12 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000007', '10000001-0001-0001-0001-000000000004', 5, 'A massagem relaxante foi incrível! Saí renovada. Ambiente muito tranquilo e aconchegante.', true, NOW() - INTERVAL '8 days'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000009', '10000001-0001-0001-0001-000000000001', 5, 'A hidratação salvou meu cabelo! Estava muito ressecado e agora está macio e brilhante.', true, NOW() - INTERVAL '6 days');

-- Links do Link Bio
INSERT INTO public.link_bio_links (salon_id, title, url, icon, sort_order, clicks) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '📅 Agendar Horário', '/salao/studio-belle-hair-mockup', 'lucide:calendar', 1, 1250),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '💅 Nossos Serviços', '/salao/studio-belle-hair-mockup#servicos', 'lucide:sparkles', 2, 890),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '⭐ Avaliações', '/salao/studio-belle-hair-mockup#avaliacoes', 'lucide:star', 3, 456),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '📍 Como Chegar', 'https://maps.google.com/?q=-10.9472,-37.0731', 'lucide:map-pin', 4, 320),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '💬 Fale Conosco', 'https://wa.me/5579999998888', 'mdi:whatsapp', 5, 780);

-- Fila Virtual (alguns na fila hoje)
INSERT INTO public.queue (salon_id, client_id, service_id, client_name, client_phone, position, status, estimated_wait) VALUES
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000004', '30000001-0001-0001-0001-000000000007', 'Amanda Silva', '(79) 99888-4444', 1, 'waiting', 15),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', NULL, '30000001-0001-0001-0001-000000000001', 'Cliente sem cadastro', '(79) 98765-4321', 2, 'waiting', 45),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', '40000001-0001-0001-0001-000000000007', '30000001-0001-0001-0001-000000000008', 'Larissa Mendes', '(79) 99888-7777', 3, 'waiting', 60);

-- =====================================================
-- VIEWS ÚTEIS PARA DASHBOARD
-- =====================================================

CREATE OR REPLACE VIEW public.v_dashboard_stats AS
SELECT 
  s.id as salon_id,
  s.name as salon_name,
  -- Agendamentos hoje
  (SELECT COUNT(*) FROM appointments a WHERE a.salon_id = s.id AND a.date = CURRENT_DATE) as appointments_today,
  (SELECT COUNT(*) FROM appointments a WHERE a.salon_id = s.id AND a.date = CURRENT_DATE AND a.status = 'completed') as completed_today,
  (SELECT COUNT(*) FROM appointments a WHERE a.salon_id = s.id AND a.date = CURRENT_DATE AND a.status IN ('pending', 'confirmed')) as pending_today,
  -- Faturamento
  (SELECT COALESCE(SUM(amount), 0) FROM transactions t WHERE t.salon_id = s.id AND t.type = 'income' AND t.date = CURRENT_DATE) as revenue_today,
  (SELECT COALESCE(SUM(amount), 0) FROM transactions t WHERE t.salon_id = s.id AND t.type = 'income' AND DATE_TRUNC('month', t.date) = DATE_TRUNC('month', CURRENT_DATE)) as revenue_month,
  -- Clientes
  (SELECT COUNT(*) FROM clients c WHERE c.salon_id = s.id) as total_clients,
  (SELECT COUNT(*) FROM clients c WHERE c.salon_id = s.id AND DATE_TRUNC('month', c.created_at) = DATE_TRUNC('month', CURRENT_DATE)) as new_clients_month,
  -- Avaliações
  s.rating,
  s.review_count,
  -- Fila
  (SELECT COUNT(*) FROM queue q WHERE q.salon_id = s.id AND q.status = 'waiting') as queue_waiting
FROM salons s
WHERE s.is_active = true;

-- =====================================================
-- FIM DO SCHEMA
-- =====================================================
