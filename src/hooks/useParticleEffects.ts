
import { useRef, useCallback, useEffect } from 'react';
import { stringToCardEffect } from '@/lib/utils/cardEffectHelpers';

export interface ParticleSettings {
  density: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
}

export interface ParticleSystem {
  particles: Particle[];
  settings: ParticleSettings;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

export const useParticleEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particleSystemRef = useRef<ParticleSystem | null>(null);

  const createParticle = useCallback((x: number, y: number, settings: ParticleSettings): Particle => {
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * settings.speed,
      vy: (Math.random() - 0.5) * settings.speed,
      size: Math.random() * settings.size,
      color: settings.color,
      opacity: settings.opacity,
      life: 0,
      maxLife: Math.random() * 100 + 50
    };
  }, []);

  const updateParticle = useCallback((particle: Particle): Particle => {
    return {
      ...particle,
      x: particle.x + particle.vx,
      y: particle.y + particle.vy,
      life: particle.life + 1,
      opacity: particle.opacity * (1 - particle.life / particle.maxLife)
    };
  }, []);

  const renderParticle = useCallback((context: CanvasRenderingContext2D, particle: Particle) => {
    context.save();
    context.globalAlpha = particle.opacity;
    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }, []);

  const initializeParticleSystem = useCallback((settings: ParticleSettings) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const particles: Particle[] = [];
    for (let i = 0; i < settings.density; i++) {
      particles.push(createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        settings
      ));
    }

    particleSystemRef.current = {
      particles,
      settings,
      canvas,
      context
    };
  }, [createParticle]);

  const updateParticleSystem = useCallback(() => {
    const system = particleSystemRef.current;
    if (!system || !system.context || !system.canvas) return;

    // Clear canvas
    system.context.clearRect(0, 0, system.canvas.width, system.canvas.height);

    // Update and render particles
    system.particles = system.particles
      .map(updateParticle)
      .filter(particle => particle.life < particle.maxLife);

    // Add new particles if needed
    while (system.particles.length < system.settings.density) {
      system.particles.push(createParticle(
        Math.random() * system.canvas.width,
        Math.random() * system.canvas.height,
        system.settings
      ));
    }

    // Render all particles
    system.particles.forEach(particle => {
      renderParticle(system.context!, particle);
    });

    animationFrameRef.current = requestAnimationFrame(updateParticleSystem);
  }, [updateParticle, createParticle, renderParticle]);

  const startParticleEffect = useCallback((effectType: string, settings?: Partial<ParticleSettings>) => {
    const effect = stringToCardEffect(effectType);
    
    const defaultSettings: ParticleSettings = {
      density: 50,
      speed: 2,
      size: 3,
      color: '#ffffff',
      opacity: 0.8
    };

    const finalSettings = { ...defaultSettings, ...settings };
    
    initializeParticleSystem(finalSettings);
    updateParticleSystem();
  }, [initializeParticleSystem, updateParticleSystem]);

  const stopParticleEffect = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    particleSystemRef.current = null;
  }, []);

  const applyHolographicEffect = useCallback(() => {
    startParticleEffect('holographic', {
      color: '#00ffff',
      density: 30,
      speed: 1
    });
  }, [startParticleEffect]);

  const applyRefractorEffect = useCallback(() => {
    startParticleEffect('refractor', {
      color: '#ff00ff',
      density: 25,
      speed: 1.5
    });
  }, [startParticleEffect]);

  useEffect(() => {
    return () => {
      stopParticleEffect();
    };
  }, [stopParticleEffect]);

  return {
    canvasRef,
    startParticleEffect,
    stopParticleEffect,
    applyHolographicEffect,
    applyRefractorEffect,
    particleSystem: particleSystemRef.current
  };
};
