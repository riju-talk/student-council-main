const { createClient } = require('@supabase/supabase-js');

async function pingSupabase() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY must be set');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Make a simple query to keep the database active
    const { data, error } = await supabase
      .from('student_representatives')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error pinging Supabase:', error.message);
      process.exit(1);
    }

    console.log('Successfully pinged Supabase');
    console.log('Last active at:', new Date().toISOString());
    process.exit(0);
  } catch (error) {
    console.error('Failed to ping Supabase:', error.message);
    process.exit(1);
  }
}

pingSupabase();
