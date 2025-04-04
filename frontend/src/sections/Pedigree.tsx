import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../index.css';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  isAlive: boolean;
  parentId?: string;
}

const PedigreeTreeComponent: React.FC<{ familyData: FamilyMember[] }> = ({ familyData }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipData, setTooltipData] = useState<FamilyMember | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !familyData.length || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const width = Math.min(containerWidth, 1200);
    const height = Math.min(width * 0.75, 800);
    const margin = { top: 60, right: 60, bottom: 60, left: 60 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', width).attr('height', height);

    // Create a virtual root if multiple roots exist
    const roots = familyData.filter(d => !d.parentId);
    const processedData = roots.length === 1 ? [...familyData] : [
      {
        id: 'virtual-root',
        name: 'Family',
        relation: 'Root',
        age: 0,
        gender: 'Unknown',
        isAlive: true,
        parentId: undefined
      },
      ...familyData.map(d => (!d.parentId ? { ...d, parentId: 'virtual-root' } : d))
    ];

    const root = d3.stratify<FamilyMember>()
      .id(d => d.id)
      .parentId(d => d.parentId || '')(processedData);

    const treeLayout = d3.tree<d3.HierarchyNode<FamilyMember>>()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.5));

    const treeData = treeLayout(d3.hierarchy(root));

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('class', 'tree-group');

    // Gradient for links
    svg.append('defs').append('linearGradient')
      .attr('id', 'link-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#1e9b5b' },
        { offset: '100%', color: '#17884e' }
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color);

    // Draw curved links with gradient
    g.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y) as any)
      .attr('stroke', 'url(#link-gradient)')
      .attr('stroke-width', 3)
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.7);

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('mouseover', (event, d) => {
        if (d.data.data.id !== 'virtual-root') {
          setTooltipData(d.data.data);
          setTooltipPos({ x: event.pageX, y: event.pageY });
        }
      })
      .on('mouseout', () => setTooltipData(null));

    // Gender-specific gradients
    const defs = svg.append('defs');
    
    // Male gradient
    const maleGradient = defs.append('linearGradient')
      .attr('id', 'male-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    maleGradient.append('stop').attr('offset', '0%').attr('stop-color', '#4a89dc');
    maleGradient.append('stop').attr('offset', '100%').attr('stop-color', '#5d9cec');

    // Female gradient
    const femaleGradient = defs.append('linearGradient')
      .attr('id', 'female-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    femaleGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ed5565');
    femaleGradient.append('stop').attr('offset', '100%').attr('stop-color', '#fc6e51');

    // Shadow filter
    defs.append('filter')
      .attr('id', 'node-shadow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%')
      .append('feDropShadow')
      .attr('dx', 0).attr('dy', 2)
      .attr('stdDeviation', 3)
      .attr('flood-opacity', 0.2);

    // Node circles
    nodes.append('circle')
      .attr('r', d => d.data.data.id === 'virtual-root' ? 0 : 20)
      .attr('fill', d => {
        if (d.data.data.id === 'virtual-root') return 'transparent';
        return d.data.data.isAlive ? 
          `url(#${d.data.data.gender.toLowerCase()}-gradient)` : 
          '#9E9E9E';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('filter', 'url(#node-shadow)');

    // Node labels
    nodes.append('text')
      .attr('class', 'node-name')
      .text(d => d.data.data.id === 'virtual-root' ? '' : d.data.data.name);

    // Relation labels
    nodes.append('text')
      .attr('class', 'node-relation')
      .text(d => d.data.data.id === 'virtual-root' ? '' : d.data.data.relation);

  }, [familyData]);

  return (
    <div ref={containerRef} className="pedigree-container">
      <div className="pedigree-header">
        <h2>
          <span className="pedigree-icon">🌳</span> Family Pedigree Tree
        </h2>
      </div>

      <div className="pedigree-content">
        <svg ref={svgRef} className="pedigree-svg" />
      </div>

      {tooltipData && (
        <div 
          className="pedigree-tooltip" 
          style={{ left: tooltipPos.x + 20, top: tooltipPos.y + 20 }}
        >
          <h4>
            {tooltipData.gender === 'Male' ? '👨' : '👩'}
            {tooltipData.name}
          </h4>
          <div className="tooltip-grid">
            <div className="tooltip-row">
              <span className="tooltip-label">Relation:</span>
              <span>{tooltipData.relation}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Age:</span>
              <span>{tooltipData.age}</span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">Status:</span>
              <span className={`status-${tooltipData.isAlive ? 'alive' : 'deceased'}`}>
                {tooltipData.isAlive ? 'Alive' : 'Deceased'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PedigreeTreeComponent;