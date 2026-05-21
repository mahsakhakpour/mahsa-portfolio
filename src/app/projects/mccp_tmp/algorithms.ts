// DBSCAN Clustering Algorithm
export function dbscan(points: number[][], eps: number, minSamples: number): number[] {
  const n = points.length;
  const labels: number[] = new Array(n).fill(-1);
  let clusterId = 0;

  for (let i = 0; i < n; i++) {
    if (labels[i] !== -1) continue;
    
    const neighbors = regionQuery(points, i, eps);
    if (neighbors.length < minSamples) continue;
    
    labels[i] = clusterId;
    const seedSet = [...neighbors];
    
    for (let j = 0; j < seedSet.length; j++) {
      const pointIdx = seedSet[j];
      if (labels[pointIdx] === -1) {
        labels[pointIdx] = clusterId;
        const pointNeighbors = regionQuery(points, pointIdx, eps);
        if (pointNeighbors.length >= minSamples) {
          for (const neighbor of pointNeighbors) {
            if (!seedSet.includes(neighbor)) {
              seedSet.push(neighbor);
            }
          }
        }
      }
    }
    clusterId++;
  }
  
  return labels;
}

function regionQuery(points: number[][], pointIdx: number, eps: number): number[] {
  const neighbors: number[] = [];
  const point = points[pointIdx];
  
  for (let i = 0; i < points.length; i++) {
    const dist = Math.sqrt(
      Math.pow(point[0] - points[i][0], 2) + 
      Math.pow(point[1] - points[i][1], 2)
    );
    if (dist <= eps) {
      neighbors.push(i);
    }
  }
  return neighbors;
}

export function slidingCircleAlgorithm(
  points: number[][], 
  radius: number, 
  clusterPoints: Map<number, number[][]>
): { center: number[] | null; count: number; allCircles: Array<{ type: string; center: number[]; count: number }> } {
  let bestCenter: number[] | null = null;
  let maxCount = 0;
  const allCircles: Array<{ type: string; center: number[]; count: number }> = [];
  
  const sortedClusters = Array.from(clusterPoints.entries()).sort(
    (a, b) => b[1].length - a[1].length
  );
  
  
 for (const cpoints of sortedClusters.map(([, points]) => points)) {
    const currentPoints = cpoints;
    
    if (currentPoints.length < maxCount) continue;
    
    const step = Math.max(1, Math.floor(currentPoints.length / 10));
    const sampleIndices: number[] = [];
    for (let i = 0; i < currentPoints.length; i += step) {
      sampleIndices.push(i);
    }
    
    let clusterBestCenter: number[] | null = null;
    let clusterBestCount = 0;
    
    for (const sampleIdx of sampleIndices) {
      let currentCenter = [...currentPoints[sampleIdx]];
      let currentCount = currentPoints.filter(p => 
        Math.sqrt(Math.pow(p[0] - currentCenter[0], 2) + Math.pow(p[1] - currentCenter[1], 2)) <= radius
      ).length;
      
      for (let iter = 0; iter < 75; iter++) {
        const pointsInCircle = currentPoints.filter(p => 
          Math.sqrt(Math.pow(p[0] - currentCenter[0], 2) + Math.pow(p[1] - currentCenter[1], 2)) <= radius
        );
        
        if (pointsInCircle.length === 0) break;
        
        const newCenter = pointsInCircle.reduce(
          (acc, p) => [acc[0] + p[0], acc[1] + p[1]],
          [0, 0]
        ).map(v => v / pointsInCircle.length);
        
        const dx = newCenter[0] - currentCenter[0];
        const dy = newCenter[1] - currentCenter[1];
        const directionLen = Math.sqrt(dx * dx + dy * dy);
        
        if (directionLen < 1e-6) break;
        
        const stepSize = Math.min(radius / 2, directionLen);
        const stepX = (dx / directionLen) * stepSize;
        const stepY = (dy / directionLen) * stepSize;
        
        currentCenter = [currentCenter[0] + stepX, currentCenter[1] + stepY];
        const newCount = currentPoints.filter(p => 
          Math.sqrt(Math.pow(p[0] - currentCenter[0], 2) + Math.pow(p[1] - currentCenter[1], 2)) <= radius
        ).length;
        
        if (newCount > currentCount) {
          currentCount = newCount;
        }
      }
      
      if (currentCount > clusterBestCount) {
        clusterBestCount = currentCount;
        clusterBestCenter = currentCenter;
      }
    }
    
    if (clusterBestCenter) {
      if (clusterBestCount > maxCount) {
        maxCount = clusterBestCount;
        bestCenter = clusterBestCenter;
        allCircles.push({ type: 'optimal', center: bestCenter, count: maxCount });
      } else if (clusterBestCount === maxCount) {
        allCircles.push({ type: 'optimal', center: clusterBestCenter, count: clusterBestCount });
      } else {
        allCircles.push({ type: 'secondary', center: clusterBestCenter, count: clusterBestCount });
      }
    }
  }
  
  return { center: bestCenter, count: maxCount, allCircles };
}

