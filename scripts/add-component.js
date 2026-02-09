#!/usr/bin/env node
/**
 * Curio UI - Add Component Script
 * Fetches components from reactbits-installer and adds them to curio-ui
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REACTBITS_PATH = path.join(__dirname, '../node_modules/reactbits-installer/components/reactbits');
const REGISTRY_PATH = path.join(__dirname, '../src/registry');
const COMPONENTS_PATH = path.join(__dirname, '../src/app/components');
const CONFIG_PATH = path.join(__dirname, '../src/config/components.ts');

const REACTBITS_COMPONENTS = [
  'ASCIIText',
  'AnimatedContent', 
  'Antigravity',
  'BlobCursor',
  'BlurText',
  'CircularText',
  'ClickSpark',
  'CountUp',
  'Crosshair',
  'Cubes',
  'CurvedLoop',
  'DecryptedText',
  'ElectricBorder',
  'FadeContent',
  'FallingText',
  'FuzzyText',
  'GlitchText',
  'GradientText',
  'RotatingText',
  'ScrambledText',
  'ScrollFloat',
  'ScrollReveal',
  'ScrollVelocity',
  'ShinyText',
  'Shuffle',
  'SplitText',
  'TextCursor',
  'TextPressure',
  'TextType',
  'TrueFocus',
  'VariableProximity',
];

async function addComponent(componentName, category = 'text') {
  const componentFile = `${componentName}.tsx`;
  const sourcePath = path.join(REACTBITS_PATH, componentFile);
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Component ${componentName} not found in reactbits`);
    process.exit(1);
  }

  const componentCode = fs.readFileSync(sourcePath, 'utf-8');
  const slug = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  
  // Create registry file
  const registryFile = path.join(REGISTRY_PATH, category, `${slug}.tsx`);
  fs.writeFileSync(registryFile, `"use client";

${componentCode}
`);
  console.log(`✅ Created registry: ${registryFile}`);

  // Create page file with PreviewCodeUsageTabs
  const componentNameExported = componentName.replace(/([A-Z])/g, (m, p) => p);
  const pageContent = `"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ${componentName} from "@/registry/${category}/${slug}";
import { PreviewCodeUsageTabs } from "@/components/ui/tabs";

const componentCode = \`${componentCode.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`;

const usageCode = \`import ${componentName} from "@/registry/${category}/${slug}";

<${componentName} text="CurioUI" />\`;

export default function ${componentName}Page() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/components/${category}" className="p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-4xl font-bold">${componentName}</h1>
        </div>
        <p className="text-muted-foreground max-w-lg">${componentName} animation effect.</p>
      </motion.div>

      <PreviewCodeUsageTabs
        preview={
          <div className="flex items-center justify-center min-h-[200px]">
            <${componentName} text="CurioUI" />
          </div>
        }
        code={componentCode}
        usage={usageCode}
      />
    </div>
  );
}
`;
  
  const pagePath = path.join(COMPONENTS_PATH, category, slug, 'page.tsx');
  fs.writeFileSync(pagePath, pageContent);
  console.log(`✅ Created page: ${pagePath}`);

  // Update config
  updateConfig(componentName, slug, category);
}

function updateConfig(componentName, slug, category) {
  const configPath = path.join(CONFIG_PATH);
  let config = fs.readFileSync(configPath, 'utf-8');
  
  const newEntry = `    {
        slug: "${category === 'text' ? 'text-animations' : category}/${slug}",
        name: "${componentName}",
        description: "${componentName} animation effect",
        category: "${category}",
        isPremium: false,
        isNew: true,
    },`;
  
  // Find the components array and add the entry
  const insertPoint = config.indexOf('];\n\n// Helper functions');
  if (insertPoint > -1) {
    config = config.slice(0, insertPoint) + ',\n' + newEntry + config.slice(insertPoint);
    fs.writeFileSync(configPath, config);
    console.log(`✅ Updated config: ${configPath}`);
  }
}

// CLI
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node add-component.js <component-name> [category]');
  console.log('\nAvailable components:');
  REACTBITS_COMPONENTS.forEach(c => console.log(`  - ${c}`));
  process.exit(1);
}

const componentName = args[0];
const category = args[1] || 'text';

addComponent(componentName, category)
  .then(() => console.log('\n🎉 Component added successfully!'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
