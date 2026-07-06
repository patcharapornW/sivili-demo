'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Edit, ArrowUp, ArrowDown } from 'lucide-react';
import { LayoutSectionConfig } from '@/lib/layoutConfig';

interface BuilderSectionWrapperProps {
  section: LayoutSectionConfig;
  isBuilderMode: boolean;
  onEdit: (section: LayoutSectionConfig) => void;
  onToggleVisibility: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  children: React.ReactNode;
}

export default function BuilderSectionWrapper({
  section,
  isBuilderMode,
  onEdit,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  children
}: BuilderSectionWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  if (!isBuilderMode) {
    return <>{children}</>;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Hover Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-1 bg-white shadow-lg rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200">
        <div
          {...attributes}
          {...listeners}
          className="p-2 text-gray-400 hover:text-gray-800 cursor-grab active:cursor-grabbing hover:bg-gray-100 rounded"
          title="ลากเพื่อย้าย"
        >
          <GripVertical size={18} />
        </div>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <button
          onClick={() => onMoveUp(section.id)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
          title="ย้ายขึ้น"
        >
          <ArrowUp size={18} />
        </button>
        <button
          onClick={() => onMoveDown(section.id)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
          title="ย้ายลง"
        >
          <ArrowDown size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1"></div>
        <button
          onClick={() => onEdit(section)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
          title="แก้ไขข้อมูล"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onToggleVisibility(section.id)}
          className={`p-2 rounded ${
            section.visible ? 'text-gray-500 hover:text-orange-600 hover:bg-orange-50' : 'text-orange-500 bg-orange-50 hover:bg-orange-100'
          }`}
          title={section.visible ? 'ซ่อนบล็อกนี้' : 'แสดงบล็อกนี้'}
        >
          {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Content Wrapper */}
      <div 
        className={`relative ${!section.visible ? 'opacity-30 grayscale' : ''} border-2 border-transparent group-hover:border-blue-400 transition-colors`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit(section);
        }}
      >
        {/* Overlay to intercept clicks in builder mode */}
        <div className="absolute inset-0 z-40 cursor-pointer"></div>
        {children}
      </div>
    </div>
  );
}
