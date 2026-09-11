// The bundled config validator checks schema and syntax only: it accepts any
// string in `extends`. A preset name that does not exist still validates, then
// fails for every consumer on the next hosted run. That is how `:pinDigests`
// shipped. Resolving the presets is the only check that catches it here.
import { readFile } from 'node:fs/promises';
import { resolveConfigPresets } from 'renovate/dist/config/presets/index.js';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: resolve-presets.mjs <config.json...>');
  process.exit(2);
}

let failed = false;
for (const file of files) {
  try {
    const config = JSON.parse(await readFile(file, 'utf8'));
    await resolveConfigPresets(config);
    console.log(`ok   ${file}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${file}: ${error.validationError ?? error.message}`);
  }
}
process.exit(failed ? 1 : 0);
