<<!-- In your index.html, just before </body> -->
<script>
// Create and mount the policy buttons
function createPolicyButtons() {
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; gap: 2rem; justify-content: center; margin: 1rem 0;';

  // Privacy Policy Button
  const privacyBtn = document.createElement('button');
  privacyBtn.textContent = 'Privacy Policy';
  privacyBtn.style.cssText = `
    color: white;
    background: transparent;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
  `;

  // Terms of Service Button
  const termsBtn = document.createElement('button');
  termsBtn.textContent = 'Terms of Service';
  termsBtn.style.cssText = `
    color: white;
    background: transparent;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
  `;

  // Create Modal Function
  function createModal(title, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 9999;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.5rem;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0.5rem;
    `;

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;
    modalTitle.style.cssText = `
      color: #5d0527;
      margin-bottom: 1.5rem;
      padding-right: 2rem;
    `;

    const modalText = document.createElement('div');
    modalText.innerHTML = content;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);

    // Add hash clearing when closing modal
    closeBtn.onclick = () => {
      document.body.removeChild(modal);
      if (window.location.hash) {
        history.pushState("", document.title, window.location.pathname);
      }
    };

    document.body.appendChild(modal);
  }

  // Add click handlers
  privacyBtn.onclick = () => createModal('Privacy Policy', `
    <div style="color: #374151;">
  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">1. Introduction</h3>
  <p>Welcome to Complexe LeSims' WhatsApp Service Privacy Policy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you interact with our WhatsApp Business API service ("the Service").</p>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">2. Information We Collect</h3>
  <h4 style="font-size: 1.1rem; margin: 1rem 0;">2.1 WhatsApp Communication Data</h4>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>WhatsApp phone numbers</li>
    <li>Message content (text and audio messages)</li>
    <li>Message timestamps</li>
    <li>Chat history (retained for 24 hours)</li>
  </ul>

  <h4 style="font-size: 1.1rem; margin: 1rem 0;">2.2 Order Information</h4>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Food orders and preferences</li>
    <li>Delivery addresses (when provided)</li>
    <li>Payment confirmation status</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">3. How We Use Your Information</h3>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Processing and fulfilling your food orders</li>
    <li>Providing customer support</li>
    <li>Improving our menu and services</li>
    <li>Sending order confirmations and updates</li>
    <li>Managing our WhatsApp communication system</li>
    <li>Analyzing service performance and user experience</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">4. Data Storage and Security</h3>
  <h4 style="font-size: 1.1rem; margin: 1rem 0;">4.1 Storage Duration</h4>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Chat histories are automatically deleted after 24 hours</li>
    <li>Order information is retained for business and legal requirements</li>
    <li>Technical logs are maintained for 30 days</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">5. Information Sharing</h3>
  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Delivery partners (for order fulfillment)</li>
    <li>WhatsApp/Meta (for service provision)</li>
    <li>Payment processors (for transaction processing)</li>
    <li>Legal authorities (when required by law)</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">6. Your Rights</h3>
  <p>You have the right to:</p>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Access your personal data</li>
    <li>Request data correction</li>
    <li>Request data deletion</li>
    <li>Opt-out of communications</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">7. Contact Us</h3>
  <p>For privacy-related inquiries, please contact us at:</p>
  <ul style="list-style: none; margin-top: 0.5rem;">
    <li>WhatsApp: (237) 694 579 268</li>
    <li>Email: lesimscomplex@gmail.com</li>
    <li>Address: Yaoundé, Soa Fin Goudron</li>
    <li>Website: http://complexelesims.com</li>
  </ul>
</div>
  `);

  termsBtn.onclick = () => createModal('Terms of Service', `
  
    <div style="color: #374151;">
  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">1. Acceptance of Terms</h3>
  <p>By accessing and using the Complexe LeSims WhatsApp ordering service ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">2. Service Description</h3>
  <p>Complexe LeSims provides a WhatsApp-based food ordering and customer service system that allows users to:</p>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>View our menu</li>
    <li>Place food orders</li>
    <li>Make inquiries about our services</li>
    <li>Receive order confirmations and updates</li>
    <li>Interact with our AI-powered customer service</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">3. Operating Hours</h3>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Restaurant Hours: 12h to 6h, Monday to Sunday</li>
    <li>Delivery Hours: 12h to 2h, Monday to Sunday</li>
    <li>Normal delivery time: 30 minutes to 1 hour</li>
    <li>Food preparation time: 20 to 40 minutes</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">4. Ordering and Payment</h3>
  <h4 style="font-size: 1.1rem; margin: 1rem 0;">4.1 Orders</h4>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>All orders are subject to availability</li>
    <li>Prices are in CFA francs and include all applicable taxes</li>
    <li>We reserve the right to refuse service or cancel orders at our discretion</li>
  </ul>

  <h4 style="font-size: 1.1rem; margin: 1rem 0;">4.2 Payment</h4>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>We accept cash and Orange Money payments</li>
    <li>Payment can be made upon delivery or at our restaurant</li>
    <li>Prices may change without prior notice</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">5. Delivery Terms</h3>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Base delivery fee: 500 francs CFA</li>
    <li>Container fee: 200 francs CFA per unit (150 francs CFA for 2+ units)</li>
    <li>Delivery fees may vary based on distance</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">6. Cancellation and Refunds</h3>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Orders can be cancelled before preparation begins</li>
    <li>Refund policies vary based on order status</li>
    <li>Contact us immediately for any order issues</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">7. Service Limitations</h3>
  <p>We strive to provide reliable service but cannot guarantee:</p>
  <ul style="list-style-type: disc; margin-left: 1.5rem;">
    <li>Continuous, uninterrupted service</li>
    <li>Exact delivery times</li>
    <li>Product availability</li>
  </ul>

  <h3 style="color: #5d0527; font-size: 1.25rem; margin: 1.5rem 0;">8. Contact Information</h3>
  <p>For service-related issues, contact us at:</p>
  <ul style="list-style: none; margin-top: 0.5rem;">
    <li>WhatsApp: (237) 694 579 268</li>
    <li>Email: lesimscomplex@gmail.com</li>
    <li>Address: Yaoundé, Soa Fin Goudron</li>
    <li>Website: http://complexelesims.com</li>
  </ul>
</div>
  `);

  container.appendChild(privacyBtn);
  container.appendChild(termsBtn);
  return container;
}

// Mount the buttons when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('policy-pages-root');
  if (root) {
    root.appendChild(createPolicyButtons());
  }
});
</script>