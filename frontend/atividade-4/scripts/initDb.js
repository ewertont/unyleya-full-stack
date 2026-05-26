import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL_HERE') {
  console.error('Por favor, configure as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function init() {
  console.log('Verificando usuário admin...');
  const { data: existing } = await supabase
    .from('users')
    .select('username')
    .eq('username', 'admin')
    .single();

  if (existing) {
    console.log('Usuário admin já existe!');
    return;
  }

  const { error } = await supabase
    .from('users')
    .insert([{ username: 'admin', password: 'admin' }]);

  if (error) {
    console.error('Erro ao criar usuário admin:', error.message);
  } else {
    console.log('Usuário admin criado com sucesso (username: admin, password: admin)!');
  }
}

init();
