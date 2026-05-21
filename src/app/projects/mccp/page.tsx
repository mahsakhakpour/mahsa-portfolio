'use client';

import { useState, useRef, useEffect } from 'react';
import { runMCCP, suggestAIParameters, predictHotspots, getDataInsights } from './algorithms';
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

interface AISuggestions {
  suggested_eps: number;
  suggested_min_samples: number;
  suggested_radius: number;
  confidence: number;
  density: number;
  message: string;
  reasoning: string;
}

interface Hotspot {
  id: number;
  center: [number, number];
  potential_coverage: number;
  priority: string;
  suggested_radius: number;
}

interface HotspotsResponse {
  hotspots: Hotspot[];
  total_hotspots: number;
  message: string;
  analysis: string;
}

interface InsightsResponse {
  insights: string[];
  summary: string;
  statistics: {
    x_range: number;
    y_range: number;
    density: number;
    total_points: number;
  };
}

interface ErrorWithMessage {
  message: string;
  response?: {
    data?: {
      detail?: string;
    };
  };
}

export default function MCCPPage() {
  const [points, setPoints] = useState<string>('');
  const [eps, setEps] = useState<string>('2.0');
  const [minSamples, setMinSamples] = useState<string>('3');
  const [radius, setRadius] = useState<string>('1.5');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions | null>(null);
  const [hotspots, setHotspots] = useState<HotspotsResponse | null>(null);
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>('results');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const openModal = (src: string, type: string) => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage') as HTMLImageElement;
    const modalVideo = document.getElementById('modalVideo') as HTMLVideoElement;
    
    if (modal && modalImg && modalVideo) {
      if (type === 'image') {
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
        modalImg.src = src;
      } else {
        modalImg.style.display = 'none';
        modalVideo.style.display = 'block';
        const videoSource = modalVideo.querySelector('source') as HTMLSourceElement;
        if (videoSource) videoSource.src = src;
        modalVideo.load();
      }
      modal.classList.add('active');
    }
  };

  const closeModal = () => {
    const modal = document.getElementById('imageModal');
    const modalVideo = document.getElementById('modalVideo') as HTMLVideoElement;
    if (modal) {
      modal.classList.remove('active');
      if (modalVideo) modalVideo.pause();
    }
  };

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
      setActiveTab('results');
    } catch (err) {
      const error = err as ErrorWithMessage;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAISuggestions = async () => {
    setLoadingAI(true);
    setError(null);
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
      
      const suggestions = suggestAIParameters(pointsArray);
      setAiSuggestions(suggestions);
      
      setEps(suggestions.suggested_eps.toString());
      setMinSamples(suggestions.suggested_min_samples.toString());
      setRadius(suggestions.suggested_radius.toString());
      
      setActiveTab('ai');
    } catch (err) {
      const error = err as ErrorWithMessage;
      setError(error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const getHotspots = async () => {
    setLoadingAI(true);
    setError(null);
    try {
      let pointsArray: number[][];
      if (points.includes('\n')) {
        pointsArray = pointsToArray(parsePoints(points));
      } else {
        pointsArray = JSON.parse(points);
      }
      
      if (pointsArray.length < 3) {
        throw new Error("Need at least 3 points for hotspot detection");
      }
      
      const hotspotsResult = predictHotspots(pointsArray, parseFloat(radius));
      setHotspots(hotspotsResult);
      setActiveTab('hotspots');
    } catch (err) {
      const error = err as ErrorWithMessage;
      setError(error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const getInsights = async () => {
    setLoadingAI(true);
    setError(null);
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
      
      const insightsResult = getDataInsights(
        pointsArray,
        parseFloat(eps),
        parseInt(minSamples),
        parseFloat(radius)
      );
      setInsights(insightsResult);
      setActiveTab('insights');
    } catch (err) {
      const error = err as ErrorWithMessage;
      setError(error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const loadSampleData = () => {
    setPoints(`0,0
1,1
2,2
10,10
11,11
12,12
0,10
1,11
2,12
5,5
5.5,5.5
6,6`);
    setEps('2.0');
    setMinSamples('3');
    setRadius('1.5');
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

  // Draw visualization
  useEffect(() => {
    if (!result || !result.best_center || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;

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

    if (bruteCenter) {
      const bruteCenterX = transformX(bruteCenter[0]);
      const bruteCenterY = transformY(bruteCenter[1]);
      const bruteRadiusPx = circleRadius * scaleX;
      
      ctx.beginPath();
      ctx.arc(bruteCenterX, bruteCenterY, bruteRadiusPx, 0, 2 * Math.PI);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.fillStyle = '#22c55e';
      ctx.font = '14px monospace';
      ctx.fillText(`Brute: ${result.brute_force_count} pts`, bruteCenterX - 45, bruteCenterY - 10);
    }

    const slidingCenterX = transformX(slidingCenter[0]);
    const slidingCenterY = transformY(slidingCenter[1]);
    const slidingRadiusPx = circleRadius * scaleX;
    
    ctx.beginPath();
    ctx.arc(slidingCenterX, slidingCenterY, slidingRadiusPx, 0, 2 * Math.PI);
    ctx.fillStyle = isLight ? 'rgba(32, 39, 168, 0.1)' : 'rgba(184, 198, 255, 0.1)';
    ctx.fill();
    ctx.strokeStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.stroke();

    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('×', slidingCenterX - 7, slidingCenterY + 8);
    
    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = '14px monospace';
    ctx.fillText(`Sliding: ${result.max_count} pts`, slidingCenterX - 40, slidingCenterY - 20);

    const clusterColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    
    pointsArray.forEach((point, idx) => {
      const x = transformX(point.x);
      const y = transformY(point.y);
      const isInside = Math.sqrt(Math.pow(point.x - slidingCenter[0], 2) + Math.pow(point.y - slidingCenter[1], 2)) <= circleRadius;
      
      let pointColor = isLight ? '#6c757d' : '#6b7280';
      if (result.cluster_labels && result.cluster_labels[idx] !== -1 && result.cluster_labels[idx] !== undefined) {
        pointColor = clusterColors[result.cluster_labels[idx] % clusterColors.length];
      }
      if (isInside) pointColor = isLight ? '#2027a8' : '#b8c6ff';
      
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, 2 * Math.PI);
      ctx.fillStyle = pointColor;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.fillStyle = isLight ? '#0a0e27' : '#ffd700';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('Yellow Circle = Sliding Circle Result | Green Dashed = Optimal Solution', 20, 35);
  }, [result, points, radius, isDarkMode]);

  return (
    <div className={`mccp-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Maximum Circular Coverage Problem</h1>
          <p className="hero-description">
            The Sliding Circle Algorithm finds the best location for a fixed-radius circle to cover the maximum 
            number of points in 2D space. This two-phase hybrid algorithm combines DBSCAN clustering with sliding optimization, 
            making it 99.5% faster than traditional methods while maintaining 96-99% accuracy.
            <br /><br />
            Built as a full-stack application with Next.js, TypeScript, Python, and FastAPI. The AI layer 
            recommends optimal parameters, predicts coverage, finds dense areas, and provides real-time insights.
          </p>
          <div className="hero-tags">
            <span>DBSCAN</span>
            <span>Sliding Circle</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Python</span>
            <span>FastAPI</span>
            <span>AI Integration</span>
          </div>
        </div>
      </div>

      {/* Media Gallery */}
<div className="media-gallery">
  {/* Poster Image */}
  <div className="media-card">
    <div className="media-title">Research Poster</div>
    <div className="media-content">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/mccp/MCCPposter.png" 
        alt="MCCP Research Poster"
        className="media-image"
        onClick={() => openModal('/mccp/MCCPposter.png', 'image')}
      />
      <div className="media-caption">Algorithm overview and results</div>
    </div>
  </div>

  {/* Video Explanation */}
  <div className="media-card">
    <div className="media-title">Algorithm Explanation</div>
    <div className="media-content">
      <video 
  controls
  className="media-video"
  onClick={(e) => e.stopPropagation()}
>
  <source src="/mccp/MCCPvideo.mp4" type="video/mp4" />
  <source src="/mccp/MCCPvideo.webm" type="video/webm" />
  <source src="/mccp/MCCPvideo.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video>
      <div className="media-caption">How the Sliding Circle works</div>
    </div>
  </div>

  {/* Flowchart */}
  <div className="media-card">
    <div className="media-title">Algorithm Flowchart</div>
    <div className="media-content">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/mccp/chart.png" 
        alt="MCCP Algorithm Flowchart"
        className="media-image"
        onClick={() => openModal('/mccp/chart.png', 'image')}
      />
      <div className="media-caption">Step-by-step workflow</div>
    </div>
  </div>
</div>

      {/* Modal */}
      <div id="imageModal" className="modal" onClick={closeModal}>
        <span className="close-modal" onClick={closeModal}>&times;</span>
        <div className="modal-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="modalImage" src="" alt="" style={{ display: 'none' }} />
          <video id="modalVideo" controls style={{ display: 'none' }}>
            <source src="" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter Your Points (x,y):</label>
            <textarea
              rows={5}
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="0,0&#10;1,1&#10;2,2"
              required
            />
            <div className="button-group">
              <button type="button" onClick={loadSampleData} className="btn-secondary">
                Sample Data
              </button>
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
            <button type="button" onClick={getAISuggestions} disabled={loadingAI} className="btn-ai">
              AI Suggest Parameters
            </button>
            <button type="button" onClick={getHotspots} disabled={loadingAI} className="btn-ai">
              Find Dense Areas
            </button>
            <button type="button" onClick={getInsights} disabled={loadingAI} className="btn-ai">
              Get Insights
            </button>
          </div>
        </form>

        {error && <div className="error">Error: {error}</div>}
      </div>

      {/* Results Tabs */}
      {(result || aiSuggestions || hotspots || insights) && (
        <div className="tabs">
          <button className={`tab ${activeTab === 'results' ? 'active' : ''}`} onClick={() => setActiveTab('results')}>
            Results
          </button>
          <button className={`tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
            AI Suggestions
          </button>
          <button className={`tab ${activeTab === 'hotspots' ? 'active' : ''}`} onClick={() => setActiveTab('hotspots')}>
            Dense Areas
          </button>
          <button className={`tab ${activeTab === 'insights' ? 'active' : ''}`} onClick={() => setActiveTab('insights')}>
            Insights
          </button>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && result && (
        <div className="results-section">
          <h2>Results</h2>
          
          <div className="visualization">
            <canvas ref={canvasRef} width={750} height={500} />
          </div>

          <div className="results-grid">
            <div className="result-card">
              <h3>Points Covered</h3>
              <div className="result-value">{result.max_count}</div>
              <div className="result-detail">by Sliding Circle</div>
            </div>
            <div className="result-card">
              <h3>Optimal Coverage</h3>
              <div className="result-value">{result.brute_force_count}</div>
              <div className="result-detail">by Brute Force</div>
            </div>
            <div className="result-card">
              <h3>Speed</h3>
              <div className="result-value">{result.speedup_percentage.toFixed(1)}%</div>
              <div className="result-detail">faster than brute force</div>
            </div>
            <div className="result-card">
              <h3>Accuracy</h3>
              <div className="result-value">{result.accuracy_percentage.toFixed(1)}%</div>
              <div className="result-detail">of optimal solution</div>
            </div>
          </div>

          <div className="info-box">
            <p><strong>Circle Center:</strong> ({result.best_center[0].toFixed(2)}, {result.best_center[1].toFixed(2)})</p>
            <p><strong>Time:</strong> {result.sliding_time.toFixed(4)} seconds vs {result.brute_force_time.toFixed(4)} seconds for brute force</p>
          </div>
        </div>
      )}

      {/* AI Suggestions Tab */}
      {activeTab === 'ai' && aiSuggestions && (
        <div className="ai-section">
          <h2>AI Recommendations</h2>
          <div className="results-grid">
            <div className="result-card">
              <h3>Recommended eps</h3>
              <div className="result-value">{aiSuggestions.suggested_eps}</div>
              <button className="btn-use" onClick={() => setEps(aiSuggestions.suggested_eps.toString())}>Apply</button>
            </div>
            <div className="result-card">
              <h3>Recommended minPts</h3>
              <div className="result-value">{aiSuggestions.suggested_min_samples}</div>
              <button className="btn-use" onClick={() => setMinSamples(aiSuggestions.suggested_min_samples.toString())}>Apply</button>
            </div>
            <div className="result-card">
              <h3>Recommended Radius</h3>
              <div className="result-value">{aiSuggestions.suggested_radius}</div>
              <button className="btn-use" onClick={() => setRadius(aiSuggestions.suggested_radius.toString())}>Apply</button>
            </div>
          </div>
          <div className="info-box">
            <p><strong>Why these values?</strong> {aiSuggestions.reasoning}</p>
            <p><strong>Confidence:</strong> {(aiSuggestions.confidence * 100).toFixed(0)}%</p>
          </div>
        </div>
      )}

      {/* Hotspots Tab */}
      {activeTab === 'hotspots' && hotspots && (
        <div className="ai-section">
          <h2>Dense Areas Detected</h2>
          <p className="section-subtitle">{hotspots.message}</p>
          <div className="hotspots-list">
            {hotspots.hotspots.map((spot, idx) => (
              <div key={idx} className="hotspot-card">
                <div className={`hotspot-priority ${spot.priority}`}>
                  {spot.priority === 'high' ? 'High Density Area' : 'Medium Density Area'} - Location {idx + 1}
                </div>
                <div className="hotspot-location">
                  Coordinates: ({spot.center[0].toFixed(2)}, {spot.center[1].toFixed(2)})
                </div>
                <div className="hotspot-coverage">
                  Estimated Points: {spot.potential_coverage}
                </div>
              </div>
            ))}
          </div>
          <div className="info-box">
            <p><strong>Use case:</strong> These are the best locations for placing service centers or cell towers.</p>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && insights && (
        <div className="ai-section">
          <h2>Data Insights</h2>
          <p className="section-subtitle">{insights.summary}</p>
          <div className="insights-list">
            {insights.insights.map((insight, idx) => (
              <div key={idx} className="insight-card">
                {insight}
              </div>
            ))}
          </div>
          {insights.statistics && (
            <div className="stats-box">
              <h3>Statistics</h3>
              <p>X Range: {insights.statistics.x_range}</p>
              <p>Y Range: {insights.statistics.y_range}</p>
              <p>Density: {insights.statistics.density}</p>
              <p>Total Points: {insights.statistics.total_points}</p>
            </div>
          )}
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
            <p>Results are compared with brute force to confirm 96-99% accuracy at 99% faster speed.</p>
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
            <h3>AI Features</h3>
            <p>Smart parameter suggestions, dense area detection, data insights</p>
          </div>
        </div>
      </div>

    </div>
  );
}