export function bruteForceAlgorithm(
  points: number[][], 
  radius: number, 
  resolution: number = 0.05
): { center: number[] | null; count: number } {
  if (points.length === 0) return { center: null, count: 0 };
  
  const padding = radius * 1.5;
  const xMin = Math.min(...points.map(p => p[0])) - padding;
  const xMax = Math.max(...points.map(p => p[0])) + padding;
  const yMin = Math.min(...points.map(p => p[1])) - padding;
  const yMax = Math.max(...points.map(p => p[1])) + padding;
  const step = radius * resolution;
  
  let bestCenter: number[] | null = null;
  let maxCount = 0;
  
  for (let x = xMin; x <= xMax + step; x += step) {
    for (let y = yMin; y <= yMax + step; y += step) {
      const center = [x, y];
      const count = points.filter(p => 
        Math.sqrt(Math.pow(p[0] - center[0], 2) + Math.pow(p[1] - center[1], 2)) <= radius
      ).length;
      
      if (count > maxCount) {
        maxCount = count;
        bestCenter = center;
      }
    }
  }
  
  return { center: bestCenter, count: maxCount };
}

export function suggestAIParameters(points: number[][]): {
  suggested_eps: number;
  suggested_min_samples: number;
  suggested_radius: number;
  confidence: number;
  density: number;
  message: string;
  reasoning: string;
} {
  const n = points.length;
  const xCoords = points.map(p => p[0]);
  const yCoords = points.map(p => p[1]);
  
  const xRange = Math.max(...xCoords) - Math.min(...xCoords);
  const yRange = Math.max(...yCoords) - Math.min(...yCoords);
  const area = (xRange + 1) * (yRange + 1);
  const density = n / area;
  
  let eps: number, minSamples: number, radius: number;
  let reasoning = "";
  
  if (n < 10) {
    eps = Math.max(1.0, xRange / 5, yRange / 5);
    minSamples = Math.max(2, Math.floor(n / 5));
    radius = Math.max(1.0, Math.min(xRange, yRange) / 6);
    reasoning = "Small dataset detected - using more conservative parameters";
  } else if (n < 50) {
    eps = Math.max(1.0, xRange / 8, yRange / 8);
    minSamples = Math.max(3, Math.floor(n / 10));
    radius = Math.max(1.0, Math.min(xRange, yRange) / 8);
    reasoning = "Medium dataset - balancing coverage and precision";
  } else {
    eps = Math.max(1.0, xRange / 10, yRange / 10);
    minSamples = Math.max(5, Math.floor(n / 15));
    radius = Math.max(1.0, Math.min(xRange, yRange) / 10);
    reasoning = "Large dataset - optimizing for speed and coverage";
  }
  
  if (density > 1.0) {
    eps = eps * 0.7;
    radius = radius * 0.8;
    reasoning += " High density area detected - reducing radius for better local coverage";
  } else if (density < 0.1) {
    eps = eps * 1.5;
    radius = radius * 1.3;
    reasoning += " Sparse distribution - increasing radius for wider coverage";
  }
  
  const confidence = n < 10 ? 0.7 : n > 100 ? 0.9 : 0.85;
  
  return {
    suggested_eps: Math.round(eps * 10) / 10,
    suggested_min_samples: Math.max(2, Math.round(minSamples)),
    suggested_radius: Math.round(radius * 10) / 10,
    confidence,
    density: Math.round(density * 1000) / 1000,
    message: `AI analyzed ${n} points with density ${(density * 1000).toFixed(3)}`,
    reasoning
  };
}

export function predictHotspots(points: number[][], radius: number): {
  hotspots: Array<{
    id: number;
    center: [number, number];
    potential_coverage: number;
    priority: string;
    suggested_radius: number;
  }>;
  total_hotspots: number;
  message: string;
  analysis: string;
} {
  if (points.length < 3) {
    return {
      hotspots: [],
      total_hotspots: 0,
      message: "Need at least 3 points for hotspot detection",
      analysis: "Insufficient data"
    };
  }
  
  const nClusters = Math.min(5, Math.max(2, Math.floor(points.length / 8)));
  const hotspots: Array<{
    id: number;
    center: [number, number];
    potential_coverage: number;
    priority: string;
    suggested_radius: number;
  }> = [];
  
  const xCoords = points.map(p => p[0]);
  const yCoords = points.map(p => p[1]);
  const xMin = Math.min(...xCoords);
  const xMax = Math.max(...xCoords);
  const yMin = Math.min(...yCoords);
  const yMax = Math.max(...yCoords);
  
  const gridSize = Math.sqrt(nClusters);
  const xStep = (xMax - xMin) / gridSize;
  const yStep = (yMax - yMin) / gridSize;
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const centerX = xMin + (i + 0.5) * xStep;
      const centerY = yMin + (j + 0.5) * yStep;
      const coverage = points.filter(p => 
        Math.sqrt(Math.pow(p[0] - centerX, 2) + Math.pow(p[1] - centerY, 2)) <= radius * 2
      ).length;
      
      if (coverage > points.length / nClusters) {
        hotspots.push({
          id: hotspots.length,
          center: [centerX, centerY],
          potential_coverage: coverage,
          priority: coverage > points.length / nClusters * 1.5 ? "high" : "medium",
          suggested_radius: Math.round(radius * 1.2 * 10) / 10
        });
      }
    }
  }
  
  hotspots.sort((a, b) => b.potential_coverage - a.potential_coverage);
  
  return {
    hotspots: hotspots.slice(0, 5),
    total_hotspots: hotspots.length,
    message: `AI identified ${Math.min(5, hotspots.length)} potential service locations`,
    analysis: `Based on ${points.length} points distributed across the area`
  };
}

