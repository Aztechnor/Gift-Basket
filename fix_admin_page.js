const fs = require('fs');
let code = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8');
code = code.replace(/\\\$/g, '$');
fs.writeFileSync('app/admin/dashboard/page.tsx', code);

let sidebar = fs.readFileSync('components/ui/sidebar.tsx', 'utf8');
sidebar = sidebar.replace('@/hooks/use-mobile', '@/components/ui/use-mobile');
fs.writeFileSync('components/ui/sidebar.tsx', sidebar);
