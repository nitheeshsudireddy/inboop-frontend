import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'Privacy Policy - Inboop',
  description: 'Privacy Policy for Inboop - AI-Powered CRM for Social Commerce',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: December 15, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to Inboop (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring
                the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you use our AI-powered CRM platform for social commerce.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Inboop, you agree to this Privacy Policy. If you do not agree with the terms
                of this policy, please do not access the application.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may collect personally identifiable information that you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Business name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Social Media Data</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you connect your social media accounts (Instagram, WhatsApp, Facebook Messenger), we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Messages and conversations from connected platforms</li>
                <li>Profile information of your customers (as permitted by each platform)</li>
                <li>Business account information and page data</li>
                <li>Engagement metrics and analytics</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Automatically Collected Information</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We automatically collect certain information when you use our service:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Basis for Processing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We process your personal data under the following legal bases as required by GDPR and other applicable laws:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Contractual Necessity:</strong> Processing is necessary to provide our services and fulfill our contract with you (e.g., managing your CRM account, processing conversations)</li>
                <li><strong>Consent:</strong> Where required by law, we obtain your explicit consent before processing (e.g., marketing communications, optional analytics)</li>
                <li><strong>Legitimate Interests:</strong> Processing for our legitimate business interests, such as improving our services, fraud prevention, and security, where these interests do not override your rights</li>
                <li><strong>Legal Obligations:</strong> Processing necessary to comply with applicable laws and regulations</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                You may withdraw your consent at any time by contacting us at privacy@inboop.com or through your account settings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To provide and maintain our CRM service</li>
                <li>To process and manage your customer conversations</li>
                <li>To use AI/ML technologies for message classification and insights</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about updates and support</li>
                <li>To detect and prevent fraud or security issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience. Here&apos;s what we use:
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Essential Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Required for the website to function properly. These include session cookies for authentication and security tokens. You cannot opt out of these cookies.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2 Analytics Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use analytics tools to understand how visitors interact with our website:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> Collects anonymized usage data including pages visited, time on site, and traffic sources</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">5.3 How to Manage Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can control cookies through:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through their settings</li>
                <li><strong>Google Analytics Opt-out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" className="text-green-700 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                <li><strong>Do Not Track:</strong> We honor Do Not Track (DNT) browser signals</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Note: Disabling certain cookies may affect the functionality of our service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell your personal information. We may share your data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. International Data Transfers</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your data may be transferred to and processed in countries other than your own. Specifically:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Cloud Infrastructure:</strong> We use Amazon Web Services (AWS) with servers located in the United States</li>
                <li><strong>Third-Party Services:</strong> Meta platforms (Instagram, Facebook, WhatsApp) may process data in various locations according to their policies</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                When transferring data internationally, we implement appropriate safeguards including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>Data processing agreements with all service providers</li>
                <li>Technical security measures including encryption in transit and at rest</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. This includes
                encryption, secure servers, and regular security assessments. However, no method of transmission
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We retain your data for specific periods based on the type of information and purpose:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg mb-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Data Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Account information</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Duration of account + 30 days after deletion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Conversation data</td>
                      <td className="px-4 py-3 text-sm text-gray-600">24 months from last activity, or until account deletion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Lead information</td>
                      <td className="px-4 py-3 text-sm text-gray-600">24 months from creation, or until account deletion</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Analytics and logs</td>
                      <td className="px-4 py-3 text-sm text-gray-600">12 months</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Payment records</td>
                      <td className="px-4 py-3 text-sm text-gray-600">7 years (legal requirement)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Support communications</td>
                      <td className="px-4 py-3 text-sm text-gray-600">36 months from resolution</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed">
                After the retention period expires, data is securely deleted or anonymized. You may request early deletion of your data at any time, subject to legal retention requirements.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location (including under GDPR, CCPA, and other privacy laws), you have the following rights:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or for marketing</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">How to Exercise Your Rights</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To exercise any of these rights, you can:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Email us:</strong> Send a request to privacy@inboop.com</li>
                <li><strong>Account Settings:</strong> Use the data management options in your account dashboard</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                We will respond to your request within <strong>30 days</strong>. In complex cases, we may extend this by an additional 60 days, and we will notify you if this is necessary. We may need to verify your identity before processing your request.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service integrates with third-party platforms including Meta (Instagram, Facebook, WhatsApp).
                Your use of these platforms is governed by their respective privacy policies. We encourage you to
                review the privacy policies of any third-party services you connect to Inboop.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Inboop is not intended for use by individuals under the age of 18. We do not knowingly collect
                personal information from children. If we become aware that we have collected personal data from
                a child without parental consent, we will take steps to delete that information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. For material changes,
                we will notify you via email or through a prominent notice on our service. You are advised to review
                this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, want to exercise your rights, or have concerns about our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Inboop - Data Protection</strong><br />
                  Email: privacy@inboop.com<br />
                  Website: https://inboop.com<br /><br />
                  <strong>Response Time:</strong> We aim to respond to all privacy-related inquiries within 30 days.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}