export function getDataInsights(
  points: number[][], 
  eps: number, 
  minSamples: number, 
  radius: number
): {
  insights: string[];
  summary: string;
  statistics: {
    x_range: number;
    y_range: number;
    density: number;
    total_points: number;
  };
} {
  const n = points.length;
  const xCoords = points.map(p => p[0]);
  const yCoords = points.map(p => p[1]);
  
  const xRange = Math.max(...xCoords) - Math.min(...xCoords);
  const yRange = Math.max(...yCoords) - Math.min(...yCoords);
  const area = (xRange + 1) * (yRange + 1);
  const density = n / area;
  
  const insights: string[] = [];
  
  if (density > 0.5) {
    insights.push("High density area detected - multiple points are very close together");
  } else if (density < 0.1) {
    insights.push("Sparse distribution - consider larger coverage radius");
  } else {
    insights.push("Moderate density - balanced distribution of points");
  }
  
  if (xRange > yRange * 2) {
    insights.push("Data is spread horizontally - consider elliptical or wider coverage pattern");
  } else if (yRange > xRange * 2) {
    insights.push("Data is spread vertically - consider vertical optimization strategy");
  }
  
  if (n < 10) {
    insights.push("Small dataset - brute force will be fast and accurate");
  } else if (n > 100) {
    insights.push("Large dataset - sliding circle algorithm is highly recommended");
  }
  
  const avgDistance = Math.sqrt(xRange * yRange) / Math.sqrt(n);
  if (radius < avgDistance / 2) {
    insights.push("Current radius is relatively small - will cover local clusters only");
  } else if (radius > avgDistance * 2) {
    insights.push("Current radius is large - may cover most points from optimal center");
  }
  
  insights.push(`Found ${n} points across ${Math.round(area)} unit area`);
  insights.push(`Current parameters: eps=${eps}, min_samples=${minSamples}, radius=${radius}`);
  
  return {
    insights,
    summary: `AI analyzed ${n} points with ${(density * 1000).toFixed(3)} density`,
    statistics: {
      x_range: Math.round(xRange * 100) / 100,
      y_range: Math.round(yRange * 100) / 100,
      density: Math.round(density * 1000) / 1000,
      total_points: n
    }
  };
}

export function runMCCP(
  points: number[][],
  eps: number,
  minSamples: number,
  radius: number
): {
  slidingCenter: number[] | null;
  slidingCount: number;
  slidingTime: number;
  bruteCenter: number[] | null;
  bruteCount: number;
  bruteTime: number;
  speedupPercentage: number;
  accuracyPercentage: number;
  clusterLabels: number[];
} {
  // Removed unused startTime variable
  
  const clusterLabels = dbscan(points, eps, minSamples);
  
  const clusterPoints = new Map<number, number[][]>();
  for (let i = 0; i < points.length; i++) {
    const label = clusterLabels[i];
    if (!clusterPoints.has(label)) {
      clusterPoints.set(label, []);
    }
    clusterPoints.get(label)!.push(points[i]);
  }
  
  if (clusterPoints.size === 0) {
    clusterPoints.set(-1, points);
  }
  
  const slidingStart = performance.now();
  const slidingResult = slidingCircleAlgorithm(points, radius, clusterPoints);
  const slidingTime = performance.now() - slidingStart;
  
  const bruteStart = performance.now();
  const bruteResult = bruteForceAlgorithm(points, radius);
  const bruteTime = performance.now() - bruteStart;
  
  return {
    slidingCenter: slidingResult.center,
    slidingCount: slidingResult.count,
    slidingTime: slidingTime,
    bruteCenter: bruteResult.center,
    bruteCount: bruteResult.count,
    bruteTime: bruteTime,
    speedupPercentage: ((bruteTime - slidingTime) / bruteTime) * 100,
    accuracyPercentage: (slidingResult.count / bruteResult.count) * 100,
    clusterLabels: clusterLabels
  };
}