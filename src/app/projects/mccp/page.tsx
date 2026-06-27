'use client';

import { useState, useRef, useEffect } from 'react';
import { runMCCP } from './algorithms';
import './style.css';

interface Point {
  x: number;
  y: number;
}

interface OptimizationResult {
  best_center: [number, number];
  max_count: number;
  sliding_time: number;
  brute_force_center: [number, number];
  brute_force_count: number;
  brute_force_time: number;
  accuracy_percentage: number;
  speedup_percentage: number;
  cluster_labels: number[];
}

interface ErrorWithMessage {
  message: string;
}

export default function MCCPPage() {
  const [points, setPoints] = useState<string>('');
  const [eps, setEps] = useState<string>('2.0');
  const [minSamples, setMinSamples] = useState<string>('3');
  const [radius, setRadius] = useState<string>('1.5');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [popupContent, setPopupContent] = useState<{ type: 'image' | 'video'; src: string } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const popupVideoRef = useRef<HTMLVideoElement>(null);

  const parsePoints = (pointsText: string): Point[] => {
    const lines = pointsText.trim().split('\n');
    return lines.map(line => {
      const coords = line.split(',').map(Number);
      return { x: coords[0], y: coords[1] };
    });
  };

  const pointsToArray = (pointsObj: Point[]): number[][] => {
    return pointsObj.map(p => [p.x, p.y]);
  };

  // Listen for theme changes from the header
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark');
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.style.colorScheme = 'light';
      }
    };
    
    checkTheme();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    const handleDocumentClick = () => {
      setTimeout(checkTheme, 10);
    };
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let pointsArray: number[][];
      if (points.includes('\n')) {
        pointsArray = pointsToArray(parsePoints(points));
      } else {
        pointsArray = JSON.parse(points);
      }

      if (pointsArray.length < 2) {
        throw new Error("Please enter at least 2 points");
      }

      const mccpResult = runMCCP(
        pointsArray,
        parseFloat(eps),
        parseInt(minSamples),
        parseFloat(radius)
      );
      
      setResult({
        best_center: mccpResult.slidingCenter as [number, number],
        max_count: mccpResult.slidingCount,
        sliding_time: mccpResult.slidingTime,
        brute_force_center: mccpResult.bruteCenter as [number, number],
        brute_force_count: mccpResult.bruteCount,
        brute_force_time: mccpResult.bruteTime,
        accuracy_percentage: mccpResult.accuracyPercentage,
        speedup_percentage: mccpResult.speedupPercentage,
        cluster_labels: mccpResult.clusterLabels
      });
    } catch (err) {
      const error = err as ErrorWithMessage;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRandomData = () => {
    const randomPoints: string[] = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() * 20).toFixed(2);
      const y = (Math.random() * 20).toFixed(2);
      randomPoints.push(`${x},${y}`);
    }
    setPoints(randomPoints.join('\n'));
  };

  // Draw visualization with higher resolution
  useEffect(() => {
    if (!result || !result.best_center || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Use device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 750;
    const height = 450;
    
    // Set canvas size with device pixel ratio
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const isLight = !isDarkMode;
    
    ctx.fillStyle = isLight ? '#f8f9fa' : '#0a0e27';
    ctx.fillRect(0, 0, width, height);

    let pointsArray: Point[];
    try {
      if (points.includes('\n')) {
        pointsArray = parsePoints(points);
      } else {
        const rawPoints = JSON.parse(points) as number[][];
        pointsArray = rawPoints.map(p => ({ x: p[0], y: p[1] }));
      }
    } catch {
      return;
    }

    if (pointsArray.length === 0) return;

    const slidingCenter = result.best_center;
    const bruteCenter = result.brute_force_center;
    const circleRadius = parseFloat(radius);

    let minX = Math.min(...pointsArray.map(p => p.x), slidingCenter[0] - circleRadius);
    let maxX = Math.max(...pointsArray.map(p => p.x), slidingCenter[0] + circleRadius);
    let minY = Math.min(...pointsArray.map(p => p.y), slidingCenter[1] - circleRadius);
    let maxY = Math.max(...pointsArray.map(p => p.y), slidingCenter[1] + circleRadius);
    
    if (bruteCenter) {
      minX = Math.min(minX, bruteCenter[0] - circleRadius);
      maxX = Math.max(maxX, bruteCenter[0] + circleRadius);
      minY = Math.min(minY, bruteCenter[1] - circleRadius);
      maxY = Math.max(maxY, bruteCenter[1] + circleRadius);
    }
    
    const padding = 60;
    const scaleX = (width - 2 * padding) / (maxX - minX);
    const scaleY = (height - 2 * padding) / (maxY - minY);
    
    const transformX = (x: number) => padding + (x - minX) * scaleX;
    const transformY = (y: number) => height - padding - (y - minY) * scaleY;

    // Grid
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 215, 0, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = minX + (i / 10) * (maxX - minX);
      const y = minY + (i / 10) * (maxY - minY);
      ctx.beginPath();
      ctx.moveTo(transformX(x), transformY(minY));
      ctx.lineTo(transformX(x), transformY(maxY));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(transformX(minX), transformY(y));
      ctx.lineTo(transformX(maxX), transformY(y));
      ctx.stroke();
    }

    // Brute Force Circle (Green Dashed)
    if (bruteCenter) {
      const bruteCenterX = transformX(bruteCenter[0]);
      const bruteCenterY = transformY(bruteCenter[1]);
      const bruteRadiusPx = circleRadius * scaleX;
      
      ctx.beginPath();
      ctx.arc(bruteCenterX, bruteCenterY, bruteRadiusPx, 0, 2 * Math.PI);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`Brute: ${result.brute_force_count} pts`, bruteCenterX - 45, bruteCenterY - 10);
    }

    // Sliding Circle (Yellow in dark / Navy in light)
    const slidingCenterX = transformX(slidingCenter[0]);
    const slidingCenterY = transformY(slidingCenter[1]);
    const slidingRadiusPx = circleRadius * scaleX;
    
    ctx.beginPath();
    ctx.arc(slidingCenterX, slidingCenterY, slidingRadiusPx, 0, 2 * Math.PI);
    ctx.fillStyle = isLight ? 'rgba(10, 14, 39, 0.08)' : 'rgba(184, 198, 255, 0.08)';
    ctx.fill();
    ctx.strokeStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    ctx.stroke();

    // Center marker
    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('×', slidingCenterX - 7, slidingCenterY + 7);
    
    // Label
    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(`Sliding: ${result.max_count} pts`, slidingCenterX - 40, slidingCenterY - 18);

    // Points
    const clusterColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    
    pointsArray.forEach((point, idx) => {
      const x = transformX(point.x);
      const y = transformY(point.y);
      const isInside = Math.sqrt(Math.pow(point.x - slidingCenter[0], 2) + Math.pow(point.y - slidingCenter[1], 2)) <= circleRadius;
      
      let pointColor = isLight ? '#9ca3af' : '#6b7280';
      if (result.cluster_labels && result.cluster_labels[idx] !== -1 && result.cluster_labels[idx] !== undefined) {
        pointColor = clusterColors[result.cluster_labels[idx] % clusterColors.length];
      }
      if (isInside) pointColor = isLight ? '#0a0e27' : '#b8c6ff';
      
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = pointColor;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Legend
    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = 'bold 13px monospace';
    const legendText = isLight ? 'Navy = Sliding Circle | Green Dashed = Optimal' : 'Yellow = Sliding Circle | Green Dashed = Optimal';
    ctx.fillText(legendText, 20, 30);
    
  }, [result, points, radius, isDarkMode]);

  // Popup handlers
  const openPopup = (type: 'image' | 'video', src: string) => {
    setPopupContent({ type, src });
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setPopupContent(null);
    document.body.style.overflow = 'unset';
    if (popupVideoRef.current) {
      popupVideoRef.current.pause();
    }
  };

  // Close popup on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className={`mccp-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Maximum Circular Coverage Problem</h1>
          <h2 className="hero-subtitle">Sliding Circle Algorithm</h2>
          <p className="hero-description">
            The Maximum Circular Coverage Problem, derived from the{" "}
            <a
              href="https://arxiv.org/abs/1208.0073"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              Maximum Range Sum Problem in spatial databases
            </a>
            , is to find the optimal location for a fixed-radius circle that covers the maximum number of points in 2D space. Our heuristic solution leverages the well-known{" "}
            <a
              href="https://en.wikipedia.org/wiki/DBSCAN#cite_note-dbscan-1"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-link"
            >
              DBSCAN clustering algorithm
            </a>
            , and is orders of magnitude faster than a brute force search while still yielding near-optimal results.
            <br /><br />
            Built as a full-stack application with Next.js, TypeScript, Python, and FastAPI.
          </p>
          <div className="hero-tags">
            <span>DBSCAN</span>
            <span>Sliding Circle</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Python</span>
            <span>FastAPI</span>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
      <div className="media-gallery">
        <div className="media-card">
          <div className="media-title">Research Poster</div>
          <div className="media-content">
            <img 
              src="/mccp/mccp-poster.png" 
              alt="MCCP Research Poster"
              className="media-image"
              onClick={() => openPopup('image', '/mccp/mccp-poster.png')}
              style={{ cursor: 'pointer' }}
            />
            <div className="media-caption">Algorithm overview and results</div>
          </div>
        </div>

        <div className="media-card">
          <div className="media-title">The Problem</div>
          <div className="media-content">
            <video 
              controls
              className="media-video"
              onClick={() => openPopup('video', '/mccp/mccp-video.mp4')}
              style={{ cursor: 'pointer' }}
            >
              <source src="/mccp/mccp-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="media-caption">Introduction to the MCCP and how the Sliding Circle Algorithm solves it.</div>
          </div>
        </div>

        <div className="media-card">
          <div className="media-title">Algorithm Flowchart</div>
          <div className="media-content">
            <img 
              src="/mccp/chart.png" 
              alt="MCCP Algorithm Flowchart"
              className="media-image"
              onClick={() => openPopup('image', '/mccp/chart.png')}
              style={{ cursor: 'pointer' }}
            />
            <div className="media-caption">Step-by-step workflow</div>
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {popupContent && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            {popupContent.type === 'image' ? (
              <img 
                src={popupContent.src} 
                alt="Enlarged view" 
                className="popup-image" 
              />
            ) : (
              <video 
                controls
                autoPlay
                className="popup-video"
                ref={popupVideoRef}
              >
                <source src={popupContent.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="input-section">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Your Points (one pair of X,Y coordinates per line):</label>
            <textarea
              rows={6}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder={`Example:
1 , 2
3 , 4
5 , 6
7 , 8
9 , 10`}
              required
            />
            <div className="button-group">
              <button type="button" onClick={loadRandomData} className="btn-secondary">
                Random Data
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cluster Distance (eps):</label>
              <input type="number" step="0.1" value={eps} onChange={(e) => setEps(e.target.value)} required />
              <small>How close points should be to form a group</small>
            </div>
            <div className="form-group">
              <label>Min Points (minPts):</label>
              <input type="number" step="1" value={minSamples} onChange={(e) => setMinSamples(e.target.value)} required />
              <small>Minimum points needed for a dense group</small>
            </div>
            <div className="form-group">
              <label>Circle Radius:</label>
              <input type="number" step="0.1" value={radius} onChange={(e) => setRadius(e.target.value)} required />
              <small>Size of the coverage circle</small>
            </div>
          </div>

          <div className="button-group-full">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Running...' : 'Run Algorithm'}
            </button>
          </div>
        </form>

        {error && <div className="error">Error: {error}</div>}
      </div>

      {/* Results Section */}
      {result && (
        <div className="results-section">
          <h2>Results</h2>
          
          <div className="visualization">
            <canvas ref={canvasRef} />
          </div>

          <div className="info-box">
            <p><strong>Solution:</strong> ({result.best_center[0].toFixed(2)}, {result.best_center[1].toFixed(2)})</p>
            <p><strong>Points Covered:</strong> {result.max_count} points</p>
            <p><strong>Accuracy:</strong> {result.accuracy_percentage.toFixed(1)}% of optimal solution</p>
            <p><strong>Speedup:</strong> {result.speedup_percentage.toFixed(1)}% faster than brute force</p>
            <p><strong>Time:</strong> {result.sliding_time.toFixed(4)} seconds vs {result.brute_force_time.toFixed(4)} seconds for brute force</p>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="simple-grid">
          <div className="simple-card">
            <div className="step-num">1</div>
            <h3>Group Nearby Points</h3>
            <p>The algorithm first identifies dense clusters of points using DBSCAN, ignoring sparse areas.</p>
          </div>
          <div className="simple-card">
            <div className="step-num">2</div>
            <h3>Find Best Circle</h3>
            <p>Inside each cluster, it slides a circle to find the position that covers the most points.</p>
          </div>
          <div className="simple-card">
            <div className="step-num">3</div>
            <h3>Verify Accuracy</h3>
            <p>Results are compared with brute force to confirm accuracy and speed up.</p>
          </div>
        </div>
      </div>

      {/* Built With Section */}
      <div className="tech-stack-simple">
        <h2>Built With</h2>
        <div className="simple-grid">
          <div className="simple-card">
            <h3>Frontend</h3>
            <p>Next.js + TypeScript for interactive visualization</p>
          </div>
          <div className="simple-card">
            <h3>Backend</h3>
            <p>Python + FastAPI for high-performance algorithms</p>
          </div>
          <div className="simple-card">
            <h3>Algorithm</h3>
            <p>DBSCAN clustering + Sliding Circle optimization</p>
          </div>
        </div>
      </div>

      <footer>
        <p><strong>© 2025 Mahsa Khakpour | Sliding Circle Algorithm | Full-Stack Implementation</strong></p>
        <p className="footer-note"><strong>Work done as a Capstone Project at Northeastern University, Vancouver Campus, under Prof. Mario Nascimento's supervision.</strong></p>
      </footer>
    </div>
  );
}