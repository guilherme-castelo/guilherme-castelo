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
  wrapper.className = "font-mono leading-relaxed text-[10px] md:text-xs op-0 mt-1.5";
  container.appendChild(wrapper);

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
export function startTerminalLogs(containerId = "bg-terminal") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Reduced motion support
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Developer mode listener for interviews/dev debug mode
  const isDebug = new URLSearchParams(window.location.search).get('debug') === '1' || window.localStorage.getItem('DEBUG') === '1';

  // Cleanup existing interval
  stopTerminalLogs();

  container.innerHTML = "";
  container.className = "absolute inset-0 z-0 opacity-[0.06] mix-blend-screen overflow-hidden pointer-events-none text-xs font-mono flex-col justify-end p-6 hidden md:flex [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]";

  const addLine = () => {
    const logHtml = generateLogEntry();
    typeLine(container, logHtml, 10);

    // Keep only last 20 entries for background
    if (container.children.length > 20) {
      container.removeChild(container.firstChild);
    }

    if (isDebug) {
      const temp = document.createElement("div");
      temp.innerHTML = logHtml;
      console.log(`[SYS] ${temp.innerText}`);
    }
  };

  // First line immediately
  addLine();

  // Continuous logs
  terminalInterval = setInterval(addLine, 2200);
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
