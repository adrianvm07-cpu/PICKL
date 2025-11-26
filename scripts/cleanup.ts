#!/usr/bin/env node

/**
 * Project Cleanup Script
 * 
 * This script removes temporary files, test artifacts, and caches to free up disk space
 * and ensure a clean development environment.
 * 
 * Usage:
 *   npm run clean:all
 *   node scripts/cleanup.ts
 */

import { rm, access } from 'fs/promises';
import { join } from 'path';
import { constants } from 'fs';

interface CleanupTarget {
  path: string;
  description: string;
  optional?: boolean;
}

const CLEANUP_TARGETS: CleanupTarget[] = [
  {
    path: 'test-results',
    description: 'Test results directory',
  },
  {
    path: 'node_modules/.cache',
    description: 'Node modules cache',
  },
  {
    path: 'playwright-report',
    description: 'Playwright HTML report',
    optional: true,
  },
  {
    path: '.playwright',
    description: 'Playwright cache',
    optional: true,
  },
  {
    path: 'coverage',
    description: 'Code coverage reports',
    optional: true,
  },
  {
    path: '.nyc_output',
    description: 'NYC coverage output',
    optional: true,
  },
  {
    path: 'downloads',
    description: 'Downloaded test files',
    optional: true,
  },
];

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function cleanupDirectory(target: CleanupTarget): Promise<void> {
  const fullPath = join(process.cwd(), target.path);
  
  if (await exists(fullPath)) {
    try {
      await rm(fullPath, { recursive: true, force: true });
      console.log(`✓ Cleaned: ${target.description} (${target.path})`);
    } catch (error) {
      if (target.optional) {
        console.log(`⚠ Skipped: ${target.description} (${target.path}) - ${error instanceof Error ? error.message : 'Unknown error'}`);
      } else {
        console.error(`✗ Failed: ${target.description} (${target.path}) - ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    }
  } else {
    console.log(`○ Not found: ${target.description} (${target.path})`);
  }
}

async function cleanup(): Promise<void> {
  console.log('🧹 Starting project cleanup...\n');
  
  let cleaned = 0;
  let skipped = 0;
  let notFound = 0;
  
  for (const target of CLEANUP_TARGETS) {
    try {
      const fullPath = join(process.cwd(), target.path);
      const targetExists = await exists(fullPath);
      
      if (targetExists) {
        await cleanupDirectory(target);
        cleaned++;
      } else {
        notFound++;
      }
    } catch (error) {
      if (target.optional) {
        skipped++;
      } else {
        throw error;
      }
    }
  }
  
  console.log('\n📊 Cleanup Summary:');
  console.log(`   ✓ Cleaned: ${cleaned}`);
  console.log(`   ○ Not Found: ${notFound}`);
  if (skipped > 0) {
    console.log(`   ⚠ Skipped: ${skipped}`);
  }
  console.log('\n✨ Cleanup complete!');
}

// Run cleanup
cleanup().catch((error) => {
  console.error('\n❌ Cleanup failed:', error instanceof Error ? error.message : 'Unknown error');
  process.exit(1);
});
