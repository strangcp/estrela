
-- Atualizar políticas RLS para permitir acesso a usuários com role 'authenticated' ou 'admin'

DROP POLICY IF EXISTS "Admins can manage site_config" ON public.site_config;
CREATE POLICY "Admins can manage site_config" ON public.site_config
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage hero_slides" ON public.hero_slides;
CREATE POLICY "Admins can manage hero_slides" ON public.hero_slides
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage subscription_plans" ON public.subscription_plans;
CREATE POLICY "Admins can manage subscription_plans" ON public.subscription_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage class_categories" ON public.class_categories;
CREATE POLICY "Admins can manage class_categories" ON public.class_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage online_classes" ON public.online_classes;
CREATE POLICY "Admins can manage online_classes" ON public.online_classes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND (profiles.role = 'admin' OR profiles.role = 'authenticated')
    )
  );

DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;
CREATE POLICY "Admins can manage profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND (p.role = 'admin' OR p.role = 'authenticated')
    )
  );

-- Atualizar a constraint CHECK na tabela profiles para permitir 'authenticated'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('user', 'admin', 'authenticated'));
