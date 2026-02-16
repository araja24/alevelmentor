import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  const seedDataPath = path.join(__dirname, '../supabase/seed_data.json');
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  console.log('Seeding Topics...');
  const { error: topicsError } = await supabase
    .from('topics')
    .upsert(seedData.topics, { onConflict: 'topic_name' }); // Assuming topic_name is unique for now/checking dups

  if (topicsError) {
    console.error('Error seeding topics:', topicsError);
  } else {
    console.log('Topics seeded successfully.');
  }

  console.log('Seeding Past Papers...');
  const { error: papersError } = await supabase
    .from('past_papers')
    .upsert(seedData.past_papers, { onConflict: 'year, session, paper_number, subject' }); 
    // Note: Schema doesn't enforce this unique constraint yet, but good for idempotency if we added it.
    // Ideally we'd have a unique constraint on these 4 fields. 
    // For now, let's just insert. Since we don't have IDs in seed data, standard upsert without ID might duplicate if run multiple times
    // unless there is a unique index. Use delete then insert for clean seed or just insert.
    // For MVP, let's just insert and assume empty DB or handle duplicates manually if needed.
    // Actually, let's use insert for simplicity as we don't have stable IDs in JSON.
  
  // To avoid duplicates on re-runs, we could clear tables first or check existence.
  // For this script, let's just insert.
  const { error: insertPapersError } = await supabase
    .from('past_papers')
    .insert(seedData.past_papers);

  if (insertPapersError) {
     console.error('Error seeding past papers:', insertPapersError);
  } else {
    console.log('Past papers seeded successfully.');
  }
}

seed().catch(console.error);
