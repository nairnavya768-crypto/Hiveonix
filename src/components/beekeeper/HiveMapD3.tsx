import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Hive } from '../../types';
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Activity,
  Thermometer,
  Droplets,
  Scale,
  Volume2,
  Radio,
  Layers,
  Sparkles,
  Info,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react';

interface HiveMapD3Props {
  hives: Hive[];
  onSelectHive?: (hiveId: string) => void;
  selectedHiveId?: string | null;
}

export const HiveMapD3: React.FC<HiveMapD3Props> = ({
  hives,
  onSelectHive,
  selectedHiveId,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeFilter, setActiveFilter] = useState<'all' | 'healthy' | 'warning'>('all');
  const [showForageZones, setShowForageZones] = useState(true);
  const [showMeshLines, setShowMeshLines] = useState(true);
  const [showSensorBadges, setShowSensorBadges] = useState(true);
  const [hoveredHive, setHoveredHive] = useState<Hive | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [isSimulatingPing, setIsSimulatingPing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filtered hives based on current filter state
  const displayedHives = hives.filter((hive) => {
    if (activeFilter === 'healthy') return hive.healthStatus === 'healthy';
    if (activeFilter === 'warning') return hive.healthStatus !== 'healthy';
    return true;
  });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = isFullscreen ? 650 : 420;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'overflow-hidden cursor-grab active:cursor-grabbing');

    // Create defs for gradients and filters
    const defs = svg.append('defs');

    // Radial gradient for Apiary Gateway Hub
    const hubGradient = defs
      .append('radialGradient')
      .attr('id', 'hubGlow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    hubGradient.append('stop').attr('offset', '0%').attr('stop-color', '#F6E7A1').attr('stop-opacity', 0.8);
    hubGradient.append('stop').attr('offset', '100%').attr('stop-color', '#D9A441').attr('stop-opacity', 0.2);

    // Glow filter for active nodes
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    filter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    // Root Group with Zoom & Pan behavior
    const g = svg.append('g').attr('class', 'main-canvas');

    const zoomBehavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.6, 3.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoomBehavior);

    // Initial background topographical contours / spatial grid
    const gridGroup = g.append('g').attr('class', 'grid-layer');

    // Background terrain contours
    const contourGroup = g.append('g').attr('class', 'topography-contours');
    const contours = [
      { cx: width * 0.48, cy: height * 0.48, rx: width * 0.42, ry: height * 0.38, fill: '#FAF6E8', stroke: '#EAE1CB' },
      { cx: width * 0.50, cy: height * 0.50, rx: width * 0.32, ry: height * 0.28, fill: '#F5EED8', stroke: '#E2D6BC' },
      { cx: width * 0.52, cy: height * 0.52, rx: width * 0.20, ry: height * 0.18, fill: '#EFE6CA', stroke: '#D8C7A3' },
    ];

    contours.forEach((c) => {
      contourGroup
        .append('ellipse')
        .attr('cx', c.cx)
        .attr('cy', c.cy)
        .attr('rx', c.rx)
        .attr('ry', c.ry)
        .attr('fill', c.fill)
        .attr('stroke', c.stroke)
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '4,3')
        .attr('opacity', 0.55);
    });

    // Subtle coordinate grid dots
    const dotSpacing = 36;
    for (let x = 20; x < width + 100; x += dotSpacing) {
      for (let y = 20; y < height + 100; y += dotSpacing) {
        gridGroup
          .append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 1)
          .attr('fill', '#D4C9AF')
          .attr('opacity', 0.45);
      }
    }

    // Central LoRaWAN Gateway Base Station
    const hubX = width / 2;
    const hubY = height / 2;

    const hubGroup = g.append('g').attr('class', 'hub-gateway');

    // Gateway pulse ring
    hubGroup
      .append('circle')
      .attr('cx', hubX)
      .attr('cy', hubY)
      .attr('r', 48)
      .attr('fill', 'url(#hubGlow)')
      .attr('stroke', '#D9A441')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.7);

    hubGroup
      .append('circle')
      .attr('cx', hubX)
      .attr('cy', hubY)
      .attr('r', 16)
      .attr('fill', '#20221F')
      .attr('stroke', '#F6E7A1')
      .attr('stroke-width', 2);

    hubGroup
      .append('text')
      .attr('x', hubX)
      .attr('y', hubY + 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#F6E7A1')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text('HUB');

    hubGroup
      .append('text')
      .attr('x', hubX)
      .attr('y', hubY + 28)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6B5A24')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text('LoRaWAN Gateway Station');

    // Node spatial positioning layout
    const numHives = displayedHives.length || 1;
    const angleStep = (2 * Math.PI) / numHives;
    const baseRadius = Math.min(width, height) * 0.32;

    // Map each hive to a spatial position around the hub
    const nodes = displayedHives.map((hive, idx) => {
      // Deterministic angle and radius variation based on hive ID
      const seed = hive.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const radiusVariation = ((seed % 40) - 20);
      const angle = idx * angleStep + (seed % 10) * 0.05;
      const radius = baseRadius + radiusVariation;
      const x = hubX + radius * Math.cos(angle);
      const y = hubY + radius * Math.sin(angle);

      return {
        ...hive,
        x,
        y,
        radius,
      };
    });

    // 1. LoRaWAN Mesh Link Layer
    if (showMeshLines) {
      const meshGroup = g.append('g').attr('class', 'mesh-links');

      nodes.forEach((node) => {
        // Link to Hub
        meshGroup
          .append('line')
          .attr('x1', hubX)
          .attr('y1', hubY)
          .attr('x2', node.x)
          .attr('y2', node.y)
          .attr('stroke', node.healthStatus === 'critical' ? '#E11D48' : '#D9A441')
          .attr('stroke-width', 1.2)
          .attr('stroke-dasharray', isSimulatingPing ? '6,4' : '3,3')
          .attr('opacity', 0.65);

        // Signal packet dot animation if simulating ping
        if (isSimulatingPing) {
          const packet = meshGroup
            .append('circle')
            .attr('r', 3)
            .attr('fill', '#20221F');

          packet
            .transition()
            .duration(1200 + Math.random() * 600)
            .ease(d3.easeLinear)
            .attrTween('transform', () => {
              return (t: number) => {
                const curX = node.x + (hubX - node.x) * t;
                const curY = node.y + (hubY - node.y) * t;
                return `translate(${curX}, ${curY})`;
              };
            });
        }
      });
    }

    // 2. Forage Zone Layer (3km radius circles)
    if (showForageZones) {
      const forageGroup = g.append('g').attr('class', 'forage-zones');

      nodes.forEach((node) => {
        forageGroup
          .append('circle')
          .attr('cx', node.x)
          .attr('cy', node.y)
          .attr('r', 44)
          .attr('fill', node.healthStatus === 'healthy' ? '#7D9B68' : '#D9A441')
          .attr('fill-opacity', 0.08)
          .attr('stroke', node.healthStatus === 'healthy' ? '#7D9B68' : '#D9A441')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '2,2')
          .attr('opacity', 0.5);
      });
    }

    // 3. Hive Nodes Layer
    const nodeGroup = g.append('g').attr('class', 'hive-nodes');

    nodes.forEach((node) => {
      const isSelected = selectedHiveId === node.id;
      const isWarning = node.healthStatus !== 'healthy';
      const statusColor =
        node.healthStatus === 'healthy'
          ? '#10B981'
          : node.healthStatus === 'watch'
          ? '#F59E0B'
          : '#EF4444';

      const nG = nodeGroup
        .append('g')
        .attr('class', 'hive-node cursor-pointer')
        .attr('transform', `translate(${node.x}, ${node.y})`);

      // Pulse ring for warning / critical hives
      if (isWarning || isSelected) {
        nG.append('circle')
          .attr('r', isSelected ? 26 : 22)
          .attr('fill', statusColor)
          .attr('fill-opacity', 0.2)
          .attr('stroke', statusColor)
          .attr('stroke-width', 1.5)
          .attr('class', 'animate-ping');
      }

      // Outer halo
      nG.append('circle')
        .attr('r', 18)
        .attr('fill', '#FFFFFF')
        .attr('stroke', isSelected ? '#20221F' : statusColor)
        .attr('stroke-width', isSelected ? 3 : 2)
        .attr('filter', isSelected ? 'url(#glow)' : undefined);

      // Inner Core Hexagon / Circle
      nG.append('circle')
        .attr('r', 12)
        .attr('fill', isSelected ? '#20221F' : '#FFFDF5')
        .attr('stroke', statusColor)
        .attr('stroke-width', 1.5);

      // Hive Icon Text / Initial
      nG.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '4px')
        .attr('fill', isSelected ? '#F6E7A1' : '#20221F')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'var(--font-mono)')
        .text(node.id.split('-').pop() || 'H');

      // Sensor telemetry badge (if enabled)
      if (showSensorBadges) {
        const badgeG = nG.append('g').attr('transform', 'translate(0, 24)');

        // Badge Pill Background
        badgeG
          .append('rect')
          .attr('x', -34)
          .attr('y', 0)
          .attr('width', 68)
          .attr('height', 16)
          .attr('rx', 8)
          .attr('fill', '#FFFFFF')
          .attr('stroke', '#E8E2D2')
          .attr('stroke-width', 1)
          .attr('opacity', 0.95);

        // Temp & Weight text inside badge
        badgeG
          .append('text')
          .attr('x', 0)
          .attr('y', 11)
          .attr('text-anchor', 'middle')
          .attr('fill', '#333333')
          .attr('font-size', '9px')
          .attr('font-weight', 'bold')
          .attr('font-family', 'var(--font-mono)')
          .text(`${node.sensorData.temperature}°C • ${node.sensorData.weight}kg`);
      }

      // Interactivity
      nG.on('mouseenter', (event) => {
        setHoveredHive(node);
        const rect = container.getBoundingClientRect();
        setTooltipPos({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      })
        .on('mousemove', (event) => {
          const rect = container.getBoundingClientRect();
          setTooltipPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        })
        .on('mouseleave', () => {
          setHoveredHive(null);
          setTooltipPos(null);
        })
        .on('click', () => {
          if (onSelectHive) {
            onSelectHive(node.id);
          }
        });
    });
  }, [
    displayedHives,
    showForageZones,
    showMeshLines,
    showSensorBadges,
    selectedHiveId,
    isSimulatingPing,
    isFullscreen,
  ]);

  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(d3.zoom<SVGSVGElement, unknown>().scaleBy as any, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(400)
      .call(d3.zoom<SVGSVGElement, unknown>().transform as any, d3.zoomIdentity);
  };

  const triggerMeshPing = () => {
    setIsSimulatingPing(true);
    setTimeout(() => {
      setIsSimulatingPing(false);
    }, 2400);
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-3xl bg-white border border-[#E8E2D2] shadow-xs overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 p-6 flex flex-col' : 'p-5 space-y-4'
      }`}
    >
      {/* Top Header & Interactive Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0EAD9] pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFF9E8] to-[#F6E7A1] border border-[#D9A441]/40 flex items-center justify-center shadow-2xs">
            <Radio className="w-4 h-4 text-[#8C6B1F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-[#20221F] font-heading">
                Interactive Smart Apiary Spatial Radar
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                D3.js Live Mesh
              </span>
            </div>
            <p className="text-[11px] text-[#7A7467]">
              Real-time LoRaWAN node topology, acoustic buzzing frequencies & micro-climate sensors
            </p>
          </div>
        </div>

        {/* Filter and Layer Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="inline-flex p-1 rounded-xl bg-[#FAF7EF] border border-[#E8E2D2] text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeFilter === 'all' ? 'bg-white text-[#20221F] shadow-2xs' : 'text-[#777] hover:text-[#20221F]'
              }`}
            >
              All ({hives.length})
            </button>
            <button
              onClick={() => setActiveFilter('healthy')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'healthy' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-[#777] hover:text-emerald-700'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Healthy</span>
            </button>
            <button
              onClick={() => setActiveFilter('warning')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                activeFilter === 'warning' ? 'bg-white text-rose-700 shadow-2xs' : 'text-[#777] hover:text-rose-700'
              }`}
            >
              <ShieldAlert className="w-3 h-3 text-rose-500" />
              <span>Alerts ({hives.filter((h) => h.healthStatus !== 'healthy').length})</span>
            </button>
          </div>

          {/* Mesh Ping Button */}
          <button
            onClick={triggerMeshPing}
            disabled={isSimulatingPing}
            className="px-3 py-1.5 rounded-xl bg-[#20221F] hover:bg-[#343831] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            title="Broadcast LoRaWAN sensor sync ping"
          >
            <Activity className={`w-3.5 h-3.5 ${isSimulatingPing ? 'animate-spin text-[#F6E7A1]' : 'text-[#F6E7A1]'}`} />
            <span>{isSimulatingPing ? 'Syncing...' : 'Ping IoT Mesh'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl border border-[#D9D3C3] bg-[#FCFBF7] hover:bg-[#F5EED8] text-[#555] transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Radar View'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* D3 Canvas Container */}
      <div className="relative w-full rounded-2xl bg-[#FCFBF7] border border-[#EDE7D6] overflow-hidden flex-1">
        <svg ref={svgRef} className="w-full h-full block select-none" />

        {/* Float Controls Overlay (Zoom, Reset, Layers) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <div className="flex flex-col bg-white/90 backdrop-blur-xs border border-[#E8E2D2] rounded-xl shadow-xs overflow-hidden">
            <button
              onClick={() => handleZoom(1.25)}
              className="p-2 hover:bg-[#FFF9E8] text-[#444] hover:text-[#20221F] transition-colors border-b border-[#F0EAD9]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(0.8)}
              className="p-2 hover:bg-[#FFF9E8] text-[#444] hover:text-[#20221F] transition-colors border-b border-[#F0EAD9]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 hover:bg-[#FFF9E8] text-[#444] hover:text-[#20221F] transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Layer toggles dropdown/pills */}
          <div className="bg-white/90 backdrop-blur-xs border border-[#E8E2D2] p-1.5 rounded-xl shadow-xs space-y-1 text-[10px]">
            <label className="flex items-center gap-1.5 text-[#555] cursor-pointer hover:text-[#20221F]">
              <input
                type="checkbox"
                checked={showForageZones}
                onChange={(e) => setShowForageZones(e.target.checked)}
                className="w-3 h-3 rounded text-[#D9A441] accent-[#D9A441]"
              />
              <span>3km Flora Zone</span>
            </label>
            <label className="flex items-center gap-1.5 text-[#555] cursor-pointer hover:text-[#20221F]">
              <input
                type="checkbox"
                checked={showMeshLines}
                onChange={(e) => setShowMeshLines(e.target.checked)}
                className="w-3 h-3 rounded text-[#D9A441] accent-[#D9A441]"
              />
              <span>LoRa Links</span>
            </label>
            <label className="flex items-center gap-1.5 text-[#555] cursor-pointer hover:text-[#20221F]">
              <input
                type="checkbox"
                checked={showSensorBadges}
                onChange={(e) => setShowSensorBadges(e.target.checked)}
                className="w-3 h-3 rounded text-[#D9A441] accent-[#D9A441]"
              />
              <span>Sensor Stats</span>
            </label>
          </div>
        </div>

        {/* Real-time Hover Tooltip */}
        {hoveredHive && tooltipPos && (
          <div
            style={{
              left: `${Math.min(tooltipPos.x + 12, (containerRef.current?.clientWidth || 700) - 260)}px`,
              top: `${Math.max(tooltipPos.y - 120, 10)}px`,
            }}
            className="absolute pointer-events-none z-30 w-64 p-3.5 rounded-2xl bg-[#20221F]/95 text-white border border-[#F6E7A1]/40 shadow-xl backdrop-blur-md text-xs space-y-2 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between border-b border-stone-700/60 pb-1.5">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#F6E7A1]">{hoveredHive.name}</span>
                  <span className="text-[10px] font-mono text-stone-400">({hoveredHive.id})</span>
                </div>
                <p className="text-[10px] text-stone-300">{hoveredHive.species}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hoveredHive.healthStatus === 'healthy'
                    ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-900/80 text-rose-300 border border-rose-500/40'
                }`}
              >
                {hoveredHive.healthStatus === 'healthy' ? 'Normal' : 'Watch Alert'}
              </span>
            </div>

            {/* Sensor Quick Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
              <div className="p-1.5 rounded-lg bg-stone-800/80 border border-stone-700/50 flex items-center justify-between">
                <span className="text-stone-400 flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> Brood Temp
                </span>
                <strong className="font-mono text-white">{hoveredHive.sensorData.temperature}°C</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-800/80 border border-stone-700/50 flex items-center justify-between">
                <span className="text-stone-400 flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" /> Humidity
                </span>
                <strong className="font-mono text-white">{hoveredHive.sensorData.humidity}%</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-800/80 border border-stone-700/50 flex items-center justify-between">
                <span className="text-stone-400 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-amber-400" /> Super Weight
                </span>
                <strong className="font-mono text-white">{hoveredHive.sensorData.weight} kg</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-800/80 border border-stone-700/50 flex items-center justify-between">
                <span className="text-stone-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-purple-400" /> Acoustic Hz
                </span>
                <strong className="font-mono text-white">{hoveredHive.sensorData.acousticFrequency} Hz</strong>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-700/40">
              <span>Battery: {hoveredHive.sensorData.batteryLevel}%</span>
              <span className="text-[#F6E7A1] font-bold">Click node to inspect →</span>
            </div>
          </div>
        )}

        {/* Bottom Legend */}
        <div className="absolute bottom-2.5 left-3 z-10 flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs border border-[#E8E2D2] text-[10px] font-semibold text-[#555] shadow-xs">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Healthy Brood (34.5-35.5°C)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Anomaly Advisory (Humidity / Freq)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical Alert ({'<'}70 Health)
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-500">Pan & Zoom with scroll/drag</span>
        </div>
      </div>
    </div>
  );
};
