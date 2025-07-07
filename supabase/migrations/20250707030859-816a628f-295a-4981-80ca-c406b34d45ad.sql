
-- Criar tabela para configurações do site (conteúdo da HOME, ASSINE, etc)
CREATE TABLE public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, key)
);

-- Criar tabela para slides do banner
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para depoimentos
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  testimonial TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para planos de assinatura
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  features JSONB NOT NULL DEFAULT '[]',
  category TEXT NOT NULL,
  is_promotional BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para categorias de aulas
CREATE TABLE public.class_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para aulas online
CREATE TABLE public.online_classes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- em minutos
  category_id UUID REFERENCES public.class_categories(id) ON DELETE SET NULL,
  instructor TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('Iniciante', 'Intermediário', 'Avançado')),
  order_index INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para perfis de usuário (incluindo administradores)
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Função para criar perfil automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.online_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para administradores
CREATE POLICY "Admins can manage site_config" ON public.site_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage hero_slides" ON public.hero_slides
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage subscription_plans" ON public.subscription_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage class_categories" ON public.class_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage online_classes" ON public.online_classes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can manage profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Políticas para usuários comuns verem conteúdo público
CREATE POLICY "Everyone can view active slides" ON public.hero_slides
  FOR SELECT USING (active = true);

CREATE POLICY "Everyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (active = true);

CREATE POLICY "Everyone can view active plans" ON public.subscription_plans
  FOR SELECT USING (active = true);

CREATE POLICY "Everyone can view active categories" ON public.class_categories
  FOR SELECT USING (active = true);

CREATE POLICY "Authenticated users can view active classes" ON public.online_classes
  FOR SELECT TO authenticated USING (active = true);

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Everyone can view site config" ON public.site_config
  FOR SELECT USING (true);

-- Inserir dados iniciais
INSERT INTO public.site_config (section, key, value) VALUES
('home', 'hero_title', '"Transforme sua vida através do Yoga"'),
('home', 'hero_subtitle', '"Encontre paz, equilíbrio e bem-estar em nosso estúdio"'),
('home', 'benefits', '[
  {"icon": "Heart", "title": "Saúde Física", "description": "Fortalece músculos e melhora flexibilidade"},
  {"icon": "Brain", "title": "Foco Mental", "description": "Desenvolve concentração e clareza"},
  {"icon": "Smile", "title": "Bem-estar", "description": "Reduz estresse e ansiedade"},
  {"icon": "Users", "title": "Comunidade", "description": "Conecte-se com pessoas especiais"},
  {"icon": "Leaf", "title": "Equilíbrio", "description": "Harmoniza corpo, mente e espírito"}
]');

INSERT INTO public.hero_slides (image_url, title, subtitle, order_index) VALUES
('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=600&fit=crop', 'Transforme sua vida através do Yoga', 'Encontre paz, equilíbrio e bem-estar em nosso estúdio', 1),
('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&h=600&fit=crop', 'Conecte-se com seu interior', 'Descubra a força que existe dentro de você', 2),
('https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&h=600&fit=crop', 'Jornada de autoconhecimento', 'Cada respiração é um passo em direção ao equilíbrio', 3);

INSERT INTO public.testimonials (name, image_url, testimonial, order_index) VALUES
('Maria Silva', 'https://images.unsplash.com/photo-1494790108755-2616b332c76c?w=150&h=150&fit=crop&crop=face', 'O yoga mudou completamente minha vida. Encontrei paz interior e saúde física que nunca imaginei ser possível.', 1),
('João Santos', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'As aulas são incríveis! A instrutora é muito atenciosa e o ambiente é perfeito para relaxar.', 2),
('Ana Costa', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'Depois de meses praticando, minha flexibilidade e força melhoraram muito. Recomendo para todos!', 3);
