import React from 'react';

interface FamilyNode {
  name: string;
  children?: FamilyNode[];
}

const sampleTree: FamilyNode = {
  name: "Grandparent",
  children: [
    { name: "Parent 1", children: [{ name: "Child 1" }, { name: "Child 2" }] },
    { name: "Parent 2", children: [{ name: "Child 3" }] }
  ]
};

const renderTree = (node: FamilyNode) => (
  <div className="tree-node">
    <p>{node.name}</p>
    {node.children && (
      <div className="tree-children">
        {node.children.map((child, index) => (
          <div key={index}>{renderTree(child)}</div>
        ))}
      </div>
    )}
  </div>
);

const Pedigree: React.FC = () => {
  return (
    <div className="center-container">
      <div className="card">
        <h2>Family Tree</h2>
        {renderTree(sampleTree)}
      </div>
    </div>
  );
};

export default Pedigree;