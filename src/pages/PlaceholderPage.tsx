import React from 'react';
import { GridRule } from '../components/GridRule';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-widest text-responseGreen mb-3">
        Route Active
      </p>
      <h1 className="text-3xl font-bold text-navyPanel mb-4">{title}</h1>
      <GridRule />
      <p className="text-navyPanel/50 mt-6 text-sm">
        This page is registered in the router and ready for content implementation.
      </p>
    </div>
  );
};
