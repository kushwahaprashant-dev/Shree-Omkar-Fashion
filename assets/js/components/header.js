class SiteHeader extends HTMLElement {
    async connectedCallback() {
        try {
            const response = await fetch('assets/components/header.html');
            if (response.ok) {
                this.innerHTML = await response.text();
                // Dispatch event so main.js knows the header is ready
                document.dispatchEvent(new Event('headerLoaded'));
            } else {
                console.error('Failed to load header component');
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
}
customElements.define('site-header', SiteHeader);
