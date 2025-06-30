import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const fullname = e.target.fullname.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Signup error: ' + error.message);
    return;
  }

  const user = data.user;

  if (user) {
    const { error: insertError } = await supabase
      .from('login data')
      .insert({ id: user.id, full_name: fullname, email });

    if (insertError) {
      alert('Insert error: ' + insertError.message);
      return;
    }

    alert('Registered successfully! Please check your email to confirm.');
    window.location.href = 'login.html';
  }
});
