Upload EVERYTHING in this folder to ~/portfilio on the server.

In cPanel Node.js app set:
  Application startup file = server.mjs
  Application mode = Production
  NODE_ENV = production

On the server SSH (IMPORTANT — install Nitro deps):
  cd ~/portfilio
  cd .output/server
  npm install --omit=dev
  cd ~/portfilio
  # then Restart the Node.js app in cPanel

If site shows 503, check:
  tail -n 80 ~/logs/portfilio_node.log

Do NOT run: npm run build
Do NOT run: npm run dev
