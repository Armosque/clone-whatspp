import {createClient} from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_APP_URL

const supabaseKey = import.meta.env.VITE_APP_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)