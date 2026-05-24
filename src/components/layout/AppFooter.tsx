import React from 'react';

const AppFooter = () => {
  return (
    <footer className='mt-auto border-t border-gray-200 bg-white px-6 py-3 text-center text-xs text-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500'>
      © {new Date().getFullYear()} NextTemplate · Built with Next.js 14 & Ant Design
    </footer>
  );
};

export default AppFooter;
