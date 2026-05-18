export function renderHTML(): string {
  return /* html */ `
    <slot>
      <svg class="arrow-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
         <path d="M35,10 L15,25 L35,40 Z" 
        fill="currentColor" 
        stroke="currentColor" 
        stroke-width="6" 
        stroke-linejoin="round" />
      </svg>
    </slot>
      `;
}