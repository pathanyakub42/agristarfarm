import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgrzelejvhlsgxgkzwhv.supabase.co';
const supabaseKey = 'sb_publishable_XDFexcMzAIafeBpZJR4i2w_TiUSbKq0';

export const supabase = createClient(supabaseUrl, supabaseKey);
