#!/usr/bin/env node
/**
 * Curio UI - Add Component Script
 * Fetches components from reactbits-installer and adds them to curio-ui
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REACTBITS_PATH = path.join(__dirname, '../node_modules/reactbits-installer/components/reactbits');
const REGISTRY_PATH = path.join(__dirname, '../src/registry');
const COMPONENTS_PATH = path.join(__dirname, '../src/app/components');
const CONFIG_PATH = path.join(__dirname, '../src/config/components.ts');
const STATE_PATH = path.join(__dirname, '../src/config/processed-components.json');

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

async function addComponent(componentName, category = 'text', componentCode) {
  const slug = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

  // Fix imports for compatibility with curio-ui
  componentCode = componentCode
    .replace(/from ['"]motion\/react['"]/g, "from 'framer-motion'")
    .replace(/from ["']motion\/react["']/g, "from 'framer-motion'");

  // Create registry file
  const registryFile = path.join(REGISTRY_PATH, category, `${slug}.tsx`);
  fs.mkdirSync(path.dirname(registryFile), { recursive: true });
  fs.writeFileSync(registryFile, `"use client";

${componentCode}
`);
  console.log(`✅ Created registry: ${registryFile}`);

  // Create page file with PreviewCodeUsageTabs
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
  fs.mkdirSync(path.dirname(pagePath), { recursive: true });
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

  const insertPoint = config.indexOf('];\n\n// Helper functions');
  if (insertPoint > -1) {
    config = config.slice(0, insertPoint) + ',\n' + newEntry + config.slice(insertPoint);
    fs.writeFileSync(configPath, config);
    console.log(`✅ Updated config: ${configPath}`);
  }
}

function getProcessedComponents() {
  if (fs.existsSync(STATE_PATH)) {
    const data = fs.readFileSync(STATE_PATH, 'utf-8');
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

function saveProcessedComponent(componentName) {
  const processed = getProcessedComponents();
  if (!processed.includes(componentName)) {
    processed.push(componentName);
    fs.writeFileSync(STATE_PATH, JSON.stringify(processed, null, 2));
    console.log(`📌 Marked ${componentName} as processed`);
  }
}

function markAsSkipped(componentName) {
  const processed = getProcessedComponents();
  const skippedName = `gsap-${componentName}`;
  if (!processed.includes(skippedName)) {
    processed.push(skippedName);
    fs.writeFileSync(STATE_PATH, JSON.stringify(processed, null, 2));
    console.log(`⏭️  Marked ${componentName} as skipped (requires gsap)`);
  }
}

function cleanFailedComponent(slug, category = 'text') {
  const registryFile = path.join(REGISTRY_PATH, category, `${slug}.tsx`);
  const pagePath = path.join(COMPONENTS_PATH, category, slug, 'page.tsx');

  if (fs.existsSync(registryFile)) {
    fs.unlinkSync(registryFile);
    console.log(`🗑️  Removed registry: ${registryFile}`);
  }
  if (fs.existsSync(pagePath)) {
    fs.unlinkSync(pagePath);
    const pageDir = path.dirname(pagePath);
    if (fs.readdirSync(pageDir).length === 0) {
      fs.rmdirSync(pageDir);
      console.log(`🗑️  Removed empty directory: ${pageDir}`);
    }
    console.log(`🗑️  Removed page: ${pagePath}`);
  }
}

function getNextComponent() {
  const processed = getProcessedComponents();
  const skipped = processed.filter(c => c.startsWith('skipped-') || c.startsWith('gsap-'));
  const processedNames = processed.map(c => c.replace(/^(skipped-|gsap-)/, ''));
  return REACTBITS_COMPONENTS.find(c => !processedNames.includes(c));
}

function verifyBuild() {
  try {
    console.log('🔨 Verifying build...');
    execSync('npm run build', { cwd: __dirname.replace('/scripts', ''), stdio: 'pipe' });
    console.log('✅ Build verified!');
    return true;
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    return false;
  }
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  // Auto-mode: process next unprocessed component with retry on gsap
  let component = getNextComponent();
  let attempts = 0;
  const maxAttempts = REACTBITS_COMPONENTS.length;

  while (component && attempts < maxAttempts) {
    console.log(`\n📦 Processing: ${component} (attempt ${attempts + 1})`);
    const componentFile = `${component}.tsx`;
    const sourcePath = path.join(REACTBITS_PATH, componentFile);

    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Component ${component} not found in reactbits`);
      attempts++;
      component = getNextComponent();
      continue;
    }

    const componentCode = fs.readFileSync(sourcePath, 'utf-8');

    // Check for gsap dependency
    if (componentCode.includes("from 'gsap'") || componentCode.includes('from "gsap"') ||
        componentCode.includes('gsap/ScrollTrigger') || componentCode.includes("gsap/ScrollTrigger")) {
      console.log(`⏭️  ${component} requires gsap - skipping`);
      markAsSkipped(component);
      attempts++;
      component = getNextComponent();
      continue;
    }

    const slug = component.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

    try {
      await addComponent(component, 'text', componentCode);
      saveProcessedComponent(component);

      if (verifyBuild()) {
        console.log(`\n🎉 ${component} added successfully!`);
        break;
      } else {
        console.log(`⚠️  Build failed for ${component} - cleaning up`);
        cleanFailedComponent(slug);
        markAsSkipped(component);
      }
    } catch (error) {
      console.error(`❌ Error adding ${component}: ${error.message}`);
      cleanFailedComponent(slug);
      markAsSkipped(component);
    }

    attempts++;
    component = getNextComponent();
  }

  if (!component) {
    console.log('🎉 All components processed!');
  }
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log('Usage: node add-component.js [component-name] [category]');
  console.log('\nAvailable components:');
  REACTBITS_COMPONENTS.forEach(c => console.log(`  - ${c}`));
  process.exit(1);
} else {
  const componentName = args[0];
  const category = args[1] || 'text';

  const processed = getProcessedComponents();
  const processedNames = processed.map(c => c.replace(/^(skipped-|gsap-)/, ''));

  if (processedNames.includes(componentName)) {
    console.log(`⚠️  ${componentName} already processed or skipped`);
    process.exit(0);
  }

  const sourcePath = path.join(REACTBITS_PATH, `${componentName}.tsx`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Component ${componentName} not found in reactbits`);
    process.exit(1);
  }

  const componentCode = fs.readFileSync(sourcePath, 'utf-8');

  if (componentCode.includes("from 'gsap'") || componentCode.includes('from "gsap"') ||
      componentCode.includes('gsap/ScrollTrigger') || componentCode.includes("gsap/ScrollTrigger")) {
    console.log(`⚠️  ${componentName} requires gsap - skipping`);
    markAsSkipped(componentName);
    process.exit(0);
  }

  addComponent(componentName, category, componentCode)
    .then(() => {
      saveProcessedComponent(componentName);
      if (verifyBuild()) {
        console.log('\n🎉 Component added successfully!');
      } else {
        console.log('\n⚠️  Build failed - component added but may need fixes');
      }
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
