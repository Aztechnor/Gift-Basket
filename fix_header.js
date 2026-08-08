const fs = require('fs');
let text = fs.readFileSync('components/header.tsx', 'utf8');
text = text.replace(
  /<Link href="\/cart"><Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100">[\s\S]*?<\/Button>/,
  '<Button asChild variant="ghost" size="icon" aria-label="Cart" className="relative rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100">\n              <Link href="/cart">\n                <ShoppingCart className="w-5 h-5" />\n                <span className="sr-only">Cart items: {cartCount}</span>\n                {cartCount > 0 && (\n                  <Badge aria-hidden="true" className="absolute -top-0.5 -right-0.5 bg-zinc-900 text-white text-[10px] w-4.5 h-4.5 p-0 flex items-center justify-center rounded-full border-2 border-white">\n                    {cartCount}\n                  </Badge>\n                )}\n              </Link>\n            </Button>'
);
fs.writeFileSync('components/header.tsx', text);
