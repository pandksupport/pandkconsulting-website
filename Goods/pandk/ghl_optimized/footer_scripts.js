// Footer Scripts for P&K Main Page (GHL Optimized)

// Copy to Clipboard Function (From Funding Page)
function copyToClipboard(text, element, event) {
    if (event) event.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
        const iconSlot = element.querySelector('.icon-slot');
        if (!iconSlot) return;

        const originalIcon = iconSlot.innerText;

        // Swap to Gold Checkmark
        iconSlot.innerText = '✓';
        iconSlot.style.color = 'var(--color-gold)';
        iconSlot.style.fontWeight = 'bold';

        // Create Floating Popup
        const popup = document.createElement('span');
        popup.className = 'copied-popup';
        popup.innerText = 'Copied';
        element.appendChild(popup);

        // Revert after 2 seconds
        setTimeout(() => {
            iconSlot.innerText = originalIcon;
            iconSlot.style.color = ''; // Reset color
            iconSlot.style.fontWeight = '';
            if (popup.parentNode) popup.parentNode.removeChild(popup);
        }, 2000);
    });
}

// Mobile Nav Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
        });
    }
});
