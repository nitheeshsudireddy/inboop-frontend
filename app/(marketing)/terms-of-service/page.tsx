import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Inboop',
  description: 'Terms of Service for Inboop - AI-Powered CRM for Social Commerce',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>

          {/* Update Notice */}
          <div className="flex items-center gap-2 mb-8 p-3 bg-green-50 border border-green-200 rounded-lg">
            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-green-800">
              Please read these terms carefully before using Inboop. <strong>Last updated: December 15, 2025</strong>
            </p>
          </div>

          {/* Quick Summary Box */}
          <div className="mb-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Terms at a Glance</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">You own your data — we just process it</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">Cancel anytime from your account</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">Export your data within 30 days of closure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">Must be 18+ to use the service</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">No spam or illegal activities allowed</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-gray-600">99.9% uptime target for paid plans</span>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="mb-10 p-6 bg-white border border-gray-200 rounded-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <nav className="grid md:grid-cols-2 gap-2 text-sm">
              <Link href="#definitions" className="text-gray-600 hover:text-green-700 transition-colors">1. Definitions</Link>
              <Link href="#agreement" className="text-gray-600 hover:text-green-700 transition-colors">2. Agreement to Terms</Link>
              <Link href="#description" className="text-gray-600 hover:text-green-700 transition-colors">3. Description of Service</Link>
              <Link href="#accounts" className="text-gray-600 hover:text-green-700 transition-colors">4. User Accounts</Link>
              <Link href="#acceptable-use" className="text-gray-600 hover:text-green-700 transition-colors">5. Acceptable Use</Link>
              <Link href="#data-rights" className="text-gray-600 hover:text-green-700 transition-colors">6. Data Ownership & Rights</Link>
              <Link href="#third-party" className="text-gray-600 hover:text-green-700 transition-colors">7. Third-Party Integrations</Link>
              <Link href="#intellectual-property" className="text-gray-600 hover:text-green-700 transition-colors">8. Intellectual Property</Link>
              <Link href="#payment" className="text-gray-600 hover:text-green-700 transition-colors">9. Payment & Billing</Link>
              <Link href="#service-level" className="text-gray-600 hover:text-green-700 transition-colors">10. Service Level & Uptime</Link>
              <Link href="#termination" className="text-gray-600 hover:text-green-700 transition-colors">11. Termination & Data Export</Link>
              <Link href="#disclaimer" className="text-gray-600 hover:text-green-700 transition-colors">12. Disclaimer of Warranties</Link>
              <Link href="#limitation" className="text-gray-600 hover:text-green-700 transition-colors">13. Limitation of Liability</Link>
              <Link href="#indemnification" className="text-gray-600 hover:text-green-700 transition-colors">14. Indemnification</Link>
              <Link href="#dispute" className="text-gray-600 hover:text-green-700 transition-colors">15. Dispute Resolution</Link>
              <Link href="#changes" className="text-gray-600 hover:text-green-700 transition-colors">16. Changes to Terms</Link>
              <Link href="#contact" className="text-gray-600 hover:text-green-700 transition-colors">17. Contact Us</Link>
            </nav>
          </div>

          <div className="prose prose-gray max-w-none">
            {/* Section 1 - Definitions */}
            <section id="definitions" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definitions</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Clear definitions of key terms used throughout</li>
                  <li>• Helps avoid misunderstandings</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                The following definitions apply throughout these Terms of Service:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg mb-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b w-1/4">Term</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Definition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;Service&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">The Inboop platform, including web application, APIs, and related services</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;User&quot; or &quot;You&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Any individual or entity that accesses or uses the Service</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;Account&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Your registered account to access the Service</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;User Content&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Any data, messages, files, or content you submit or import through the Service</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;Customer Data&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Data about your customers imported from connected social media platforms</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;Paid Plan&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Any subscription plan that requires payment (monthly or annual)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">&quot;Free Plan&quot;</td>
                      <td className="px-4 py-3 text-sm text-gray-600">The no-cost tier with limited features</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 - Agreement */}
            <section id="agreement" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Agreement to Terms</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• By using Inboop, you agree to these terms</li>
                  <li>• You must actively consent during signup</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing or using Inboop (&quot;Service&quot;), you agree to be bound by these Terms of Service
                (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Service.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Active Consent Required:</strong> During account registration, you must check the &quot;I agree to the Terms of Service and Privacy Policy&quot; checkbox before creating an account. This constitutes your explicit agreement to these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            {/* Section 3 - Description */}
            <section id="description" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Description of Service</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• AI-powered CRM for social commerce</li>
                  <li>• Unified inbox for Instagram, WhatsApp, Messenger</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Inboop is an AI-powered Customer Relationship Management (CRM) platform designed for social commerce.
                Our Service allows you to manage customer conversations from Instagram, WhatsApp, and Facebook Messenger
                in a unified inbox, track leads, and leverage AI-powered insights to improve your business operations.
              </p>
            </section>

            {/* Section 4 - Accounts */}
            <section id="accounts" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Must be 18+ to use the Service</li>
                  <li>• You&apos;re responsible for your account security</li>
                  <li>• Keep your information accurate</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Account Creation</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                To use certain features of our Service, you must create an account. You agree to provide accurate,
                current, and complete information during registration and to update such information to keep it
                accurate, current, and complete.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Account Security</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for safeguarding your account credentials and for any activities or actions
                under your account. You must notify us immediately upon becoming aware of any breach of security
                or unauthorized use of your account.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.3 Account Requirements</h3>
              <p className="text-gray-600 leading-relaxed">
                You must be at least 18 years old to use this Service. By using the Service, you represent and
                warrant that you meet this requirement and have the legal capacity to enter into these Terms.
              </p>
            </section>

            {/* Section 5 - Acceptable Use */}
            <section id="acceptable-use" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• No spam, harassment, or illegal activities</li>
                  <li>• Respect platform policies (Meta, etc.)</li>
                  <li>• Don&apos;t try to hack or disrupt the service</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others, including intellectual property rights</li>
                <li>Send spam, unsolicited messages, or engage in harassment</li>
                <li>Distribute malware, viruses, or other harmful code</li>
                <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
                <li>Use the Service for any fraudulent or deceptive purposes</li>
                <li>Interfere with or disrupt the integrity or performance of the Service</li>
                <li>Collect or harvest user data without consent</li>
                <li>Violate the terms of service of connected platforms (Meta, WhatsApp, etc.)</li>
              </ul>
            </section>

            {/* Section 6 - Data Rights */}
            <section id="data-rights" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Ownership & Rights</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• You own your data — we never claim ownership</li>
                  <li>• We only process data to provide the Service</li>
                  <li>• Backups retained for service continuity</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Your Data Ownership</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>You retain full ownership of your User Content and Customer Data.</strong> Inboop does not claim any ownership rights over any data you submit, import, or generate through the Service.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 License to Process</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                By using the Service, you grant Inboop a limited, non-exclusive, worldwide license to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Store, process, and transmit your data solely to provide the Service</li>
                <li>Use AI/ML technologies to classify messages and generate insights</li>
                <li>Create anonymized, aggregated data for service improvement (not identifiable to you)</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-4">
                This license terminates when you delete your data or close your account.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">6.3 Backups & Continuity</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain backups of your data for disaster recovery and service continuity. Backups are retained for up to 30 days after deletion requests and are then permanently removed.
              </p>
            </section>

            {/* Section 7 - Third Party */}
            <section id="third-party" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Integrations</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• We integrate with Meta (Instagram, Facebook, WhatsApp)</li>
                  <li>• You must comply with their platform policies</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Service integrates with third-party platforms including Meta (Instagram, Facebook, WhatsApp).
                By using these integrations, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Comply with the terms of service and policies of each third-party platform</li>
                <li>Authorize Inboop to access your data on these platforms as necessary to provide the Service</li>
                <li>Accept that third-party services may change or discontinue, affecting our Service</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                We are not responsible for the actions, content, or policies of any third-party platforms.
              </p>
            </section>

            {/* Section 8 - IP */}
            <section id="intellectual-property" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Inboop owns its platform and technology</li>
                  <li>• You keep rights to your content</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">8.1 Our Intellectual Property</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Service and its original content (excluding content provided by users), features, and
                functionality are and will remain the exclusive property of Inboop and its licensors. The
                Service is protected by copyright, trademark, and other laws.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">8.2 Your Content</h3>
              <p className="text-gray-600 leading-relaxed">
                You retain all rights to any content you submit, post, or display through the Service. By
                submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use,
                reproduce, and process your content solely for the purpose of providing the Service.
              </p>
            </section>

            {/* Section 9 - Payment */}
            <section id="payment" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Payment & Billing</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Subscriptions auto-renew unless cancelled</li>
                  <li>• Cancel anytime, access continues until period ends</li>
                  <li>• Refunds available within 14 days for annual plans</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Certain features of the Service require a Paid Plan. By subscribing:
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Subscription & Renewal</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Subscriptions are billed in advance on a monthly or annual basis</li>
                <li>Your subscription will <strong>automatically renew</strong> at the end of each billing period unless cancelled</li>
                <li>You will be charged the then-current rate at renewal</li>
                <li>We will send a reminder email 7 days before annual renewals</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 Cancellation</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>You can cancel your subscription anytime from your account settings</li>
                <li>Upon cancellation, you retain access until the end of your current billing period</li>
                <li>No partial refunds are given for unused time on monthly plans</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.3 Refund Policy</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Annual Plans:</strong> Full refund available within 14 days of initial purchase or renewal</li>
                <li><strong>Monthly Plans:</strong> No refunds (cancel anytime, access continues until period ends)</li>
                <li><strong>Exceptions:</strong> We may offer prorated credits at our discretion for service issues</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.4 Billing Disputes</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you believe you&apos;ve been billed incorrectly, contact us at billing@inboop.com within 30 days of the charge. We will investigate and resolve billing errors promptly. Disputed charges may be paused during investigation.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.5 Price Changes</h3>
              <p className="text-gray-600 leading-relaxed">
                We may modify pricing with 30 days&apos; notice. Price changes take effect at your next renewal. You may cancel before the new pricing takes effect.
              </p>
            </section>

            {/* Section 10 - SLA */}
            <section id="service-level" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Service Level & Uptime</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• 99.9% uptime target for Paid Plans</li>
                  <li>• Service credits for extended outages</li>
                  <li>• Planned maintenance with advance notice</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Uptime Commitment</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                For Paid Plans, we target <strong>99.9% uptime</strong> on a monthly basis, excluding:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Scheduled maintenance (announced at least 48 hours in advance)</li>
                <li>Third-party service outages (Meta platforms, AWS, etc.)</li>
                <li>Force majeure events</li>
                <li>Issues caused by your actions or equipment</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">10.2 Service Credits</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If monthly uptime falls below our target, Paid Plan users may request service credits:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg mb-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Monthly Uptime</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Service Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">99.0% - 99.9%</td>
                      <td className="px-4 py-3 text-sm text-gray-600">10% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">95.0% - 99.0%</td>
                      <td className="px-4 py-3 text-sm text-gray-600">25% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">Below 95.0%</td>
                      <td className="px-4 py-3 text-sm text-gray-600">50% of monthly fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Credits must be requested within 30 days of the incident and are applied to future invoices.
              </p>
            </section>

            {/* Section 11 - Termination */}
            <section id="termination" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination & Data Export</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Export your data within 30 days of closure</li>
                  <li>• Data exported in JSON and CSV formats</li>
                  <li>• After 30 days, data is permanently deleted</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.1 Termination by You</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may terminate your account at any time through your account settings or by contacting support.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.2 Termination by Us</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We may terminate or suspend your account immediately, without prior notice, for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Violation of these Terms</li>
                <li>Non-payment (after 14 days grace period)</li>
                <li>Fraudulent or illegal activity</li>
                <li>At our sole discretion with 30 days notice</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.3 Data Export</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Upon termination, you have <strong>30 days</strong> to export your data:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li><strong>Format:</strong> Data is available in JSON and CSV formats</li>
                <li><strong>Scope:</strong> Includes leads, conversations, messages, and account settings</li>
                <li><strong>Method:</strong> Use the &quot;Export Data&quot; feature in Settings, or request via email</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">11.4 After the 30-Day Window</h3>
              <p className="text-gray-600 leading-relaxed">
                After 30 days following account closure, all your data will be <strong>permanently deleted</strong> from our systems and backups. This action cannot be undone. We recommend exporting your data before cancelling.
              </p>
            </section>

            {/* Section 12 - Disclaimer */}
            <section id="disclaimer" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Disclaimer of Warranties</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Service provided &quot;as is&quot;</li>
                  <li>• We don&apos;t guarantee uninterrupted service</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY
                KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
                FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE. We do not warrant that
                the Service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            {/* Section 13 - Limitation */}
            <section id="limitation" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Limitation of Liability</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Liability limited to fees paid in last 12 months</li>
                  <li>• No liability for indirect damages</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Our total liability shall not exceed the fees you paid in the 12 months preceding the claim</li>
                <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
                <li>We shall not be liable for loss of profits, data, use, goodwill, or other intangible losses</li>
              </ul>
            </section>

            {/* Section 14 - Indemnification */}
            <section id="indemnification" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Indemnification</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• You agree to defend us against claims from your use</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Inboop and its licensees and licensors, and
                their employees, contractors, agents, officers, and directors, from and against any claims,
                damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use
                of the Service or violation of these Terms.
              </p>
            </section>

            {/* Section 15 - Dispute */}
            <section id="dispute" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Dispute Resolution</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• Try to resolve disputes informally first</li>
                  <li>• Binding arbitration for unresolved disputes</li>
                  <li>• Class action waiver applies</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">15.1 Informal Resolution</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Before initiating any formal dispute resolution, you agree to first contact us at legal@inboop.com to attempt to resolve the dispute informally. We will try to resolve disputes within 30 days.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">15.2 Binding Arbitration</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If we cannot resolve a dispute informally, you and Inboop agree to resolve any disputes through <strong>binding arbitration</strong> rather than in court, except for claims that may be brought in small claims court.
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Arbitration will be conducted by a neutral arbitrator</li>
                <li>Arbitration will be conducted virtually unless both parties agree otherwise</li>
                <li>The arbitrator&apos;s decision will be final and binding</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">15.3 Class Action Waiver</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>You agree to resolve disputes only on an individual basis</strong> and waive any right to participate in a class action lawsuit or class-wide arbitration.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">15.4 Governing Law</h3>
              <p className="text-gray-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any litigation not subject to arbitration shall be brought exclusively in the courts of Delaware.
              </p>
            </section>

            {/* Section 16 - Changes */}
            <section id="changes" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Changes to Terms</h2>
              <div className="p-4 bg-green-50 border-l-4 border-green-600 rounded-r-lg mb-4">
                <p className="text-sm text-green-800 font-medium">Key Points:</p>
                <ul className="text-sm text-green-700 mt-1 space-y-1">
                  <li>• 30 days notice for material changes</li>
                  <li>• Continued use means acceptance</li>
                </ul>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material,
                we will provide at least 30 days&apos; notice prior to any new terms taking effect via email and a prominent notice in the Service. What
                constitutes a material change will be determined at our sole discretion. By continuing to access
                or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Section 17 - Contact */}
            <section id="contact" className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-700">
                  <strong className="text-gray-900">Inboop - Legal Team</strong><br /><br />
                  <span className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    legal@inboop.com
                  </span>
                  <span className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    billing@inboop.com (for billing questions)
                  </span>
                  <span className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    https://inboop.com
                  </span>
                </p>
              </div>
            </section>
          </div>

          {/* Back to Top */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <Link href="#" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
              ↑ Back to top
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}