const fs = require('fs');

let content = fs.readFileSync('app/ai-chat/page.tsx', 'utf8');
content = content.replace(
  /<Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">\n                                      <Link href="\/cart">\n                                      <ShoppingCart className="w-4 h-4 mr-2" \/>\n                                      Add to Cart\n                                    <\/Button>/,
  '<Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full sm:w-auto">\n                                      <Link href="/cart">\n                                        <ShoppingCart className="w-4 h-4 mr-2" />\n                                        Add to Cart\n                                      </Link>\n                                    </Button>'
);
fs.writeFileSync('app/ai-chat/page.tsx', content);

let content2 = fs.readFileSync('components/ai-recommendation-engine.tsx', 'utf8');
content2 = content2.replace(
  /<Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">\n                        <a href={`\/products\/\${item.id}`}>\n                        <ShoppingCart className="w-4 h-4 mr-2" \/>\n                        Add to Cart\n                      <\/Button>/,
  '<Button asChild className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">\n                        <a href={`/products/${item.id}`}>\n                          <ShoppingCart className="w-4 h-4 mr-2" />\n                          Add to Cart\n                        </a>\n                      </Button>'
);
fs.writeFileSync('components/ai-recommendation-engine.tsx', content2);
