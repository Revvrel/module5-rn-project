import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jaghxopoohazzhixxouy.supabase.co';
const supabaseKey = 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZ2h4b3Bvb2hhenpoaXh4b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMjMxOTksImV4cCI6MjAyMjU5OTE5OX0.tsy9_DQ9FIZKVRfRz8yIsvu0XXF3-xfEGRorDiJwLw0';

export const supabase = createClient(supabaseUrl, supabaseKey);