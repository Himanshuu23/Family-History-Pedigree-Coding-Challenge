import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FamilyMember } from '../types/member';

interface Props {
  familyData: FamilyMember[];
}

type ProcessedFamilyMember = FamilyMember & { id: string; parentId?: string | null };

const PedigreeTreeComponent: React.FC<Props> = ({ familyData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!familyData?.length) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const dataWithIds: any = familyData.map((member) => ({
      id: member.id || crypto.randomUUID(),
      name: member.name,
      relation: member.relation,
      age: member.age,
      gender: member.gender,
      isAlive: member.isAlive,
      parentId: member.parentId ?? null,
      hasDiabetes: member.hasDiabetes ?? false,
      diabetesDetails: member.diabetesDetails ?? '',
      hasHeartDisease: member.hasHeartDisease ?? false,
      heartDiseaseDetails: member.heartDiseaseDetails ?? '',
      hasCancer: member.hasCancer ?? false,
      cancerDetails: member.cancerDetails ?? '',
      otherConditions: member.otherConditions ?? '',
      emailId: member.emailId ?? '',
    }));

    const roots = dataWithIds.filter((d: any) => !d.parentId);
    const virtualRoot: ProcessedFamilyMember = {
      id: 'virtual-root',
      name: 'Family',
      relation: 'Root',
      age: 0,
      gender: 'N/A',
      isAlive: true,
      parentId: undefined,
      hasDiabetes: false,
      diabetesDetails: '',
      hasHeartDisease: false,
      heartDiseaseDetails: '',
      hasCancer: false,
      cancerDetails: '',
      otherConditions: '',
      emailId: '',
    };

    const processedData = roots.length === 1 
      ? dataWithIds 
      : [...dataWithIds, virtualRoot, ...roots.map((r: any) => ({ ...r, parentId: 'virtual-root' }))];

    const stratify = d3.stratify<ProcessedFamilyMember>()
      .id(d => d.id)
      .parentId(d => d.parentId || null);

    const root = stratify(processedData);
    const treeLayout = d3.tree<ProcessedFamilyMember>().size([500, 300]);
    const treeRoot = treeLayout(root);

    const svg = d3.select(svgRef.current);
    const g = svg.append('g').attr('transform', 'translate(50,50)');

    g.selectAll('line')
      .data(treeRoot.links())
      .enter().append('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', '#999');

    g.selectAll('circle')
      .data(treeRoot.descendants())
      .enter().append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 20)
      .attr('fill', '#69b3a2');

    g.selectAll('text')
      .data(treeRoot.descendants())
      .enter().append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y - 25)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name);
  }, [familyData]);

  return (
    <div className="pedigree-tree-container">
      <svg ref={svgRef} width={600} height={400} />
    </div>
  );
};

export default PedigreeTreeComponent;