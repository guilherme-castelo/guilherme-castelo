/**
 * Terminal Simulation Module
 * Responsibility: Handle the dynamic log generation and typewriter effects.
 */

const ROUTES = Object.freeze([
  "/", "/home", "/about", "/contact",
  "/login", "/logout", "/register",
  "/auth/refresh-token", "/auth/forgot-password",
  "/api/v1/users", "/api/v1/projects", "/api/v1/projects/active",
  "/api/v1/products", "/api/v1/orders", "/api/v1/payments",
  "/dashboard", "/admin", "/admin/users", "/admin/settings", "/admin/logs",
  "/tenant/ativa-suprimentos", "/workspace/devlab",
  "/webhooks/stripe", "/webhooks/github",
  "/health", "/status", "/metrics", "/uptime",
  "/deploy", "/rollback",
  "/docs", "/swagger"
]);

const METHODS = Object.freeze(["GET", "POST", "PUT", "DELETE", "PATCH"]);
const STATUS_CODES = Object.freeze([200, 201, 204, 301, 400, 401, 403, 404, 500]);

let terminalInterval = null;

/**
 * Returns a CSS class based on HTTP status code
 */
function getStatusColor(status) {
  if (status >= 500) return "text-red-500";
  if (status >= 400) return "text-yellow-400";
  if (status >= 300) return "text-yellow-300";
  return "text-green-400";
}

/**
 * Generates a random log entry HTML
 */
function generateLogEntry() {
  const randomId = Math.random().toString(16).slice(2, 6);
  const route = ROUTES[Math.floor(Math.random() * ROUTES.length)].replace("${id}", randomId);
  const method = METHODS[Math.floor(Math.random() * METHODS.length)];
  const status = STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];
  const latency = Math.floor(Math.random() * 120) + 10;
  const timestamp = new Date().toLocaleTimeString();

  const colorClass = getStatusColor(status);

  return `
    <span class="text-gray-500">user@server:~$</span> 
    <span class="text-gray-400">${timestamp}</span> 
    <span class="text-blue-400 font-bold">${method}</span> 
    <span class="text-white">${route}</span> 
    <span class="${colorClass} font-semibold">${status}</span> 
    <span class="text-gray-500">${latency}ms</span>
  `;
}

/**
 * Animated typewriter effect for a single line
 */
function typeLine(container, html, speed = 15) {
  const wrapper = document.createElement("div");
  wrapper.className = "font-mono leading-relaxed text-[8px] md:text-sm op-0";
  container.prepend(wrapper);

  // Use a temporary element to extract plain text for the typing effect
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const fullText = temp.innerText;

  let i = 0;
  function type() {
    if (i <= fullText.length) {
      wrapper.innerHTML = fullText.slice(0, i) + '<span class="terminal-cursor">█</span>';
      i++;
      setTimeout(type, speed);
    } else {
      wrapper.innerHTML = html; // Restore full HTML with colors
    }
  }

  type();
}

/**
 * Starts the terminal log simulation
 */
export function startTerminalLogs(containerId = "user-header") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Cleanup existing interval
  stopTerminalLogs();

  container.innerHTML = "";
  container.className = "space-y-1 p-0 font-mono text-left";

  const addLine = () => {
    const logHtml = generateLogEntry();
    typeLine(container, logHtml);

    // Keep only last 8 entries
    if (container.children.length > 8) {
      container.removeChild(container.lastChild);
    }
  };

  // First line immediately
  addLine();

  // Continuous logs
  terminalInterval = setInterval(addLine, 2500);
}

/**
 * Stops the terminal log simulation
 */
export function stopTerminalLogs() {
  if (terminalInterval) {
    clearInterval(terminalInterval);
    terminalInterval = null;
  }
}
