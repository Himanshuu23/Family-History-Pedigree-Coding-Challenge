import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface FamilyMember {
  id: string;
  name: string;
  parent?: string;
}

const familyData: FamilyMember[] = [
  { id: "Grandparent", name: "Grandparent" },
  { id: "Parent1", name: "Parent1", parent: "Grandparent" },
  { id: "Parent2", name: "Parent2", parent: "Grandparent" },
  { id: "Child1", name: "Child1", parent: "Parent1" },
  { id: "Child2", name: "Child2", parent: "Parent1" }
];

const PedigreeTree: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 50, left: 50 };

    const root = d3.stratify<FamilyMember>()
      .id(d => d.id)
      .parentId(d => d.parent)
      (familyData);

    const treeLayout = d3.tree<FamilyMember>()
      .size([width - margin.left * 2, height - margin.top * 2]);

    const treeData = treeLayout(root);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("stroke", "#555")
      .attr("fill", "none")
      .attr("d", d => {
        const source = [d.source.x, d.source.y] as [number, number];
        const target = [d.target.x, d.target.y] as [number, number];
        return d3.linkVertical()({
          source: source,
          target: target
        });
      });

    const nodes = g.selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 8)
      .attr("fill", "#007bff");

    // Add text labels
    nodes.append("text")
      .attr("dy", -12)
      .attr("text-anchor", "middle")
      .text(d => d.data.name);
  }, []);

  return <svg ref={svgRef} width={600} height={400} />;
};

export default PedigreeTree;