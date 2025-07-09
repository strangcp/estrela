-- Atualizar o role do usuário estrela@yoga.com.br para admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'estrela@yoga.com.br';