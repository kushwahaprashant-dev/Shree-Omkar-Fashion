class SiteFooter extends HTMLElement {
    async connectedCallback() {
        try {
            const response = await fetch('assets/components/footer.html');
            if (response.ok) {
                this.innerHTML = await response.text();
            } else {
                console.error('Failed to load footer component');
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}
customElements.define('site-footer', SiteFooter);
