import type { Inspection } from './schemas';

export async function renderPosterPNG(
  i: Inspection,
  opts: { theme?: 'cyan' } = { theme: 'cyan' }
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d')!;

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Municipality name
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(i.municipalityId, canvas.width / 2, 80);

  // Date
  ctx.font = '24px sans-serif';
  ctx.fillStyle = '#666666';
  const date = new Date(i.createdAt).toLocaleDateString();
  ctx.fillText(date, canvas.width / 2, 120);

  // Image thumbnail (masked)
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      const imgSize = 600;
      const x = (canvas.width - imgSize) / 2;
      const y = 180;

      // Draw rounded rectangle mask
      ctx.save();
      ctx.beginPath();
      const radius = 20;
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + imgSize - radius, y);
      ctx.quadraticCurveTo(x + imgSize, y, x + imgSize, y + radius);
      ctx.lineTo(x + imgSize, y + imgSize * 0.75 - radius);
      ctx.quadraticCurveTo(x + imgSize, y + imgSize * 0.75, x + imgSize - radius, y + imgSize * 0.75);
      ctx.lineTo(x + radius, y + imgSize * 0.75);
      ctx.quadraticCurveTo(x, y + imgSize * 0.75, x, y + imgSize * 0.75 - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x, y, imgSize, imgSize * 0.75);
      ctx.restore();

      resolve();
    };
    img.onerror = reject;
    img.src = i.imageAnonymizedDataUrl;
  });

  // Fill gauge visualization
  const gaugeY = 750;
  const gaugeWidth = 800;
  const gaugeHeight = 40;
  const gaugeX = (canvas.width - gaugeWidth) / 2;

  // Background
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(gaugeX, gaugeY, gaugeWidth, gaugeHeight);

  // Fill
  ctx.fillStyle = opts.theme === 'cyan' ? '#00ffff' : '#00aaff';
  const fillWidth = (i.fillPercent / 100) * gaugeWidth;
  ctx.fillRect(gaugeX, gaugeY, fillWidth, gaugeHeight);

  // Label
  ctx.fillStyle = '#000000';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `${i.fillPercent}% full (${i.litersEst}L)`,
    canvas.width / 2,
    gaugeY + 80
  );

  // Object badges
  const badgeY = 900;
  const badgeSize = 80;
  const badgeSpacing = 120;
  const startX = canvas.width / 2 - (badgeSpacing * 2) / 2;

  // Bottle
  if (i.counts.bottle > 0) {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(startX, badgeY, badgeSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${i.counts.bottle}`, startX, badgeY + 8);
    ctx.font = '16px sans-serif';
    ctx.fillText('bottles', startX, badgeY + 30);
  }

  // Cup
  if (i.counts.cup > 0) {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(startX + badgeSpacing, badgeY, badgeSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${i.counts.cup}`, startX + badgeSpacing, badgeY + 8);
    ctx.font = '16px sans-serif';
    ctx.fillText('cups', startX + badgeSpacing, badgeY + 30);
  }

  // Utensils
  if (i.counts.utensils > 0) {
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(
      startX + badgeSpacing * 2,
      badgeY,
      badgeSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${i.counts.utensils}`,
      startX + badgeSpacing * 2,
      badgeY + 8
    );
    ctx.font = '16px sans-serif';
    ctx.fillText('utensils', startX + badgeSpacing * 2, badgeY + 30);
  }

  // Footer
  ctx.fillStyle = '#666666';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Stop Ocean Pollution', canvas.width / 2, canvas.height - 40);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob());
    }, 'image/png');
  });
}

