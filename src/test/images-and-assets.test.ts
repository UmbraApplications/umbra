import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Audit: Project Images & Static Assets for Vercel', () => {
  const publicDir = path.resolve(process.cwd(), 'public');
  const publicImagesDir = path.resolve(publicDir, 'images');
  const assetsDir = path.resolve(process.cwd(), 'src/assets');

  const requiredImages = [
    'umbra-symbol.png',
    'umbra-logo.png',
    'umbra-hero-2.jpg',
    'fundador-umbra.webp',
    'produto-ml.jpg',
    'produto-lileot.jpg',
  ];

  it('all required images exist in public/images/ with non-zero size', () => {
    for (const imgName of requiredImages) {
      const fullPath = path.join(publicImagesDir, imgName);
      expect(fs.existsSync(fullPath), `Missing image in public/images: ${imgName}`).toBe(true);
      const stats = fs.statSync(fullPath);
      expect(stats.size).toBeGreaterThan(1000);
    }
  });

  it('all required images are lowercase without casing mismatch', () => {
    const files = fs.readdirSync(publicImagesDir);
    for (const file of files) {
      expect(file).toBe(file.toLowerCase());
    }
  });

  it('all asset.json files point to valid /images/... public paths and have no localhost or __l5e proxies', () => {
    const assetJsonFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.asset.json'));
    expect(assetJsonFiles.length).toBeGreaterThanOrEqual(5);

    for (const jsonFile of assetJsonFiles) {
      const content = JSON.parse(fs.readFileSync(path.join(assetsDir, jsonFile), 'utf-8'));
      expect(content.url).toMatch(/^\/images\//);
      expect(content.url).not.toContain('localhost');
      expect(content.url).not.toContain('__l5e');
      expect(content.url).not.toContain('127.0.0.1');

      // Check corresponding file exists in public/images
      const filename = path.basename(content.url);
      expect(fs.existsSync(path.join(publicImagesDir, filename))).toBe(true);
    }
  });

  it('favicon and robots.txt exist in public root', () => {
    expect(fs.existsSync(path.join(publicDir, 'favicon.png'))).toBe(true);
    expect(fs.existsSync(path.join(publicDir, 'robots.txt'))).toBe(true);
  });
});
